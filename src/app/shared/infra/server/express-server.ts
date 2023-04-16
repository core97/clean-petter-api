import express from 'express';
import cookieParser from 'cookie-parser';
import { userRouter } from '@user/infra/user-router';
import { petAdRouter } from '@pet-ad/infra/pet-ad-router';
import { containerScopeMiddleware } from '@shared/infra/middleware/container-scope-middleware';
import { sentryScopeMiddleware } from '@shared/infra/middleware/sentry-scope-middleware';
import { globalErrorMiddleware } from '@shared/infra/middleware/global-error-middleware';

export const initializeServer = () => {
  const app = express();

  app.use(cookieParser());

  app.use(express.json());

  app.use(containerScopeMiddleware);

  app.use(sentryScopeMiddleware);

  app.use('/api/users', userRouter);

  app.use('/api/pet-ads', petAdRouter);

  app.use(globalErrorMiddleware);

  app.listen(process.env.PORT, () => {
    console.log(
      `::::: 🔥🔥 server is listening on port ${process.env.PORT} 🔥🔥 :::::`
    );
  });
};
