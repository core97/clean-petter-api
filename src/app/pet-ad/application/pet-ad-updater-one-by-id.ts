import { PetAdRepository } from '@pet-ad/domain/pet-ad.repository';
import { PetAdValidator } from '@pet-ad/application/pet-ad-validator';
import { Breed } from '@breed/domain/breed.entity';
import { BreedRepository } from '@breed/domain/breed.repository';

export class PetAdUpdaterOneById {
  constructor(
    private petAdRepo: PetAdRepository,
    private breedRepo: BreedRepository
  ) {}

  async run(petAd: Parameters<PetAdRepository['updateOneById']>[0]) {
    let breeds: Breed[] = [];

    if (petAd.breeds) {
      breeds = await Promise.all(
        petAd.breeds.map(this.breedRepo.findOneByName)
      );
    }

    PetAdValidator.validate({ ...petAd, breeds });

    const petAdCreated = await this.petAdRepo.updateOneById(petAd);

    return petAdCreated;
  }
}
