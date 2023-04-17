import express from 'express';
import cookieParser from 'cookie-parser';
import { userRouter } from '@user/infra/user-router';
import { petAdRouter } from '@pet-ad/infra/pet-ad-router';
import { visitRouter } from '@visit/infra/visit-router';
import { containerScopeMiddleware } from '@shared/infra/middleware/container-scope-middleware';
import { filesMiddleware } from '@shared/infra/middleware/files-middleware';
import { authMiddleware } from '@shared/infra/middleware/auth-middleware';
import { sentryScopeMiddleware } from '@shared/infra/middleware/sentry-scope-middleware';
import { globalErrorMiddleware } from '@shared/infra/middleware/global-error-middleware';

export const initializeServer = () => {
  const app = express();

  app.use(cookieParser());

  app.use(express.json());

  app.use(containerScopeMiddleware);

  app.use(sentryScopeMiddleware);

  app.post('/api/files', authMiddleware, filesMiddleware, (req, res) => {
    req.files?.forEach(file => {
      console.log(`${file.originalFilename} - ${file.size}`);
    });

    return res.status(200).end();
  });

  app.use('/api/pet-ads', petAdRouter);

  app.use('/api/users', userRouter);

  app.use('/api/visits', visitRouter);

  app.use(globalErrorMiddleware);

  app.listen(process.env.PORT, () => {
    console.log(
      `::::: 🔥🔥 server is listening on port ${process.env.PORT} 🔥🔥 :::::`
    );
  });
};
