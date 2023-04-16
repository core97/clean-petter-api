import { Router } from 'express';
import PetAdController from '@pet-ad/infra/pet-ad-controller';
import { authMiddleware } from '@shared/infra/middleware/auth-middleware';
import { handleRequest } from '@shared/infra/server/express-handle-request';

export const petAdRouter = Router();

petAdRouter.get(
  '/mine',
  authMiddleware,
  handleRequest<PetAdController>('petAdController', 'petAdByUserGet')
);

petAdRouter.get(
  '/country',
  handleRequest<PetAdController>('petAdController', 'petAdByCountryGet')
);

petAdRouter.get(
  '/:petAdId',
  handleRequest<PetAdController>('petAdController', 'petAdByIdGet')
);

petAdRouter.delete(
  '/:petAdId',
  authMiddleware,
  handleRequest<PetAdController>('petAdController', 'petAdByIdDelete')
);

petAdRouter.post(
  '/',
  authMiddleware,
  handleRequest<PetAdController>('petAdController', 'petAdPost')
);

petAdRouter.patch(
  '/',
  authMiddleware,
  handleRequest<PetAdController>('petAdController', 'petAdPatch')
);
