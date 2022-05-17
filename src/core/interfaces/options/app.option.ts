import { Controller } from '../../classes';

export interface AppOptionsInterface {
  controllers: Controller[];
  port?: number;
  title?: string;
  version?: string;
}
