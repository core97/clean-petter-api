import * as awilix from 'awilix';

export const breedModules = awilix.listModules(
  [
    ['application/*.ts', { register: awilix.asClass }],
    [
      'infra/prisma-breed-repository.ts',
      {
        name: 'breedRepository',
        register: awilix.asClass,
        lifetime: awilix.Lifetime.SINGLETON,
      },
    ],
    [
      'infra/breed-controller.ts',
      {
        name: 'breedController',
        register: awilix.asClass,
        lifetime: awilix.Lifetime.SINGLETON,
      },
    ],
  ],
  {
    cwd: 'src/app/breed',
  }
);
