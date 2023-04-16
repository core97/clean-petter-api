import { Prisma as PrismaClient } from '@prisma/client';
import { PetAdRepository } from '@pet-ad/domain/pet-ad.repository';
import { PetAd, PetAdProps } from '@pet-ad/domain/pet-ad.entity';
import { PetAdSortOption } from '@pet-ad/domain/types/pet-ad-sort-options';
import { Prisma } from '@shared/infra/persistence/prisma-client';
import { CountryIso } from '@shared/domain/types/country';
import { PetType } from '@shared/domain/types/pet-type';
import { PrismaRepository } from '@shared/infra/persistence/prisma-repository';
import {
  PaginationParams,
  PaginationResult,
} from '@shared/domain/types/pagination';

export default class PrismaPetAdRepository
  extends PrismaRepository<PetAd, PetAdProps>
  implements PetAdRepository
{
  constructor(deps: { prisma: Prisma }) {
    super(PetAd, 'petAd', deps.prisma);
  }

  async deleteByUser(userId: string): Promise<void> {
    await this.prisma.client.petAd.deleteMany({
      where: {
        userId,
      },
    });
  }

  async findByCountry(
    filters: Partial<Pick<PetAd, 'breedIds'>> & {
      country: CountryIso;
      petType: PetType;
      pagination?: PaginationParams;
      sortBy?: PetAdSortOption;
    }
  ): Promise<PaginationResult<PetAd>> {
    const whereFilter: PrismaClient.PetAdWhereInput = {
      address: {
        is: {
          country: filters.country,
        },
      },
      breeds: {
        every: {
          petType: filters.petType,
        },
      },
      ...(filters.breedIds && {
        breedIds: {
          hasSome: filters.breedIds,
        },
      }),
    };

    const sortFilter: Record<PetAdSortOption, Record<string, string>> = {
      created_at_asc: {
        createdAt: 'asc',
      },
      created_at_desc: {
        createdAt: 'desc',
      },
      relevance: {
        createdAt: 'asc',
        dateBirth: 'dec',
      },
    };

    const [totalResults, petAds] = await Promise.all([
      this.prisma.client.petAd.count({
        where: whereFilter,
      }),
      this.prisma.client.petAd.findMany({
        where: whereFilter,
        ...(filters.sortBy && { orderBy: sortFilter[filters.sortBy] }),
      }),
    ]);

    return {
      results: petAds.map(petAd => new PetAd(petAd)),
      total: totalResults,
    };
  }

  async findByUser(userId: string): Promise<PetAd[]> {
    const petAds = await this.prisma.client.petAd.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return petAds.map(petAd => new PetAd(petAd));
  }
}
