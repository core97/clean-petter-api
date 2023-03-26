import { Breed } from '@breed/domain/breed.entity';
import { PetType } from '@shared/domain/types/pet-type';

export interface BreedRepository {
  create(breed: Omit<Breed['props'], 'petAds'>): Promise<Breed>;

  deleteOneById(id: Breed['props']['id']): Promise<void>;

  findByPetType(petType: PetType): Promise<Breed[]>;

  findOneByName(name: string): Promise<Breed | null>;

  findOneById(breedId: string): Promise<Breed | null>;

  updateOneById(
    breed: Pick<Breed['props'], 'id'> & Partial<Omit<Breed['props'], 'petAds'>>
  ): Promise<Breed>;
}
