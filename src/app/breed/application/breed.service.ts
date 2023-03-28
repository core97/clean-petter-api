import { BreedRepository } from '@breed/domain/breed.repository';

export class BreedService {
  constructor(private breedRepo: BreedRepository) {}

  async create(breed: Parameters<BreedRepository['create']>[0]) {
    const breedCreated = await this.breedRepo.create(breed);

    return breedCreated;
  }

  async deleteOneById(breedId: Parameters<BreedRepository['deleteOneById']>[0]) {
    // TODO: remove pet ads with this breed
    await this.breedRepo.deleteOneById(breedId);
  }

  async getByPetType(petType: Parameters<BreedRepository['findByPetType']>[0]) {
    const breeds = await this.breedRepo.findByPetType(petType);

    return breeds;
  }

  async getOneByName(breedName: Parameters<BreedRepository['findOneByName']>[0]) {
    const breed = await this.breedRepo.findOneByName(breedName);

    return breed;
  }

  async getOneById(breedId: Parameters<BreedRepository['findOneById']>[0]) {
    const breed = await this.breedRepo.findOneById(breedId);

    return breed;
  }

  async updateOneById(breed: Parameters<BreedRepository['updateOneById']>[0]) {
    const updatedBreed = await this.breedRepo.updateOneById(breed);

    return updatedBreed;
  }
}
