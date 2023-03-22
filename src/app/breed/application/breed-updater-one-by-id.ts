import { BreedRepository } from '@breed/domain/breed.repository';

export class BreedUpdaterOneById {
  constructor(private breedRepo: BreedRepository) {}

  async run(breed: Parameters<BreedRepository['updateOneById']>[0]) {
    const updatedBreed = await this.breedRepo.updateOneById(breed);

    return updatedBreed;
  }
}
