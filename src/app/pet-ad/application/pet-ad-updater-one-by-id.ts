import { PetAdRepository } from '@pet-ad/domain/pet-ad.repository';
import { PetAdValidator } from '@pet-ad/application/pet-ad-validator';

export class PetAdUpdaterOneById {
  constructor(
    private petAdRepo: PetAdRepository,
    private petAdValidator: PetAdValidator,
  ) {}

  async run(petAd: Parameters<PetAdRepository['updateOneById']>[0]) {
    await this.petAdValidator.validate(petAd);

    const updatedPetAd = await this.petAdRepo.updateOneById(petAd);

    return updatedPetAd;
  }
}
