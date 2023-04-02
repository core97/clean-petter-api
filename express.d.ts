import { AwilixContainer } from 'awilix';

declare global {
  namespace Express {
    export interface Request {
      payload: {
        container: AwilixContainer;
        user?: {
          email: string;
          id: string;
        };
      };
    }
  }
}

export {};
