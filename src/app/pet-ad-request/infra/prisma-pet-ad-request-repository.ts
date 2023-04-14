import { PetAdRequestRepository } from '@pet-ad-request/domain/pet-ad-request.repository';
import {
  PetAdRequest,
  PetAdRequestProps,
} from '@pet-ad-request/domain/pet-ad-request.entity';
import { Prisma } from '@shared/infra/persistence/prisma-client';
import { PrismaRepository } from '@shared/infra/persistence/prisma-repository';

export default class PrismaPetAdRequestRepository
  extends PrismaRepository<PetAdRequest, PetAdRequestProps>
  implements PetAdRequestRepository
{
  constructor(deps: { prisma: Prisma }) {
    super(PetAdRequest, 'petAdRequest', deps.prisma);
  }

  async findByPetAd(petAdId: string): Promise<PetAdRequest[]> {
    const results = await this.prisma.client.petAdRequest.findMany({
      where: {
        petAdId,
      },
    });

    return results;
  }
}
