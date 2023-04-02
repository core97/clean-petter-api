import { NextFunction, Request, Response } from 'express';
import { Logger } from '@shared/application/logger';
import { Tracker } from '@shared/application/tracker';
import { AppError } from '@shared/application/errors/app-error';
import { ERROR_CODE_TO_HTTP_STATUS } from '@shared/application/http/http-errors';
import { HttpStatus } from '@shared/application/http/http-status';

export const globalErrorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const scopedContainer = req.payload.container;
    const logger = scopedContainer.resolve<Logger>('logger');
    const tracker = scopedContainer.resolve<Tracker>('tracker');

    if (error instanceof AppError) {
      const httpStatus = ERROR_CODE_TO_HTTP_STATUS[error.code];

      logger.error(error.message);

      tracker.trackError(error);

      res.status(httpStatus).end();

      return;
    }

    logger.fatal(`${error}`);

    tracker.trackError(new Error(`unexpected error: ${error}`));

    res.status(HttpStatus.INTERNAL_ERROR).end();
};
