import { PetAd } from '@pet-ad/domain/pet-ad.entity';
import { Address } from '@shared/domain/address.value-object';
import { Entity } from '@shared/domain//types/entity';

export class User {
  constructor(
    public props: Entity & {
      email: string;
      name: string;
      petAds: PetAd[];
      password: string;
      address?: Address;
    }
  ) {
    Object.assign(this, props);
  }
}
