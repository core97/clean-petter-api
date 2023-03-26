import { Breed } from '@breed/domain/breed.entity';
import { BreedRepository } from '@breed/domain/breed.repository';
import { Prisma } from '@shared/infra/persistence/prisma-client';
import { PetType } from '@shared/domain/types/pet-type';

export class PrismaBreedClient implements BreedRepository {
  constructor(private prisma: Prisma) {}

  async create(breed: Omit<Breed['props'], 'petAds'>): Promise<Breed> {
    const createdBreed = await this.prisma.client.breed.create({
      data: breed,
    });

    return Breed.instantiate(createdBreed);
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

    return breeds.map(Breed.instantiate);
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

    return Breed.instantiate(breed);
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

    return Breed.instantiate(breed);
  }

  async updateOneById(
    breed: Pick<Breed['props'], 'id'> & Partial<Omit<Breed['props'], 'petAds'>>
  ): Promise<Breed> {
    const updatedBreed = await this.prisma.client.breed.update({
      where: {
        id: breed.id,
      },
      data: breed,
    });

    return Breed.instantiate(updatedBreed);
  }
}
