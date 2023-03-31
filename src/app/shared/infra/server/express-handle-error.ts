import { Request, Response } from 'express';

export const expressHandleError = (
  error: unknown,
  req: Request,
  res: Response
) => {
  console.error(`::: URL ::: ${req.method} ${req.url}`);
  console.error(error);

  if (error instanceof Error) {
    res.status(400).json({ message: error.message });
  } else {
    res.status(500).json({ message: 'An unexpected error has occurred' });
  }
};
