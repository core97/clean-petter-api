import { BreedRepository } from '@breed/domain/breed.repository';

export default class BreedService {
  private breedRepository: BreedRepository;

  constructor(dependencies: { breedRepository: BreedRepository }) {
    this.breedRepository = dependencies.breedRepository;
  }

  async create(breed: Parameters<BreedRepository['create']>[0]) {
    const breedCreated = await this.breedRepository.create(breed);

    return breedCreated;
  }

  async deleteOneById(
    breedId: Parameters<BreedRepository['deleteOneById']>[0]
  ) {
    // TODO: remove pet ads with this breed
    await this.breedRepository.deleteOneById(breedId);
  }

  async getByPetType(petType: Parameters<BreedRepository['findByPetType']>[0]) {
    const breeds = await this.breedRepository.findByPetType(petType);

    return breeds;
  }

  async getOneByName(
    breedName: Parameters<BreedRepository['findOneByName']>[0]
  ) {
    const breed = await this.breedRepository.findOneByName(breedName);

    return breed;
  }

  async getOneById(breedId: Parameters<BreedRepository['findOneById']>[0]) {
    const breed = await this.breedRepository.findOneById(breedId);

    return breed;
  }

  async updateOneById(breed: Parameters<BreedRepository['updateOneById']>[0]) {
    const updatedBreed = await this.breedRepository.updateOneById(breed);

    return updatedBreed;
  }
}
