import { PetAdRepository } from '@pet-ad/domain/pet-ad.repository';
import { PetAdValidator } from '@pet-ad/application/pet-ad-validator';
import { BreedRepository } from '@breed/domain/breed.repository';

export class PetAdCreator {
  constructor(
    private petAdRepo: PetAdRepository,
    private breedRepo: BreedRepository
  ) {}

  async run(petAd: Parameters<PetAdRepository['create']>[0]) {
    const breeds = await Promise.all(
      petAd.breeds.map(this.breedRepo.findOneByName)
    );

    PetAdValidator.validate({ ...petAd, breeds });

    const petAdCreated = await this.petAdRepo.create(petAd);

    return petAdCreated;
  }
}
