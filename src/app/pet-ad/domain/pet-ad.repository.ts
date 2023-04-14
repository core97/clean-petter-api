import { PetAd, PetAdProps } from '@pet-ad/domain/pet-ad.entity';
import { PetAdSortOptions } from '@pet-ad/domain/types/pet-ad-sort-options';
import { User } from '@user/domain/user.entity';
import { CountryIso } from '@shared/domain/types/country';
import { PetType } from '@shared/domain/types/pet-type';
import { Repository } from '@shared/domain/types/repository';
import {
  PaginationParams,
  PaginationResult,
} from '@shared/domain/types/pagination';

export interface PetAdRepository extends Repository<PetAd, PetAdProps> {
  deleteByUser(userId: User['id']): Promise<void>;

  findByCountry(
    filters: Partial<Pick<PetAd, 'breedIds'>> & {
      country: CountryIso;
      petType: PetType;
      sortBy?: PetAdSortOptions;
      pagination?: PaginationParams;
    }
  ): Promise<PaginationResult<PetAd>>;

  findByUser(userId: string): Promise<PetAd[]>;
}
