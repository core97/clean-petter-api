import { Breed } from '@breed/domain/breed.entity';
import { CatBreed, DogBreed } from '@breed/domain/enums/breed-name.enum';
import { PetType } from '@shared/domain/enums/pet-type.enum';

export interface BreedRepository {
  create(breed: Omit<Breed['props'], 'petAds'>): Promise<Breed>;

  deleteOneById(id: Breed['props']['id']): Promise<void>;

  findByPetType(petType: PetType): Promise<Breed[]>;

  findOneByName(name: CatBreed | DogBreed): Promise<Breed>;

  updateOneById(
    breed: Pick<Breed['props'], 'id'> & Partial<Omit<Breed['props'], 'petAds'>>
  ): Promise<Breed>;
}
