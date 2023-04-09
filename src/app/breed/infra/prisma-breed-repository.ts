import { Breed, BreedProps } from '@breed/domain/breed.entity';
import { BreedRepository } from '@breed/domain/breed.repository';
import { Prisma } from '@shared/infra/persistence/prisma-client';
import { PetType } from '@shared/domain/types/pet-type';

export default class PrismaBreedClient implements BreedRepository {
  private prisma: Prisma;

  constructor(dependencies: { prisma: Prisma }) {
    this.prisma = dependencies.prisma;
  }

  async create(breed: Omit<BreedProps, 'petAds'>): Promise<Breed> {
    const createdBreed = await this.prisma.client.breed.create({
      data: breed,
    });

    return Breed.toDomain(createdBreed);
  }

  async deleteOneById(id: string): Promise<void> {
    await this.prisma.client.breed.delete({ where: { id } });
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

    return breeds.map(breed => Breed.toDomain(breed));
  }

  async findOneByName(name: string): Promise<Breed> {
    const breed = await this.prisma.client.breed.findFirst({
      where: {
        name,
      },
    });

    if (!breed) {
      throw Error('not found');
    }

    return Breed.toDomain(breed);
  }

  async findOneById(breedId: string): Promise<Breed> {
    const breed = await this.prisma.client.breed.findFirst({
      where: {
        id: breedId,
      },
    });

    if (!breed) {
      throw Error('not found');
    }

    return Breed.toDomain(breed);
  }

  async updateOneById(
    breed: Pick<BreedProps, 'id'> & Partial<Omit<BreedProps, 'petAds'>>
  ): Promise<Breed> {
    const updatedBreed = await this.prisma.client.breed.update({
      where: {
        id: breed.id,
      },
      data: breed,
    });

    return Breed.toDomain(updatedBreed);
  }
}
