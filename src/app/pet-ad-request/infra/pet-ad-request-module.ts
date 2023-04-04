import * as awilix from 'awilix';

export const petAdRequestModules = awilix.listModules(
  [
    ['application/*.ts', { register: awilix.asClass }],
    [
      'infra/prisma-pet-ad-request-repository.ts',
      {
        name: 'petAdRequestRepository',
        register: awilix.asClass,
        lifetime: awilix.Lifetime.SINGLETON,
      },
    ],
  ],
  {
    cwd: 'src/app/pet-ad-request',
  }
);
