import * as awilix from 'awilix';

export const visitModules = awilix.listModules(
  [
    ['application/*.ts', { register: awilix.asClass }],
    [
      'infra/prisma-visit-repository.ts',
      {
        name: 'visitRepository',
        register: awilix.asClass,
        lifetime: awilix.Lifetime.SINGLETON,
      },
    ],
  ],
  {
    cwd: 'src/app/visit',
  }
);
