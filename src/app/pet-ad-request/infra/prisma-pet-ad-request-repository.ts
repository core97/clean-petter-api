import { PetAdRequestRepository } from '@pet-ad-request/domain/pet-ad-request.repository';
import {
  PetAdRequest,
  PetAdRequestProps,
} from '@pet-ad-request/domain/pet-ad-request.entity';
import { NotFoundError } from '@shared/application/errors/not-found.error';
import { Prisma } from '@shared/infra/persistence/prisma-client';

export default class PrismaPetAdRequestRepository
  implements PetAdRequestRepository
{
  private prisma: Prisma;

  constructor(dependencies: { prisma: Prisma }) {
    this.prisma = dependencies.prisma;
  }

  async findOneById(id: string): Promise<PetAdRequest> {
    const petAdRequest = await this.prisma.client.petAdRequest.findUnique({
      where: { id },
    });

    if (!petAdRequest) {
      throw new NotFoundError('Not found pet ad request by id');
    }

    return new PetAdRequest(petAdRequest);
  }

  async create(petAdRequest: PetAdRequestProps): Promise<PetAdRequest> {
    const petAdRequestCreated = await this.prisma.client.petAdRequest.create({
      data: {
        ...petAdRequest,
      },
    });

    return new PetAdRequest(petAdRequestCreated);
  }

  async deleteOneById(id: string): Promise<void> {
    await this.prisma.client.petAdRequest.delete({
      where: {
        id,
      },
    });
  }

  async updateOneById(
    petAdRequest: Pick<PetAdRequestProps, 'id'> & Partial<PetAdRequestProps>
  ): Promise<PetAdRequest> {
    const updatedPetAdRequest = await this.prisma.client.petAdRequest.update({
      where: {
        id: petAdRequest.id,
      },
      data: {
        ...petAdRequest,
      },
    });

    return new PetAdRequest(updatedPetAdRequest);
  }
}
