import { PetAdRepository } from '@pet-ad/domain/pet-ad.repository';

export class PetAdDeleterOneById {
  constructor(
    private petAdRepo: PetAdRepository,
  ) {}

  async run(petAdId: Parameters<PetAdRepository['deleteOneById']>[0]) {
    await this.petAdRepo.deleteOneById(petAdId);
  }
}
