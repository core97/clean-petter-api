import { Request, Response } from 'express';
import { Authentication } from '@shared/application/authentication';
import { container } from '@shared/infra/dependencies/container';

const checkAuth = (req: Request, authentication: Authentication) => {
  try {
    const token = req.cookies[process.env.AUTH_COOKIE_NAME];

    const authPayload = authentication.validateAuthToken(token);

    req.payload = {
      ...(req.payload || {}),
      user: authPayload,
    };
  } catch (error) {
    console.error(error);
    throw Error('auth is required');
  }
};

export const handleRequest =
  <T>(
    controllerInstanceName: string,
    methodName: keyof T,
    options: { authRequired?: boolean } = {}
  ) =>
  async (req: Request, res: Response) => {
    const scopedContainer = container.createScope();

    const controllerInstance = scopedContainer.resolve(controllerInstanceName);

    if (options.authRequired) {
      const auth = scopedContainer.resolve<Authentication>('authentication');

      checkAuth(req, auth);
    }

    await controllerInstance[methodName](req, res);
  };
