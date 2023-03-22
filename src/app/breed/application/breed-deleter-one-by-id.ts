import { BreedRepository } from '@breed/domain/breed.repository';

export class BreedDeleterOneById {
  constructor(private breedRepo: BreedRepository) {}

  async run(breedId: Parameters<BreedRepository['deleteOneById']>[0]) {
    // TODO: remove pet ads with this breed
    await this.breedRepo.deleteOneById(breedId);
  }
}
