import { ClassConstructor } from 'class-transformer';
import { RequestHandler } from 'express';
import { Fn, Method } from '../../types';

export interface RouteOptionsInterface<Out, Query, Body> {
  method: Method;
  url: string;
  fn: Fn<Out, Query, Body>;
  status?: string;
  queryDto?: ClassConstructor<Query>;
  bodyDto?: ClassConstructor<Body>;
  middlewares?: RequestHandler[];
}
