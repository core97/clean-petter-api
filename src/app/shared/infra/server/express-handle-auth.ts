import { Request } from 'express';
import { Authentication } from '@shared/application/authentication';

export const expressHandleAuth = (
  req: Request,
  authentication: Authentication
) => {
  const token = req.cookies[process.env.AUTH_COOKIE_NAME];

  if (!token) {
    throw Error('auth token missing');
  }

  try {
    const authPayload = authentication.validateAuthToken(token);

    req.payload = {
      ...(req.payload || {}),
      user: authPayload,
    };
  } catch (error) {
    throw Error('auth token is invalid');
  }
};
