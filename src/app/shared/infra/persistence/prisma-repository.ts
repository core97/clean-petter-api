/* eslint-disable new-cap */
import { PrismaClient } from '@prisma/client';
import { Entity, EntityProps } from '@shared/domain/types/entity';
import { Repository } from '@shared/domain/types/repository';
import { NotFoundError } from '@shared/application/errors/not-found.error';
import { InternalServerError } from '@shared/application/errors/internal-server.error';
import { Prisma } from '@shared/infra/persistence/prisma-client';

type ModelName = keyof Pick<
  PrismaClient,
  'breed' | 'petAd' | 'petAdRequest' | 'user' | 'visit'
>;

export class PrismaRepository<
  TEntity extends Entity,
  TProps extends EntityProps
> implements Repository<TEntity, TProps>
{
  constructor(
    private deps: {
      classConstructor: new (...args: any) => TEntity;
      modelName: ModelName;
      prisma: Prisma;
    }
  ) {}

  async create(aggregateRoot: TProps): Promise<TEntity> {
    const result = await this.getModel().create({
      data: aggregateRoot,
    });

    return new this.deps.classConstructor(result);
  }

  async deleteOneById(id: string): Promise<void> {
    await this.getModel().delete({
      where: { id },
    });
  }

  async updateOneById(
    aggregateRoot: Pick<TProps, 'id'> & Partial<TProps>
  ): Promise<TEntity> {
    const result = await this.getModel().update({
      where: {
        id: aggregateRoot.id,
      },
      data: aggregateRoot,
    });

    return new this.deps.classConstructor(result);
  }

  async findOneById(id: string) {
    const result = await this.getModel().findFirst({
      where: { id },
    });

    if (!result) {
      throw new NotFoundError(`Not found "${this.deps.modelName}" by id`);
    }

    return new this.deps.classConstructor(result);
  }

  private getModel() {
    const model = this.deps.prisma.client[this.deps.modelName];
    const methods: (keyof typeof model)[] = [
      'findFirst',
      'update',
      'create',
      'delete',
    ];

    if (
      typeof model === 'object' &&
      methods.every(method => typeof model[method] === 'function')
    ) {
      return model as any;
    }

    throw new InternalServerError(
      `No exist "${this.deps.modelName}" model in Prisma`
    );
  }
}
