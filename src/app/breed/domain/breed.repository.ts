import { Breed, BreedProps } from '@breed/domain/breed.entity';
import { PetType } from '@shared/domain/types/pet-type';
import { Repository } from '@shared/domain/types/repository';
import {
  PaginationResult,
  PaginationParams,
} from '@shared/domain/types/pagination';

export interface BreedRepository extends Repository<Breed, BreedProps> {
  findByPetType(params: {
    petType: PetType;
    pagination?: PaginationParams;
  }): Promise<PaginationResult<Breed>>;

  findOneByName(name: string): Promise<Breed>;
}
