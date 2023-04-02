import { Request, Response, NextFunction } from 'express';
import { container } from '@shared/infra/dependencies/container';

export const containerScopeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.payload = {
    container: container.createScope(),
  };

  next();
};
