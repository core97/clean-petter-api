import { PetAdRepository } from '@pet-ad/domain/pet-ad.repository';

export class PetAdFinderByUser {
  constructor(private petAdRepo: PetAdRepository) {}

  async run(userId: Parameters<PetAdRepository['findByUser']>[0]) {
    const petAds = await this.petAdRepo.findByUser(userId);

    return petAds;
  }
}
