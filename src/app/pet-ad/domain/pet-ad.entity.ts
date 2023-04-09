import { Address, AddressProps } from '@shared/domain/address.value-object';
import { Entity } from '@shared/domain/types/entity';

export class PetAd extends Entity {
  address!: Address;

  breedIds!: string[];

  name!: string;

  userId!: string;

  constructor(
    props: Pick<
      PetAd,
      'id' | 'createdAt' | 'address' | 'breedIds' | 'name' | 'userId'
    >
  ) {
    super(props);
    Object.assign(this, props);
  }

  static toDomain(
    petAd: Omit<PetAdProps, 'address'> & { address: AddressProps }
  ) {
    return new PetAd({
      ...petAd,
      address: new Address(petAd.address),
    });
  }
}

export type PetAdProps = ConstructorParameters<typeof PetAd>[0];
