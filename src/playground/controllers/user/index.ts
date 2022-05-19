import { IsISO8601, IsUUID, Max } from 'class-validator';
import { Controller, Route } from '../../../core';

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
  fn: ({ query }) => query.date,
});

const PostUsersRoute = new Route({
  method: 'post',
  url: '/users',
  bodyDto: queryDto,
  fn: ({ body }) => body.uuid,
});

export const UserController = new Controller({
  url: '/users',
  routes: [GetUsersRoute, PostUsersRoute],
});
