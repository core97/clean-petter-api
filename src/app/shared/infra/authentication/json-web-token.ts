import { sign, verify } from 'jsonwebtoken';
import {
  Authentication,
  AutTokenPayload,
} from '@shared/application/authentication';

export class JsonWebToken extends Authentication {
  validateAuthToken(token?: string): AutTokenPayload {
    try {
      const decodedToken = verify(
        token || '',
        process.env.MY_SECRET_AUTH_TOKEN as string
      );

      if (typeof decodedToken === 'string') {
        throw new Error('Invalid token.');
      }

      const payload: AutTokenPayload = {
        email: decodedToken.email,
        id: decodedToken.id,
      };

      return payload;
    } catch (error) {
      throw new Error('Token missing or invalid.');
    }
  }

  createAuthToken({ email, id }: AutTokenPayload): string {
    const payloadForToken = { id, email };

    const token = sign(
      payloadForToken,
      process.env.MY_SECRET_AUTH_TOKEN as string,
      {
        expiresIn: 60 * 60 * 24 * 7, // One week
      }
    );

    return token;
  }
}
