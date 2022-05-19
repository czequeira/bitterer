import { ClassConstructor } from 'class-transformer';
import { Fn, Method } from '../../types';

export interface RouteOptionsInterface {
  method: Method;
  url: string;
  fn: Fn<any>;
  status?: string;
  queryDto?: ClassConstructor<any>;
  bodyDto?: ClassConstructor<any>;
}
