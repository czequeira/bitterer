import { IsString } from 'class-validator';
import { Controller, Dto, Route } from '../../../core';

class queryDto {
  @IsString()
  title: string;
}

const GetUsersRoute = new Route({
  method: 'get',
  url: '/users',
  queryDto,
  fn: () => 'hola mundo',
});

const PostUsersRoute = new Route({
  method: 'post',
  url: '/users',
  fn: () => 'posted',
});

export const UserController = new Controller({
  url: '/users',
  routes: [GetUsersRoute, PostUsersRoute],
});
