import { BreedRepository } from '@breed/domain/breed.repository';

export class BreedFinderByPetType {
  constructor(private breedRepo: BreedRepository) {}

  async run(petType: Parameters<BreedRepository['findByPetType']>[0]) {
    const breeds = await this.breedRepo.findByPetType(petType);

    return breeds;
  }
}
