import { PrismaClient, Prisma as PrismaModule } from '@prisma/client';
import PetAdValidator from '@pet-ad/application/pet-ad-validator';
import UserValidator from '@user/application/user-validator';
import VisitValidator from '@visit/application/visit-validator';
import { InternalServerError } from '@shared/application/errors/internal-server.error';

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
    this.setMethodsAllowedMiddleware();
    this.setValidatorMiddleware();
  }

  private setMethodsAllowedMiddleware() {
    this.client.$use(async (params, next) => {
      if (params.model && this.isAllowedAction(params.action)) {
        throw new InternalServerError(
          `"${params.action}" action is not allowed for Prisma`
        );
      }

      return next(params);
    });
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
      if (params.model && this.isAllowedAction(params.action)) {
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

  private isAllowedAction(prismaAction: PrismaModule.PrismaAction) {
    const notAllowedActions: PrismaModule.PrismaAction[] = ['createMany'];

    return notAllowedActions.every(action => action !== prismaAction);
  }
}
