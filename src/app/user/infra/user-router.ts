import { Router } from 'express';
import UserController from '@user/infra/user-controller';
import { handleRequest } from '@shared/infra/middlewares/handle-request';

export const getUserRouter = () => {
  const userRouter = Router();

  userRouter.get(
    '/:email',
    handleRequest<UserController>('userController', 'userByEmailGet')
  );

  userRouter.patch(
    '/:email',
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
    handleRequest<UserController>('userController', 'userAccountDelete')
  );

  return userRouter;
};
