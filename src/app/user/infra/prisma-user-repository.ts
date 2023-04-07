import { User, UserProps } from '@user/domain/user.entity';
import { UserRepository } from '@user/domain/user.repository';
import { Prisma } from '@shared/infra/persistence/prisma-client';
import { Logger } from '@shared/application/logger';
import { NotFoundError } from '@shared/application/errors/not-found.error';

export default class PrismaUserClient implements UserRepository {
  private prisma: Prisma;

  constructor(dependencies: { prisma: Prisma, logger: Logger }) {
    this.prisma = dependencies.prisma;
  }

  async deleteOneById(id: string): Promise<void> {
    await this.prisma.client.user.delete({
      where: { id },
    });
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.prisma.client.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundError('not found user by id');
    }

    return new User(user);
  }

  async updateOneById(
    user: Pick<UserProps, 'id'> & Partial<UserProps>
  ): Promise<User> {
    const updatedUser = await this.prisma.client.user.update({
      where: {
        email: user.email,
      },
      data: user,
    });

    return new User(updatedUser);
  }

  async create(user: Pick<UserProps, 'email' | 'name' | 'password'>) {
    const userCreated = await this.prisma.client.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
      },
    });

    return new User(userCreated);
  }

  async deleteOneByEmail(email: UserProps['email']) {
    await this.prisma.client.user.delete({
      where: { email },
    });
  }

  async findOneByEmail(email: UserProps['email']) {
    const user = await this.prisma.client.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundError('not found user by email');
    }

    return new User(user);
  }

  async updateOneByEmail(
    user: Pick<UserProps, 'email'> &
      Partial<Omit<UserProps, 'petAds' | 'email'>>
  ) {
    const updatedUser = await this.prisma.client.user.update({
      where: {
        email: user.email,
      },
      data: user,
    });

    return new User(updatedUser);
  }
}
