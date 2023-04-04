import { Logger } from '@shared/application/logger';
import { InternalServerError } from '@shared/application/errors/internal-server.error';

export class Fetcher {
  private logger: Logger;

  constructor(dependencies: { logger: Logger }) {
    this.logger = dependencies.logger;
  }

  async fetch<T>(url: string, init?: RequestInit): Promise<Exclude<T, void>> {
    const requestInit: RequestInit = {
      ...(!!Object.keys(init || {}).length && init),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(!!Object.keys(init?.headers || {}).length && init?.headers),
      },
    };
    const method = init?.method || 'GET';

    this.logger.info(`Fetching ${method} ${url}`);

    const res = await fetch(url, requestInit);

    const contentType =
      res.headers.get('content-type') || res.headers.get('Content-Type');
    const isJson = contentType?.includes('application/json');

    if (!res.ok) {
      const { status } = res;
      const info = isJson ? await res.json() : undefined;

      throw new InternalServerError(
        `an error (${status}) occurred while fetching ${method} ${url}${
          info ? `:\n${info}` : ''
        }`
      );
    }

    if (!isJson) return undefined as unknown as Exclude<T, void>;

    return res.json() as Promise<Exclude<T, void>>;
  }
}
