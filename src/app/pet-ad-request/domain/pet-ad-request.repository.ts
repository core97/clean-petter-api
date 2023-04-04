import { PetAdRequest } from '@pet-ad-request/domain/pet-ad-request.entity';

export interface PetAdRequestRepository {
  create(petAdRequest: PetAdRequest['props']): Promise<PetAdRequest>;

  deleteOneById(id: PetAdRequest['props']['id']): Promise<void>;

  updateOneById(
    petAd: Pick<PetAdRequest['props'], 'id'> & Partial<PetAdRequest['props']>
  ): Promise<PetAdRequest>;
}
