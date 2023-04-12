import { User, UserProps } from '@user/domain/user.entity';
import { UserRepository } from '@user/domain/user.repository';
import { Prisma } from '@shared/infra/persistence/prisma-client';
import { NotFoundError } from '@shared/application/errors/not-found.error';
import { PrismaRepository } from '@shared/infra/persistence/prisma-repository';

export default class PrismaUserClient
  extends PrismaRepository<User, UserProps>
  implements UserRepository
{
  constructor(deps: { prisma: Prisma }) {
    super(User, 'user', deps.prisma);
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
      throw new NotFoundError(`Not found "${this.modelName}" by email`);
    }

    return new User(user);
  }

  async updateOneByEmail(user: Pick<UserProps, 'email'> & Partial<UserProps>) {
    const updatedUser = await this.prisma.client.user.update({
      where: {
        email: user.email,
      },
      data: user,
    });

    return new User(updatedUser);
  }
}
