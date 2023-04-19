import { FileStoraged } from '@shared/domain/file-storaged.value-object';

export abstract class MediaStorage {
  abstract uploadFile(filepath: string): Promise<FileStoraged>;

  abstract deleteFile(publicId: FileStoraged['publicId']): Promise<void>;
}
