import express from 'express';
import cookieParser from 'cookie-parser';
import { userRouter } from '@user/infra/user-router';

export const initializeServer = () => {
  const app = express();

  app.use(cookieParser());

  app.use(express.json());

  app.use('/api/users', userRouter);

  app.listen(process.env.PORT, () => {
    console.log(
      `::::: 🔥🔥 server is listening on port ${process.env.PORT} 🔥🔥 :::::`
    );
  });
};
