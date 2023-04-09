import { PetAdRepository } from '@pet-ad/domain/pet-ad.repository';
import { PetAd, PetAdProps } from '@pet-ad/domain/pet-ad.entity';
import { Prisma } from '@shared/infra/persistence/prisma-client';
import { CountryIso } from '@shared/domain/types/country';
import { NotFoundError } from '@shared/application/errors/not-found.error';
import {
  PaginationParams,
  PaginationResult,
} from '@shared/domain/types/pagination';

export default class PrismaPetAdRepository implements PetAdRepository {
  private prisma: Prisma;

  constructor(dependencies: { prisma: Prisma }) {
    this.prisma = dependencies.prisma;
  }

  async findOneById(id: string): Promise<PetAd> {
    const petAd = await this.prisma.client.petAd.findUnique({ where: { id } });

    if (!petAd) {
      throw new NotFoundError('Not found pet ad by id');
    }

    return PetAd.toDomain(petAd);
  }

  async create(petAd: PetAdProps): Promise<PetAd> {
    const petAdCreated = await this.prisma.client.petAd.create({
      data: petAd,
    });

    return PetAd.toDomain(petAdCreated);
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
      results: petAds.map(petAd => PetAd.toDomain(petAd)),
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

    return petAds.map(petAd => PetAd.toDomain(petAd));
  }

  async updateOneById(
    petAd: Pick<PetAdProps, 'id'> & Partial<PetAdProps>
  ): Promise<PetAd> {
    const updatedPetAd = await this.prisma.client.petAd.update({
      where: {
        id: petAd.id,
      },
      data: petAd,
    });

    return PetAd.toDomain(updatedPetAd);
  }
}
