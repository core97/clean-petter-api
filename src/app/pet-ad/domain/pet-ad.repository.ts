import { PetAd, PetAdProps } from '@pet-ad/domain/pet-ad.entity';
import { User } from '@user/domain/user.entity';
import { CountryIso } from '@shared/domain/types/country';
import { Repository } from '@shared/domain/types/repository';
import {
  PaginationParams,
  PaginationResult,
} from '@shared/domain/types/pagination';

export interface PetAdRepository extends Repository<PetAd, PetAdProps> {
  deleteByUser(userId: User['props']['id']): Promise<void>;

  findByCountry(
    filters: PaginationParams & { country: CountryIso } & Partial<
        Pick<PetAdProps, 'breedIds'>
      >
  ): Promise<PaginationResult<PetAd>>;

  findByUser(userId: string): Promise<PetAd[]>;
}
