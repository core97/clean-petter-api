import { BreedRepository } from '@breed/domain/breed.repository';

export class BreedFinderOneByName {
  constructor(private breedRepo: BreedRepository) {}

  async run(breedName: Parameters<BreedRepository['findOneByName']>[0]) {
    const breed = await this.breedRepo.findOneByName(breedName);

    return breed;
  }
}
