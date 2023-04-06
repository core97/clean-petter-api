import { EntityV2 } from '@shared/domain/types/entity';
import { PetType } from '@shared/domain/types/pet-type';

export class Breed extends EntityV2 {
  name!: string;

  petType!: PetType;

  petAdsId!: string[];

  constructor(
    props: Pick<Breed, 'id' | 'createdAt' | 'name' | 'petAdsId' | 'petType'>
  ) {
    super(props);
    Object.assign(this, props);
  }
}

export type BreedProps = ConstructorParameters<typeof Breed>[0];
