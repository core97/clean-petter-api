import { PetAd } from '@pet-ad/domain/pet-ad.entity';
import { CatBreed, DogBreed } from '@breed/domain/enums/breed-name.enum';
import { Entity } from '@shared/domain//types/entity';

export class Breed {
  constructor(
    public props: Entity & {
      name: CatBreed | DogBreed;
      petAds?: PetAd[];
    }
  ) {
    Object.assign(this, props);
  }
}
