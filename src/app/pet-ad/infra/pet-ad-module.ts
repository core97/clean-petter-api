import * as awilix from 'awilix';
import PetAdValidator from '@pet-ad/application/pet-ad-validator';
import PetAdService from '@pet-ad/application/pet-ad.service';
import PrismaPetAdRepository from '@pet-ad/infra/prisma-pet-ad-repository';
import { container } from '@shared/infra/dependencies/container';

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

export const registerPetAdModules = () => {
  container.register({
    petAdValidator: awilix.asClass(PetAdValidator),
    petAdService: awilix.asClass(PetAdService),
    petAdRepository: awilix.asClass(PrismaPetAdRepository).singleton(),
  });
};
