import express from 'express';
import cookieParser from 'cookie-parser';
import { getUserRouter } from '@user/infra/user-router';

export const initializeServer = () => {
  const app = express();

  app.use(cookieParser());

  app.use(express.json());

  app.use('/api/users', getUserRouter());

  app.listen(8080, () => {
    console.log('server is listening on port 5000');
  });
};
