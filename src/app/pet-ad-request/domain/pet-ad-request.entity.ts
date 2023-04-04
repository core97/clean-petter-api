import { RequestStatus } from '@pet-ad-request/domain/types/request-status';
import { Entity } from '@shared/domain/types/entity';

export class PetAdRequest {
  constructor(
    public props: Entity & {
      interestedUserId: string;
      petAdId: string;
      status: RequestStatus;
    }
  ) {
    Object.assign(this, props);
  }

  static instantiate(petAdRequest: PetAdRequest['props']) {
    return new PetAdRequest(petAdRequest);
  }
}
