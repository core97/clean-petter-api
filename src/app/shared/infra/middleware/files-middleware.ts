import { Request, Response, NextFunction } from 'express';
import formidable from 'formidable';
import { Logger } from '@shared/application/logger';
import { InternalServerError } from '@shared/application/errors/internal-server.error';
import { ContentTooLargeError } from '@shared/application/errors/content-too-large.error';

const MAX_SIZE = 10 * 1024 * 1024; // 10MB,

export const filesMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const scopedContainer = req.payload.container;
  const log = scopedContainer.resolve<Logger>('logger');

  const multiPartFormData = formidable({
    multiples: true,
    maxFileSize: MAX_SIZE,
    keepExtensions: true,
  });

  multiPartFormData.parse(req, async (err, _fields, files) => {
    if (err) {
      const existMsg = typeof err?.message === 'string';

      if (existMsg && err.message.includes('maxFileSize exceeded')) {
        throw new ContentTooLargeError('Max file size exceceeded');
      }

      log.error(err);

      throw new InternalServerError(
        'An error has occurred while parsing files'
      );
    }

    const filesFormatParse = Array.from(Object.keys(files)).reduce(
      (acc: formidable.File[], key) => {
        const file = files[key];

        if (Array.isArray(file)) {
          Array.from(file).forEach(eachFile => acc.push(eachFile));
        } else {
          acc.push(file);
        }

        return acc;
      },
      []
    );

    req.files = filesFormatParse;

    next();
  });
};
