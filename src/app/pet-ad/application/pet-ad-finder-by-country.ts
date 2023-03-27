import { PetAdRepository } from '@pet-ad/domain/pet-ad.repository';

export class PetAdFinderByCountry {
  constructor(private petAdRepo: PetAdRepository) {}

  async run(filters: Parameters<PetAdRepository['findByCountry']>[0]) {
    const petAds = await this.petAdRepo.findByCountry(filters);

    return petAds;
  }
}
