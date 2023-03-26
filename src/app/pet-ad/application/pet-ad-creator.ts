import { PetAdRepository } from '@pet-ad/domain/pet-ad.repository';
import { PetAdValidator } from '@pet-ad/application/pet-ad-validator';

export class PetAdCreator {
  constructor(
    private petAdRepo: PetAdRepository,
    private petAdValidator: PetAdValidator
  ) {}

  async run(petAd: Parameters<PetAdRepository['create']>[0]) {
    await this.petAdValidator.validate(petAd);

    const petAdCreated = await this.petAdRepo.create(petAd);

    return petAdCreated;
  }
}
