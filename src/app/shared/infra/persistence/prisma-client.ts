import { PrismaClient, Prisma as PrismaModule } from '@prisma/client';
import { InternalServerError } from '@shared/application/errors/internal-server.error';

export class Prisma {
  client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
    this.setMiddlewares();
  }

  private setMiddlewares() {
    this.setMethodsAllowedMiddleware();
  }

  private setMethodsAllowedMiddleware() {
    this.client.$use(async (params, next) => {
      if (params.model && !this.isAllowedAction(params.action)) {
        throw new InternalServerError(
          `"${params.action}" action is not allowed for Prisma`
        );
      }

      return next(params);
    });
  }

  private isAllowedAction(prismaAction: PrismaModule.PrismaAction) {
    const notAllowedActions: PrismaModule.PrismaAction[] = ['createMany'];

    return notAllowedActions.every(action => action !== prismaAction);
  }
}
