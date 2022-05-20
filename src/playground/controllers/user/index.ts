import { IsISO8601, IsUUID, Max } from 'class-validator';
import { Controller, Route } from '../../../core';
import { FnParamsInterface } from '../../../core/interfaces';

class queryDto {
  @IsISO8601()
  date: string;

  @IsISO8601()
  date2: string;

  @IsUUID()
  uuid: string;
}

const GetUsersRoute = new Route({
  method: 'get',
  url: '/users',
  queryDto,
  fn: ({ query }: FnParamsInterface<queryDto, null>) => query.date,
});

const PostUsersRoute = new Route({
  method: 'post',
  url: '/users',
  bodyDto: queryDto,
  middlewares: [(_, res, next) => {
    res.locals.a = { a: 123 }
    next()
  }],
  fn: ({ locals, logger }: FnParamsInterface<null, queryDto>) => {
    logger.info('FUNCIONAAAAAAAAAAAAA')
    return locals.a
  },
});

export const UserController = new Controller({
  url: '/users',
  routes: [GetUsersRoute, PostUsersRoute],
});
