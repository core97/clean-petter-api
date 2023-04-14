import { Entity } from '@shared/domain/types/entity';
import { PetType } from '@shared/domain/types/pet-type';

export class Breed extends Entity {
  name: string;

  petType: PetType;

  petAdsId: string[];

  constructor(
    props: Pick<Breed, 'id' | 'createdAt' | 'name' | 'petAdsId' | 'petType'>
  ) {
    super(props);
    this.name = props.name;
    this.petType = props.petType;
    this.petAdsId = props.petAdsId;
  }
}

export type BreedProps = ConstructorParameters<typeof Breed>[0];
