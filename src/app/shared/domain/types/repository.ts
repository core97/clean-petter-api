import { EntityV2 } from '@shared/domain/types/entity';

export interface Repository<
  TClass extends EntityV2,
  TProps extends ConstructorParameters<typeof EntityV2>[0]
> {
  create(aggregateRoot: TProps): Promise<TClass>;

  deleteOneById(id: string): Promise<void>;

  findOneById(id: string): Promise<TClass>;

  updateOneById(
    aggregateRoot: Pick<TProps, 'id'> & Partial<TProps>
  ): Promise<TClass>;
}
