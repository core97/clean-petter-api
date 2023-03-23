import { PetAdRepository } from '@pet-ad/domain/pet-ad.repository';

export class PetAdFinderByFilters {
  constructor(private petAdRepo: PetAdRepository) {}

  async run(filters: Parameters<PetAdRepository['findByFilters']>[0]) {
    const petAds = await this.petAdRepo.findByFilters(filters);

    return petAds;
  }
}
