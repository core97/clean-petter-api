import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@user/domain/types/user-role';
import { Authentication } from '@shared/application/authentication';
import { UnauthorizatedError } from '@shared/application/errors/unauthorizated.error';
import { ForbiddenError } from '@shared/application/errors/forbidden.error';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
  options: {
    role?: UserRole;
  } = {}
) => {
  const scopedContainer = req.payload.container;
  const authentication =
    scopedContainer.resolve<Authentication>('authentication');

  try {
    const token = req.cookies[process.env.AUTH_COOKIE_NAME];

    if (!token) {
      throw new UnauthorizatedError('Auth token missing');
    }

    const authPayload = authentication.validateAuthToken(token);

    if (options.role && authPayload.role  !== options.role) {
      throw new ForbiddenError('You do not have permissions');
    }

    req.payload = {
      ...(req.payload || {}),
      user: authPayload,
    };

    next();
  } catch (error) {
    next(error);
  }
};
