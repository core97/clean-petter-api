import * as awilix from 'awilix';

export const petAdModules = awilix.listModules(
  [
    ['application/*.ts', { register: awilix.asClass }],
    [
      'infra/prisma-pet-ad-repository.ts',
      {
        name: 'petAdRepository',
        register: awilix.asClass,
        lifetime: awilix.Lifetime.SINGLETON,
      },
    ],
  ],
  {
    cwd: 'src/app/pet-ad',
  }
);
