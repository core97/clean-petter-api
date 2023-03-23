import { PetAd } from '@pet-ad/domain/pet-ad.entity';
import { User } from '@user/domain/user.entity';
import { CatBreed, DogBreed } from '@breed/domain/enums/breed-name.enum';
import { CountryIso } from '@shared/domain/enums/country.enum';
import {
  PaginationParams,
  PaginationResult,
} from '@shared/domain/types/pagination';

export interface PetAdRepository {
  create(
    petAd: Omit<PetAd['props'], 'breeds'> & { breeds: CatBreed[] | DogBreed[] }
  ): Promise<PetAd>;

  deleteOneById(id: PetAd['props']['id']): Promise<void>;

  deleteByUser(userId: User['props']['id']): Promise<void>;

  findByFilters(
    filters: PaginationParams & { country: CountryIso } & Partial<
        Pick<PetAd['props'], 'breeds'>
      >
  ): Promise<PaginationResult<PetAd>>;

  findByUser(params: Pick<User['props'], 'id'>): Promise<PetAd[]>;

  updateOneById(
    petAd: Pick<PetAd['props'], 'id'> &
      Partial<Omit<PetAd['props'], 'breeds'> & { breeds: CatBreed[] | DogBreed[] }>
  ): Promise<PetAd>;
}
