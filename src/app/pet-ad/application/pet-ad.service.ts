import { PetAdRepository } from '@pet-ad/domain/pet-ad.repository';
import { PetAdValidator } from '@pet-ad/application/pet-ad-validator';

export class PetAdService {
  constructor(
    private petAdRepo: PetAdRepository,
    private petAdValidator: PetAdValidator
  ) {}

  async create(petAd: Parameters<PetAdRepository['create']>[0]) {
    await this.petAdValidator.validate(petAd);

    const petAdCreated = await this.petAdRepo.create(petAd);

    return petAdCreated;
  }

  async deleteByUser(userId: Parameters<PetAdRepository['deleteByUser']>[0]) {
    await this.petAdRepo.deleteByUser(userId);
  }

  async deleteOneById(
    petAdId: Parameters<PetAdRepository['deleteOneById']>[0]
  ) {
    await this.petAdRepo.deleteOneById(petAdId);
  }

  async getByCountry(filters: Parameters<PetAdRepository['findByCountry']>[0]) {
    const petAds = await this.petAdRepo.findByCountry(filters);

    return petAds;
  }

  async getByUser(userId: Parameters<PetAdRepository['findByUser']>[0]) {
    const petAds = await this.petAdRepo.findByUser(userId);

    return petAds;
  }

  async updateOneById(petAd: Parameters<PetAdRepository['updateOneById']>[0]) {
    await this.petAdValidator.validate(petAd);

    const updatedPetAd = await this.petAdRepo.updateOneById(petAd);

    return updatedPetAd;
  }
}
