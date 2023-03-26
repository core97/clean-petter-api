import { Address } from '@shared/domain/address.value-object';
import { Entity } from '@shared/domain//types/entity';

export class PetAd {
  constructor(
    public props: Entity & {
      address: Address;
      breedIds: string[];
      name: string;
      userId: string;
    }
  ) {
    Object.assign(this, props);
  }

  static instantiate(
    petAd: Omit<PetAd['props'], 'address'> & {
      address: Address['props'];
    }
  ) {
    return new PetAd({ ...petAd, address: new Address(petAd.address) });
  }
}
