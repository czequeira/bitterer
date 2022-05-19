import { createLogger, LoggerOptions, Logger as WinstonLogger } from 'winston';

export class Logger {
  private logger: WinstonLogger;

  constructor(options: LoggerOptions) {
    this.logger = createLogger(options);
  }

  getChild(): WinstonLogger {
    return this.logger.child({});
  }
}
