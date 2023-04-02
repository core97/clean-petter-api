import { Request, Response, NextFunction } from 'express';
import * as Sentry from '@sentry/node';

export const sentryScopeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Sentry.configureScope(scope => {
    scope.addEventProcessor(event => Sentry.addRequestDataToEvent(event, req));

    scope.setTag('Type', 'Request');

    scope.setContext('Request', {
      'x-request-id': res.getHeader('x-request-id'),
    });

    if (req.payload.user) {
      scope.setUser({
        email: req.payload.user.email,
        id: req.payload.user.id,
      });
    }
  });

  next();
};
