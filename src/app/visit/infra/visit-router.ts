import { Router } from 'express';
import VisitController from '@visit/infra/visit-controller';
import { authMiddleware } from '@shared/infra/middleware/auth-middleware';
import { handleRequest } from '@shared/infra/server/express-handle-request';

export const visitRouter = Router();

visitRouter.get(
  '/mine',
  authMiddleware,
  handleRequest<VisitController>('visitController', 'visitByUserGet')
);

visitRouter.get(
  '/:visitId',
  handleRequest<VisitController>('visitController', 'visitByIdGet')
);

visitRouter.delete(
  '/:visitId',
  authMiddleware,
  handleRequest<VisitController>('visitController', 'visitByIdDelete')
);

visitRouter.post(
  '/',
  authMiddleware,
  handleRequest<VisitController>('visitController', 'visitPost')
);

visitRouter.patch(
  '/',
  authMiddleware,
  handleRequest<VisitController>('visitController', 'visitPatch')
);
