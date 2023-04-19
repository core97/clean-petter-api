import { Router } from 'express';
import MediaStorageController from '@shared/infra/controllers/media-storage-controller';
import { authMiddleware } from '@shared/infra/middleware/auth-middleware';
import { filesMiddleware } from '@shared/infra/middleware/files-middleware';
import { handleRequest } from '@shared/infra/server/express-handle-request';

export const mediaStorageRouter = Router();

mediaStorageRouter.post(
  '/',
  authMiddleware,
  filesMiddleware,
  handleRequest<MediaStorageController>(
    'mediaStorageController',
    'mediaFilePost'
  )
);

mediaStorageRouter.delete(
  '/:publicId',
  authMiddleware,
  handleRequest<MediaStorageController>(
    'mediaStorageController',
    'mediaFileDelete'
  )
);
