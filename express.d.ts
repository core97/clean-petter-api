import { AwilixContainer } from 'awilix';
import formidable from 'formidable';

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
      files?: formidable.File[];
    }
  }
}

export {};
