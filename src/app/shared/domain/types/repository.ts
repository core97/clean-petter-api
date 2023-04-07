import { Entity } from '@shared/domain/types/entity';

export interface Repository<
  TClass extends Entity,
  TProps extends ConstructorParameters<typeof Entity>[0]
> {
  create(aggregateRoot: TProps): Promise<TClass>;

  deleteOneById(id: string): Promise<void>;

  findOneById(id: string): Promise<TClass>;

  updateOneById(
    aggregateRoot: Pick<TProps, 'id'> & Partial<TProps>
  ): Promise<TClass>;
}
