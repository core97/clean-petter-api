import { PetAdRepository } from '@pet-ad/domain/pet-ad.repository';

export class PetAdDeleterByUser {
  constructor(private petAdRepo: PetAdRepository) {}

  async run(userId: Parameters<PetAdRepository['deleteByUser']>[0]) {
    await this.petAdRepo.deleteByUser(userId);
  }
}
