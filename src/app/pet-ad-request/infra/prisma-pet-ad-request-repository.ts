import { PetAdRequestRepository } from '@pet-ad-request/domain/pet-ad-request.repository';
import { PetAdRequest } from '@pet-ad-request/domain/pet-ad-request.entity';
import { Prisma } from '@shared/infra/persistence/prisma-client';

export default class PrismaPetAdRequestRepository
  implements PetAdRequestRepository
{
  private prisma: Prisma;

  constructor(dependencies: { prisma: Prisma }) {
    this.prisma = dependencies.prisma;
  }

  async create(petAdRequest: PetAdRequest['props']): Promise<PetAdRequest> {
    const petAdRequestCreated = await this.prisma.client.petAdRequest.create({
      data: {
        ...petAdRequest,
      },
    });

    return PetAdRequest.instantiate(petAdRequestCreated);
  }

  async deleteOneById(id: string): Promise<void> {
    await this.prisma.client.petAdRequest.delete({
      where: {
        id,
      },
    });
  }

  async updateOneById(
    petAdRequest: Pick<PetAdRequest['props'], 'id'> &
      Partial<PetAdRequest['props']>
  ): Promise<PetAdRequest> {
    const updatedPetAdRequest = await this.prisma.client.petAdRequest.update({
      where: {
        id: petAdRequest.id,
      },
      data: {
        ...petAdRequest,
      },
    });

    return PetAdRequest.instantiate(updatedPetAdRequest);
  }
}
