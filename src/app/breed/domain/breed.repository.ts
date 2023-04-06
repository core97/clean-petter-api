import { Breed, BreedProps } from '@breed/domain/breed.entity';
import { PetType } from '@shared/domain/types/pet-type';
import { Repository } from '@shared/domain/types/repository';

export interface BreedRepository extends Repository<Breed, BreedProps> {
  findByPetType(petType: PetType): Promise<Breed[]>;

  findOneByName(name: string): Promise<Breed>;
}
