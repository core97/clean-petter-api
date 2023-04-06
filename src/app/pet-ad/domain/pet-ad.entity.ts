import { Address } from '@shared/domain/address.value-object';
import { EntityV2 } from '@shared/domain/types/entity';

export class PetAd extends EntityV2 {
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
}

export type PetAdProps = ConstructorParameters<typeof PetAd>[0];
