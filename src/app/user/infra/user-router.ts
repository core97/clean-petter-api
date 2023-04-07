import { Router } from 'express';
import UserController from '@user/infra/user-controller';
import { authMiddleware } from '@shared/infra/middleware/auth-middleware';
import { handleRequest } from '@shared/infra/server/express-handle-request';

export const userRouter = Router();

userRouter.get(
  '/preadoption',
  authMiddleware,
  handleRequest<UserController>('userController', 'peadoptionGet')
);

userRouter.get(
  '/:email',
  authMiddleware,
  handleRequest<UserController>('userController', 'userByEmailGet')
);

userRouter.patch(
  '/:email',
  authMiddleware,
  handleRequest<UserController>('userController', 'userPatch')
);

userRouter.put(
  '/sign-in',
  handleRequest<UserController>('userController', 'signInPut')
);

userRouter.post(
  '/sign-up',
  handleRequest<UserController>('userController', 'signUpPost')
);

userRouter.delete(
  '/:email',
  authMiddleware,
  handleRequest<UserController>('userController', 'userAccountDelete')
);
