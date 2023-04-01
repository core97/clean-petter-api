import { User } from '@user/domain/user.entity';
import { UserRepository } from '@user/domain/user.repository';
import { Prisma } from '@shared/infra/persistence/prisma-client';
import { NotFoundError } from '@shared/application/errors/not-found.error';

export default class PrismaUserClient implements UserRepository {
  private prisma: Prisma;

  constructor(dependencies: { prisma: Prisma }) {
    this.prisma = dependencies.prisma;
  }

  async create(user: Pick<User['props'], 'email' | 'name' | 'password'>) {
    const userCreated = await this.prisma.client.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
      },
    });

    return User.instantiate({
      createdAt: userCreated.createdAt,
      email: userCreated.email,
      id: userCreated.id,
      name: userCreated.name,
      password: userCreated.password,
    });
  }

  async deleteOneByEmail(email: User['props']['email']) {
    await this.prisma.client.user.delete({
      where: { email },
    });
  }

  async findOneByEmail(email: User['props']['email']) {
    const user = await this.prisma.client.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundError('not found user');
    }

    return User.instantiate(user);
  }

  async updateOneByEmail(
    user: Pick<User['props'], 'email'> &
      Partial<Omit<User['props'], 'petAds' | 'email'>>
  ) {
    const updatedUser = await this.prisma.client.user.update({
      where: {
        email: user.email,
      },
      data: {
        ...user,
        address: user.address?.props,
      },
    });

    return User.instantiate(updatedUser);
  }
}
