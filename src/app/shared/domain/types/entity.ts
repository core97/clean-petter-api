export abstract class Entity {
  id: string;

  createdAt: Date;

  constructor(props: Pick<Entity, 'id' | 'createdAt'>) {
    this.id = props.id;
    this.createdAt = props.createdAt;
  }
}

export type EntityProps = ConstructorParameters<typeof Entity>[0];
