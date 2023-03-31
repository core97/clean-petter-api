import * as awilix from 'awilix';
import { StringUtils } from '@shared/application/string-utils';
import { JsonWebToken } from '@shared/infra/authentication/json-web-token';
import { Bcrypt } from '@shared/infra/cryptographic/bcrypt';
import { Prisma } from '@shared/infra/persistence/prisma-client';
import { breedModules } from '@breed/infra/breed-module';
import { petAdModules } from '@pet-ad/infra/pet-ad-module';
import { userModules } from '@user/infra/user-module';

export const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

export const setUpDependencies = () => {
  container.register({
    authentication: awilix.asClass(JsonWebToken),
    cryptographic: awilix.asClass(Bcrypt),
    prisma: awilix.asClass(Prisma).singleton(),
  });

  container.loadModules(
    [...breedModules, ...petAdModules, ...userModules].map(module => [
      module.path,
      module.opts,
    ]),
    {
      formatName: (name, description) =>
        StringUtils.toCamelCase(
          (description.opts?.name as string | undefined) || name
        ),
    }
  );
};
