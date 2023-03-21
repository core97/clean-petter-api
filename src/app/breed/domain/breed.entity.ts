import { PetAd } from '@pet-ad/domain/pet-ad.entity';
import { BreedName } from '@breed/domain/enums/breed-name.enum';
import { PetType } from '@shared/domain/enums/pet-type.enum';
import { Entity } from '@shared/domain//types/entity';

export class Breed {
  constructor(
    public props: Entity & {
      name: BreedName;
      petAds: PetAd[];
      petType: PetType;
    }
  ) {
    Object.assign(this, props);
  }
}
