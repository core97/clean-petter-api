import { init, captureException } from '@sentry/node';
import { Tracker } from '@shared/application/tracker';

export class SentryTracker extends Tracker {
  constructor() {
    super();
    init({
      dsn: process.env.SENTRY_DNS,
      tracesSampleRate: 1.0,
      serverName: process.env.SENTRY_SERVER_NAME,
      environment: process.env.NODE_ENV,
      enabled: process.env.NODE_ENV === 'production',
    });
  }

  trackError(error: Error): void {
    captureException(error);
  }
}
