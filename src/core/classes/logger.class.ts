import { createLogger, LoggerOptions, Logger as WinstonLogger } from 'winston';
import { v4 as uuid } from 'uuid'

export class Logger {
  private logger: WinstonLogger;

  constructor(options: LoggerOptions) {
    this.logger = createLogger(options);
  }

  getChild(): WinstonLogger {
    return this.logger.child({ id: uuid() });
  }
}
