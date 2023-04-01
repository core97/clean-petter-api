import pino from 'pino';
import { Logger, LogLevel, LogMessage } from '@shared/application/logger';

export class PinoLogger implements Logger {
  private readonly logger: pino.Logger;

  constructor(
    dependencies: {
      level?: LogLevel;
      isEnabled?: boolean;
      requestId?: string;
      method?: string;
      url?: string;
    } = {}
  ) {
    this.logger = pino({
      enabled: dependencies.isEnabled,
      level: dependencies.level || 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true
        }
      },
      messageKey: 'message',
      base: {
        ...(dependencies.requestId && {
          'x-request-id': dependencies.requestId,
        }),
        ...(dependencies.method && {
          'x-method': dependencies.method,
        }),
        ...(dependencies.url && {
          'x-url': dependencies.url,
        }),
      },
    });
  }

  debug(message: LogMessage | string): void {
    this.logger.debug(message);
  }

  error(message: LogMessage | string): void {
    this.logger.error(message);
  }

  fatal(message: LogMessage | string): void {
    this.logger.fatal(message);
  }

  info(message: LogMessage | string): void {
    this.logger.info(message);
  }

  warn(message: LogMessage | string): void {
    this.logger.warn(message);
  }
}
