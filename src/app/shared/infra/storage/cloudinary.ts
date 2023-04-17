import { v2 as cloudinary } from 'cloudinary';
import { Logger } from '@shared/application/logger';

/**
 * Documentation
 * @see https://cloudinary.com/documentation/cloudinary_sdks#backend
 * @see https://cloudinary.com/documentation/image_upload_api_reference
 *
 * Image optimization
 * @see https://cloudinary.com/documentation/image_optimization
 */

export class Cloudinary {
  constructor(private deps: { logger: Logger }) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
  }

  async uploadFile(filepath: string) {
    const uploadResponse = await cloudinary.uploader.upload(filepath, {
      resource_type: 'image',
    });

    this.deps.logger.info(
      `Uploaded file with ${uploadResponse.public_id} publicId: ${uploadResponse.url}`
    );

    return uploadResponse;
  }

  async deleteFile(publicId: string) {
    await cloudinary.uploader.destroy(publicId);
  }
}
