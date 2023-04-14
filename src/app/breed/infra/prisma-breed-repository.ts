import { Breed, BreedProps } from '@breed/domain/breed.entity';
import { BreedRepository } from '@breed/domain/breed.repository';
import { Prisma } from '@shared/infra/persistence/prisma-client';
import { NotFoundError } from '@shared/application/errors/not-found.error';
import { PrismaRepository } from '@shared/infra/persistence/prisma-repository';
import { PetType } from '@shared/domain/types/pet-type';

export default class PrismaBreedClient
  extends PrismaRepository<Breed, BreedProps>
  implements BreedRepository
{
  constructor(deps: { prisma: Prisma }) {
    super(Breed, 'breed', deps.prisma);
  }

  async findByPetType(petType: PetType): Promise<Breed[]> {
    const breeds = await this.prisma.client.breed.findMany({
      where: {
        petType,
      },
      include: {
        petAds: true,
      },
    });

    return breeds.map(breed => new Breed(breed));
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
