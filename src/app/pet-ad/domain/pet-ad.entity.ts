import { Address, AddressProps } from '@shared/domain/address.value-object';
import { Entity } from '@shared/domain/types/entity';

export class PetAd extends Entity {
  address: Address;

  breedIds: string[];

  name: string;

  userId: string;

  constructor(
    props: Pick<PetAd, 'id' | 'createdAt' | 'breedIds' | 'name' | 'userId'> & {
      address: AddressProps;
    }
  ) {
    super(props);
    this.address = new Address(props.address);
    this.breedIds = props.breedIds;
    this.name = props.name;
    this.userId = props.userId;
  }
}

export type PetAdProps = ConstructorParameters<typeof PetAd>[0];
