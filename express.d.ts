declare global {
  namespace Express {
    export interface Request {
      payload?: {
        user?: {
          email: string;
          id: string;
        };
      };
    }
  }
}

export {};
