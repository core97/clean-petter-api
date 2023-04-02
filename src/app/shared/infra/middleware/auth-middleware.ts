import { Request, Response, NextFunction } from 'express';
import { Authentication } from '@shared/application/authentication';
import { UnauthorizatedError } from '@shared/application/errors/unauthorizated.error';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const scopedContainer = req.payload.container;
  const authentication =
    scopedContainer.resolve<Authentication>('authentication');

  try {
    const token = req.cookies[process.env.AUTH_COOKIE_NAME];

    if (!token) {
      throw new UnauthorizatedError('auth token missing');
    }

    const authPayload = authentication.validateAuthToken(token);

    req.payload = {
      ...(req.payload || {}),
      user: authPayload,
    };

    next();
  } catch (error) {
    next(error);
  }
};
