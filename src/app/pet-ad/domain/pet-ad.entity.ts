import { Breed } from '@breed/domain/breed.entity';
import { User } from '@user/domain/user.entity';
import { Address } from '@shared/domain/address.value-object';
import { Entity } from '@shared/domain//types/entity';

export class PetAd {
  constructor(
    public props: Entity & {
      address: Address;
      breeds: Breed[];
      name: string;
      user: User;
    }
  ) {
    Object.assign(this, props);
  }
}
