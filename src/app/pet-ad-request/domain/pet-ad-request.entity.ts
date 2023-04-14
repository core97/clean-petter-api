import { RequestStatus } from '@pet-ad-request/domain/types/request-status';
import { Entity } from '@shared/domain/types/entity';

export class PetAdRequest extends Entity {
  interestedUserId: string;

  petAdId: string;

  status: RequestStatus;

  constructor(
    props: Pick<
      PetAdRequest,
      'id' | 'createdAt' | 'interestedUserId' | 'petAdId' | 'status'
    >
  ) {
    super(props);
    this.interestedUserId = props.interestedUserId;
    this.petAdId = props.petAdId;
    this.status = props.status;
  }
}

export type PetAdRequestProps = ConstructorParameters<typeof PetAdRequest>[0];
