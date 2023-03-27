import { PetAd } from '@pet-ad/domain/pet-ad.entity';
import { User } from '@user/domain/user.entity';
import { CountryIso } from '@shared/domain/types/country';
import {
  PaginationParams,
  PaginationResult,
} from '@shared/domain/types/pagination';

export interface PetAdRepository {
  create(petAd: PetAd['props']): Promise<PetAd>;

  deleteOneById(id: PetAd['props']['id']): Promise<void>;

  deleteByUser(userId: User['props']['id']): Promise<void>;

  findByCountry(
    filters: PaginationParams & { country: CountryIso } & Partial<
        Pick<PetAd['props'], 'breedIds'>
      >
  ): Promise<PaginationResult<PetAd>>;

  findByUser(userId: User['props']['id']): Promise<PetAd[]>;

  updateOneById(
    petAd: Pick<PetAd['props'], 'id'> & Partial<PetAd['props']>
  ): Promise<PetAd>;
}
