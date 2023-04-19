import { Request, Response } from 'express';
import { MediaStorage } from '@shared/application/media-storage';
import { ExpressHttpHandler } from '@shared/infra/http/express-http-handler';

export default class MediaStorageController extends ExpressHttpHandler {
  constructor(private deps: { mediaStorage: MediaStorage }) {
    super();
  }

  async mediaFilePost(req: Request, res: Response) {
    if (!req.payload.user) {
      return this.unauthorized(res);
    }

    if (!req.files || !req.files.length) {
      return this.invalidParams(res, 'Files are required');
    }

    if (req.files.length > 8) {
      return this.contentTooLarge(res);
    }

    const files = await Promise.all(
      req.files.map(async file => {
        const upload = await this.deps.mediaStorage.uploadFile(file.filepath);
        return upload;
      })
    );

    return this.ok(res, files);
  }

  async mediaFileDelete(req: Request, res: Response) {
    if (!req.params.publicId) {
      return this.invalidParams(res);
    }

    await this.deps.mediaStorage.deleteFile(req.params.publicId);

    return this.ok(res);
  }
}
