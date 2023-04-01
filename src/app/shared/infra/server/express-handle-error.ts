import { Request, Response } from 'express';
import { AppError } from '@shared/application/errors/app-error';
import { ERROR_CODE_TO_HTTP_STATUS } from '@shared/application/http/http-errors';
import { HttpStatus } from '@shared/application/http/http-status';

export const expressHandleError = (
  error: unknown,
  req: Request,
  res: Response
) => {
  console.error(`::: URL ::: ${req.method} ${req.url}`);
  console.error(error);

  if (error instanceof AppError) {
    const httpStatus = ERROR_CODE_TO_HTTP_STATUS[error.code];
    res.status(httpStatus).end();
    return;
  }

  res.status(HttpStatus.INTERNAL_ERROR).end();
};
