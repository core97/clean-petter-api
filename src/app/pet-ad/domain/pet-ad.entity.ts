import { Address, AddressProps } from '@shared/domain/address.value-object';
import { Entity } from '@shared/domain/types/entity';
import {
  FileStoraged,
  FileStoragedProps,
} from '@shared/domain/file-storaged.value-object';

export class PetAd extends Entity {
  address: Address;

  breedIds: string[];

  dateBirth: Date;

  images: FileStoraged[];

  name: string;

  userId: string;

  constructor(
    props: Pick<
      PetAd,
      'id' | 'createdAt' | 'breedIds' | 'dateBirth' | 'name' | 'userId'
    > & {
      address: AddressProps;
      images: FileStoragedProps[];
    }
  ) {
    super(props);
    this.address = new Address(props.address);
    this.breedIds = props.breedIds;
    this.dateBirth = props.dateBirth;
    this.images = props.images.map(img => new FileStoraged(img));
    this.name = props.name;
    this.userId = props.userId;
  }
}

export type PetAdProps = ConstructorParameters<typeof PetAd>[0];
