import { Request, Response } from 'express';
import { Authentication } from '@shared/application/authentication';
import { container } from '@shared/infra/dependencies/container';
import { expressHandleError } from '@shared/infra/server/express-handle-error';
import { expressHandleAuth } from '@shared/infra/server/express-handle-auth';

export const handleRequest =
  <T>(
    controllerInstanceName: string,
    methodName: keyof T,
    options: { authRequired?: boolean } = {}
  ) =>
  async (req: Request, res: Response) => {
    try {
      const scopedContainer = container.createScope();

      const controllerInstance = scopedContainer.resolve(
        controllerInstanceName
      );

      if (options.authRequired) {
        const auth = scopedContainer.resolve<Authentication>('authentication');

        expressHandleAuth(req, auth);
      }

      await controllerInstance[methodName](req, res);
    } catch (error) {
      expressHandleError(error, req, res);
    }
  };
