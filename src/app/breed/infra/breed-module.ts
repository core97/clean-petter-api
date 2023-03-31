import * as awilix from 'awilix';
import BreedService from '@breed/application/breed.service';
import PrismaBreedRepository from '@breed/infra/prisma-breed-repository';
import { container } from '@shared/infra/dependencies/container';

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

export const registerBreedModules = () => {
  container.register({
    breedService: awilix.asClass(BreedService),
    breedRepository: awilix.asClass(PrismaBreedRepository).singleton(),
  });
};
