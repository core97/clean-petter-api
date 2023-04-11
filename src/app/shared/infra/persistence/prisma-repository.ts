/* eslint-disable new-cap */
import { PrismaClient } from '@prisma/client';
import { Entity } from '@shared/domain/types/entity';
import { NotFoundError } from '@shared/application/errors/not-found.error';
import { InternalServerError } from '@shared/application/errors/internal-server.error';
import { Prisma } from '@shared/infra/persistence/prisma-client';

export class PrismaRepository<T extends Entity> {
  constructor(
    private deps: {
      toDomain: (...args: any) => T;
      modelName: keyof Pick<
        PrismaClient,
        'breed' | 'petAd' | 'petAdRequest' | 'user' | 'visit'
      >;
      prisma: Prisma;
    }
  ) {}

  async findOneById(id: string) {
    const result = await this.getModel().findFirst({
      where: { id },
    });

    if (!result) {
      throw new NotFoundError(`not found "${this.deps.modelName}" by id`);
    }

    return this.deps.toDomain(result);
  }

  private getModel() {
    const model = this.deps.prisma.client[this.deps.modelName];

    if (
      typeof model === 'object' &&
      typeof model.findFirst === 'function' &&
      typeof model.update === 'function' &&
      typeof model.create === 'function' &&
      typeof model.delete === 'function'
    ) {
      return model as any;
    }

    throw new InternalServerError('No exist model in Prisma');
  }
}
