import * as awilix from 'awilix';
import { registerBreedModules } from '@breed/infra/breed-module';
import { registerPetAdModules } from '@pet-ad/infra/pet-ad-module';
import { registerUserModules } from '@user/infra/user-module';
import { JsonWebToken } from '@shared/infra/authentication/json-web-token';
import { Bcrypt } from '@shared/infra/cryptographic/bcrypt';
import { Prisma } from '@shared/infra/persistence/prisma-client';

/* import { breedModules } from '@breed/infra/breed-module';
import { petAdModules } from '@pet-ad/infra/pet-ad-module';
import { userModules } from '@user/infra/user-module'; */

/* const toCamelCase = (str: string) =>
  str.replace(/[-_.]\w/g, match => match.charAt(1).toUpperCase()); */

export const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
  require
});

export const setUpDependencies = () => {
  container.register({
    authentication: awilix.asClass(JsonWebToken),
    cryptographic: awilix.asClass(Bcrypt),
    prisma: awilix.asClass(Prisma).singleton(),
  });

  registerBreedModules();
  registerPetAdModules();
  registerUserModules();
};

/* container.loadModules(
  [...breedModules, ...petAdModules, ...userModules].map(module => [
    module.path,
    module.opts,
  ]),
  {
    formatName: (name, description) =>
      toCamelCase((description.opts?.name as string | undefined) || name),
  }
); */
