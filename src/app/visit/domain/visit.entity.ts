import { VisitStatus } from '@visit/domain/types/visit-status';
import { Entity } from '@shared/domain/types/entity';
import { Address } from '@shared/domain/address.value-object';

export class Visit extends Entity {
  address!: Address;

  userId!: string;

  status!: VisitStatus;

  date!: Date;

  userIdToConfirm!: string;

  petAdRequestId!: string;

  constructor(
    props: Pick<
      Visit,
      | 'id'
      | 'createdAt'
      | 'address'
      | 'date'
      | 'petAdRequestId'
      | 'status'
      | 'userId'
      | 'userIdToConfirm'
    >
  ) {
    super(props);
    Object.assign(this, props);
  }
}

export type VisitProps = ConstructorParameters<typeof Visit>[0];
