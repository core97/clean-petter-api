import { Entity } from '@shared/domain/types/entity';
import { PetType } from '@shared/domain/types/pet-type';

export class Breed {
  constructor(
    public props: Entity & {
      name: string;
      petType: PetType;
      petAdsId: string[];
    }
  ) {
    Object.assign(this, props);
  }

  static instantiate(breed: Breed['props']) {
    return new Breed(breed);
  }
}
