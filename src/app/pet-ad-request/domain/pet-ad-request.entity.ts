import { RequestStatus } from '@pet-ad-request/domain/types/request-status';
import { Entity } from '@shared/domain/types/entity';

export class PetAdRequest extends Entity {
  userId: string;

  petAdId: string;

  status: RequestStatus;

  constructor(
    props: Pick<
      PetAdRequest,
      'id' | 'createdAt' | 'userId' | 'petAdId' | 'status'
    >
  ) {
    super(props);
    this.userId = props.userId;
    this.petAdId = props.petAdId;
    this.status = props.status;
  }
}

export type PetAdRequestProps = ConstructorParameters<typeof PetAdRequest>[0];
