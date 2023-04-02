import { Request, Response, NextFunction } from 'express';
import * as awilix from 'awilix';
import { v4 as uuidV4 } from 'uuid';
import { PinoLogger } from '@shared/infra/logger/pino-logger';

export const handleRequest =
  <T>(controllerInstanceName: string, methodName: keyof T) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestId = uuidV4();

      res.setHeader('x-request-id', requestId);

      req.payload.container.register({
        logger: awilix.asClass(PinoLogger).inject(() => ({
          isEnabled: true,
          level: 'info',
          requestId,
          method: req.method,
          url: req.originalUrl,
        })),
      });

      const controllerInstance = req.payload.container.resolve(
        controllerInstanceName
      );

      await controllerInstance[methodName](req, res);
    } catch (error) {
      next(error);
    }
  };
