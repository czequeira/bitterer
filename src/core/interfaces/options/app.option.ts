import { LoggerOptions } from 'winston';
import { Controller } from '../../classes';

export interface AppOptionsInterface {
  controllers: Controller[];
  port?: number;
  title?: string;
  version?: string;
  logger: LoggerOptions;
}
