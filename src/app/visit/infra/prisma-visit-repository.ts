import { VisitRepository } from '@visit/domain/visit.repository';
import { VisitProps, Visit } from '@visit/domain/visit.entity';
import { NotFoundError } from '@shared/application/errors/not-found.error';
import { Prisma } from '@shared/infra/persistence/prisma-client';

export default class PrismaVisitClient implements VisitRepository {
  private prisma: Prisma;

  constructor(dependencies: { prisma: Prisma }) {
    this.prisma = dependencies.prisma;
  }

  async findOneById(id: string): Promise<Visit> {
    const result = await this.prisma.client.visit.findUnique({ where: { id } });

    if (!result) {
      throw new NotFoundError('Not found visit by id');
    }

    return result;
  }

  async create(visit: VisitProps): Promise<Visit> {
    const createdVisit = await this.prisma.client.visit.create({
      data: visit,
    });

    return new Visit(createdVisit);
  }

  async deleteOneById(id: string): Promise<void> {
    await this.prisma.client.breed.delete({ where: { id } });
  }

  async updateOneById(
    visit: Pick<VisitProps, 'id'> & Partial<VisitProps>
  ): Promise<Visit> {
    const updatedVisit = await this.prisma.client.visit.update({
      where: {
        id: visit.id,
      },
      data: visit,
    });

    return new Visit(updatedVisit);
  }
}
