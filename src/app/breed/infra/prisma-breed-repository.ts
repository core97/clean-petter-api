import { Breed, BreedProps } from '@breed/domain/breed.entity';
import { BreedRepository } from '@breed/domain/breed.repository';
import { Prisma } from '@shared/infra/persistence/prisma-client';
import { NotFoundError } from '@shared/application/errors/not-found.error';
import { PrismaRepository } from '@shared/infra/persistence/prisma-repository';
import { PetType } from '@shared/domain/types/pet-type';
import {
  PaginationResult,
  PaginationParams,
} from '@shared/domain/types/pagination';

export default class PrismaBreedClient
  extends PrismaRepository<Breed, BreedProps>
  implements BreedRepository
{
  constructor(deps: { prisma: Prisma }) {
    super(Breed, 'breed', deps.prisma);
  }

  async findByPetType(params: {
    petType: PetType;
    pagination: PaginationParams;
  }): Promise<PaginationResult<Breed>> {
    const whereFilter = {
      petType: params.petType,
    };

    const [breeds, total] = await Promise.all([
      this.prisma.client.breed.findMany({
        where: whereFilter,
        ...(params.pagination && {
          skip: params.pagination.page * params.pagination.limit,
          take: params.pagination.limit,
        }),
      }),
      this.prisma.client.breed.count({
        where: whereFilter,
      }),
    ]);

    return {
      results: breeds.map(breed => new Breed(breed)),
      total,
    };
  }

  async findOneByName(name: string): Promise<Breed> {
    const breed = await this.prisma.client.breed.findFirst({
      where: {
        name,
      },
    });

    if (!breed) {
      throw new NotFoundError(`Not found "${this.modelName}" by name`);
    }

    return new Breed(breed);
  }
}
