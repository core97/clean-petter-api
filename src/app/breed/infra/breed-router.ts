import { Router } from 'express';
import BreedController from '@breed/infra/breed-controller';
import { authMiddleware } from '@shared/infra/middleware/auth-middleware';
import { handleRequest } from '@shared/infra/server/express-handle-request';

export const breedRouter = Router();

breedRouter.get(
  '/:breedId',
  handleRequest<BreedController>('breedController', 'breedByIdGet')
);

breedRouter.get(
  '/list/:petType',
  authMiddleware,
  handleRequest<BreedController>('breedController', 'breedsByPetTypeGet')
);

breedRouter.delete(
  '/:breedId',
  authMiddleware,
  handleRequest<BreedController>('breedController', 'breedDelete')
);

breedRouter.post(
  '/',
  authMiddleware,
  handleRequest<BreedController>('breedController', 'breedPost')
);

breedRouter.patch(
  '/:breedId',
  authMiddleware,
  handleRequest<BreedController>('breedController', 'breedPatch')
);
