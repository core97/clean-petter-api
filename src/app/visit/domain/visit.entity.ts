import { VisitStatus } from '@visit/domain/types/visit-status';
import { VisitType } from '@visit/domain/types/visit-type';
import { Entity } from '@shared/domain/types/entity';
import { Address, AddressProps } from '@shared/domain/address.value-object';

export class Visit extends Entity {
  address: Address;

  userId: string;

  status: VisitStatus;

  date: Date;

  userIdToConfirm: string;

  petAdRequestId: string;

  type: VisitType;

  constructor(
    props: Pick<
      Visit,
      | 'id'
      | 'createdAt'
      | 'date'
      | 'petAdRequestId'
      | 'status'
      | 'type'
      | 'userId'
      | 'userIdToConfirm'
    > & { address: AddressProps }
  ) {
    super(props);
    this.address = new Address(props.address);
    this.userId = props.userId;
    this.status = props.status;
    this.date = props.date;
    this.userIdToConfirm = props.userIdToConfirm;
    this.petAdRequestId = props.petAdRequestId;
    this.type = props.type;
  }
}

export type VisitProps = ConstructorParameters<typeof Visit>[0];
