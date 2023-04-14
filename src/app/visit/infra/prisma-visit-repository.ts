import { VisitRepository } from '@visit/domain/visit.repository';
import { VisitProps, Visit } from '@visit/domain/visit.entity';
import { Prisma } from '@shared/infra/persistence/prisma-client';
import { PrismaRepository } from '@shared/infra/persistence/prisma-repository';

export default class PrismaVisitClient
  extends PrismaRepository<Visit, VisitProps>
  implements VisitRepository
{
  constructor(deps: { prisma: Prisma }) {
    super(Visit, 'visit', deps.prisma);
  }
}
