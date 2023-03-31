import * as awilix from 'awilix';

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
