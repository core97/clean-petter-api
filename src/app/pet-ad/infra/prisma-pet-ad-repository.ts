import { PetAdRepository } from '@pet-ad/domain/pet-ad.repository';
import { PetAd } from '@pet-ad/domain/pet-ad.entity';
import { Prisma } from '@shared/infra/persistence/prisma-client';
import { CountryIso } from '@shared/domain/types/country';
import {
  PaginationParams,
  PaginationResult,
} from '@shared/domain/types/pagination';

export class PrismaPetAdRepository implements PetAdRepository {
  constructor(private prisma: Prisma) {}

  async create(petAd: PetAd['props']): Promise<PetAd> {
    const petAdCreated = await this.prisma.client.petAd.create({
      data: {
        address: petAd.address.props,
        name: petAd.name,
        user: {
          connect: {
            id: petAd.userId,
          },
        },
      },
    });

    return PetAd.instantiate(petAdCreated);
  }

  async deleteOneById(id: string): Promise<void> {
    await this.prisma.client.petAd.delete({
      where: {
        id,
      },
    });
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
        Pick<PetAd['props'], 'breedIds'>
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
      results: petAds.map(PetAd.instantiate),
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

    return petAds.map(PetAd.instantiate);
  }

  async updateOneById(
    petAd: Pick<PetAd['props'], 'id'> & Partial<PetAd['props']>
  ): Promise<PetAd> {
    const { address, ...rest } = petAd;

    const updatedPetAd = await this.prisma.client.petAd.update({
      where: {
        id: petAd.id,
      },
      data: {
        ...rest,
        ...(address && { address: address.props }),
      },
    });

    return PetAd.instantiate(updatedPetAd);
  }
}
