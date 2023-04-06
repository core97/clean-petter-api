import { PetAdRepository } from '@pet-ad/domain/pet-ad.repository';
import PetAdValidator from '@pet-ad/application/pet-ad-validator';

export default class PetAdService {
  private petAdRepository: PetAdRepository;

  private petAdValidator: PetAdValidator;

  constructor(dependencies: {
    petAdRepository: PetAdRepository;
    petAdValidator: PetAdValidator;
  }) {
    this.petAdRepository = dependencies.petAdRepository;
    this.petAdValidator = dependencies.petAdValidator;
  }

  async create(petAd: Parameters<PetAdRepository['create']>[0]) {
    await this.petAdValidator.validate(petAd);

    const petAdCreated = await this.petAdRepository.create(petAd);

    return petAdCreated;
  }

  async deleteByUser(userId: Parameters<PetAdRepository['deleteByUser']>[0]) {
    await this.petAdRepository.deleteByUser(userId);
  }

  async deleteOneById(
    petAdId: Parameters<PetAdRepository['deleteOneById']>[0]
  ) {
    await this.petAdRepository.deleteOneById(petAdId);
  }

  async getByCountry(filters: Parameters<PetAdRepository['findByCountry']>[0]) {
    const petAds = await this.petAdRepository.findByCountry(filters);

    return petAds;
  }

  async getOneById(id: Parameters<PetAdRepository['findOneById']>[0]) {
    const petAd = await this.petAdRepository.findOneById(id);

    return petAd;
  }

  async getByUser(userId: Parameters<PetAdRepository['findByUser']>[0]) {
    const petAds = await this.petAdRepository.findByUser(userId);

    return petAds;
  }

  async updateOneById(petAd: Parameters<PetAdRepository['updateOneById']>[0]) {
    await this.petAdValidator.validate(petAd);

    const updatedPetAd = await this.petAdRepository.updateOneById(petAd);

    return updatedPetAd;
  }
}
