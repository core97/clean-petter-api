import { Request, Response } from 'express';
import * as awilix from 'awilix';
import { v4 as uuidV4 } from 'uuid';
import { Authentication } from '@shared/application/authentication';
import { PinoLogger } from '@shared/infra/logger/pino-logger';
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
      const requestId = uuidV4();

      res.setHeader('x-request-id', requestId);

      const scopedContainer = container.createScope();

      scopedContainer.register({
        logger: awilix.asClass(PinoLogger).inject(() => ({
          isEnabled: true,
          level: 'info',
          requestId,
          method: req.method,
          url: req.originalUrl,
        })),
      });

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
