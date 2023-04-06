import { RequestStatus } from '@pet-ad-request/domain/types/request-status';
import { EntityV2 } from '@shared/domain/types/entity';

export class PetAdRequest extends EntityV2 {
  interestedUserId!: string;

  petAdId!: string;

  status!: RequestStatus;

  constructor(
    props: Pick<
      PetAdRequest,
      'id' | 'createdAt' | 'interestedUserId' | 'petAdId' | 'status'
    >
  ) {
    super(props);
    Object.assign(this, props);
  }
}

export type PetAdRequestProps = ConstructorParameters<typeof PetAdRequest>[0];
