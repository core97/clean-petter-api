import { PetAdRepository } from '@pet-ad/domain/pet-ad.repository';
import PetAdValidator from '@pet-ad/application/pet-ad-validator';

export default class PetAdService {
  constructor(
    private deps: {
      petAdRepository: PetAdRepository;
      petAdValidator: PetAdValidator;
    }
  ) {}

  async create(petAd: Parameters<PetAdRepository['create']>[0]) {
    await this.deps.petAdValidator.validate(petAd);

    const petAdCreated = await this.deps.petAdRepository.create(petAd);

    return petAdCreated;
  }

  async deleteByUser(userId: Parameters<PetAdRepository['deleteByUser']>[0]) {
    await this.deps.petAdRepository.deleteByUser(userId);
  }

  async deleteOneById(
    petAdId: Parameters<PetAdRepository['deleteOneById']>[0]
  ) {
    await this.deps.petAdRepository.deleteOneById(petAdId);
  }

  async getByCountry(filters: Parameters<PetAdRepository['findByCountry']>[0]) {
    const petAds = await this.deps.petAdRepository.findByCountry(filters);

    return petAds;
  }

  async getOneById(id: Parameters<PetAdRepository['findOneById']>[0]) {
    const petAd = await this.deps.petAdRepository.findOneById(id);

    return petAd;
  }

  async getByUser(userId: Parameters<PetAdRepository['findByUser']>[0]) {
    const petAds = await this.deps.petAdRepository.findByUser(userId);

    return petAds;
  }

  async updateOneById(petAd: Parameters<PetAdRepository['updateOneById']>[0]) {
    await this.deps.petAdValidator.validate(petAd);

    const updatedPetAd = await this.deps.petAdRepository.updateOneById(petAd);

    return updatedPetAd;
  }
}
