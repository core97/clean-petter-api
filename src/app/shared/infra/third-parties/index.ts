import { Fetcher } from '@shared/application/fetcher';
import { Logger } from '@shared/application/logger';
import { Typeform } from '@shared/infra/third-parties/typeform';

export class ThirdParties {
  typeform: Typeform;

  constructor(dependencies: { fetcher: Fetcher; logger: Logger }) {
    this.typeform = new Typeform({
      fetcher: dependencies.fetcher,
      logger: dependencies.logger,
    });
  }
}
