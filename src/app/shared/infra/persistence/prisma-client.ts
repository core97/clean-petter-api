import PetAdValidator from '@pet-ad/application/pet-ad-validator';
import UserValidator from '@user/application/user-validator';
import VisitValidator from '@visit/application/visit-validator';
import { PrismaClient, Prisma as PrismaModule } from '@prisma/client';

export class Prisma {
  client: PrismaClient;

  constructor(
    private deps: {
      petAdValidator: PetAdValidator;
      userValidator: UserValidator;
      visitValidator: VisitValidator;
    }
  ) {
    this.client = new PrismaClient();
    this.setMiddlewares();
  }

  private setMiddlewares() {
    this.setValidatorMiddleware();
  }

  private setValidatorMiddleware() {
    const validate: {
      [key in PrismaModule.ModelName]?: Function;
    } = {
      PetAd: this.deps.petAdValidator.validate,
      User: this.deps.petAdValidator.validate,
      Visit: this.deps.petAdValidator.validate,
    };

    this.client.$use(async (params, next) => {
      if (
        params.model &&
        (params.action === 'create' ||
          params.action === 'createMany' ||
          params.action === 'update' ||
          params.action === 'updateMany' ||
          params.action === 'upsert')
      ) {
        const modelName = params.model;

        if (Array.isArray(params.args.data)) {
          await Promise.all(
            params.args.data.map(async (data: any) => {
              if (typeof params.args.data === 'object') {
                await validate[modelName]?.(data);
              }
            })
          );
        } else if (typeof params.args.data === 'object') {
          await validate[modelName]?.(params.args.data);
        }
      }

      return next(params);
    });
  }
}
