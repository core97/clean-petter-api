export class FileStoraged {
  publicId: string;

  url: string;

  constructor(props: Pick<FileStoraged, 'publicId' | 'url'>) {
    this.publicId = props.publicId;
    this.url = props.url;
  }
}

export type FileStoragedProps = ConstructorParameters<typeof FileStoraged>[0];
