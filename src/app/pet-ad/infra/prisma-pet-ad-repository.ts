import { PetAdRepository } from '@pet-ad/domain/pet-ad.repository';
import { PetAd, PetAdProps } from '@pet-ad/domain/pet-ad.entity';
import { Prisma } from '@shared/infra/persistence/prisma-client';
import { CountryIso } from '@shared/domain/types/country';
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
    filters: PaginationParams & { country: CountryIso } & Partial<
        Pick<PetAdProps, 'breedIds'>
      >
  ): Promise<PaginationResult<PetAd>> {
    const whereFilter = {
      address: {
        is: {
          country: filters.country,
        },
      },
      ...(filters.breedIds && {
        breedIds: {
          hasSome: filters.breedIds,
        },
      }),
    };

    const [totalResults, petAds] = await Promise.all([
      this.prisma.client.petAd.count({
        where: whereFilter,
      }),
      this.prisma.client.petAd.findMany({
        where: whereFilter,
        skip: filters.limit * filters.page,
        take: filters.limit,
        orderBy: {
          createdAt: 'desc',
        },
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
