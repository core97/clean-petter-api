import { BreedRepository } from '@breed/domain/breed.repository';

export class BreedCreator {
  constructor(private breedRepo: BreedRepository) {}

  async run(breed: Parameters<BreedRepository['create']>[0]) {
    const breedCreated = await this.breedRepo.create(breed);

    return breedCreated;
  }
}
