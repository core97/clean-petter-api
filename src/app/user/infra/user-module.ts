import * as awilix from 'awilix';
import UserAccountDeleter from '@user/application/user-account-deleter';
import UserFinderOneByEmail from '@user/application/user-finder-one-by-email';
import UserSignIn from '@user/application/user-sign-in';
import UserSignUp from '@user/application/user-sign-up';
import UserUpdaterOneByEmail from '@user/application/user-updater-one-by-email';
import UserValidator from '@user/application/user-validator';
import PrismaUserRepository from '@user/infra/prisma-user-repository';
import UserController from '@user/infra/user-controller';
import { container } from '@shared/infra/dependencies/container';

export const userModules = awilix.listModules(
  [
    ['application/*.ts', { register: awilix.asClass }],
    [
      'infra/prisma-user-repository.ts',
      {
        name: 'userRepository',
        register: awilix.asClass,
        lifetime: awilix.Lifetime.SINGLETON,
      },
    ],
    [
      'infra/user-controller.ts',
      {
        register: awilix.asClass,
        lifetime: awilix.Lifetime.SINGLETON,
      },
    ],
  ],
  {
    cwd: 'src/app/user',
  }
);

export const registerUserModules = () => {
  container.register({
    userAccountDeleter: awilix.asClass(UserAccountDeleter),
    userFinderOneByEmail: awilix.asClass(UserFinderOneByEmail),
    userSignIn: awilix.asClass(UserSignIn),
    userSignUp: awilix.asClass(UserSignUp),
    userUpdaterOneByEmail: awilix.asClass(UserUpdaterOneByEmail),
    userValidator: awilix.asClass(UserValidator),
    userRepository: awilix.asClass(PrismaUserRepository),
    userController: awilix.asClass(UserController),
  });
};
