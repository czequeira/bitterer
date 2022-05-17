import { Fn, Method } from '../../types';

export interface RouteOptionsInterface {
  method: Method;
  url: string;
  fn: Fn<any, any>;
  status?: string;
  queryDto?: any;
}
