import { Controller, Route } from '../../../core';

const GetUsersRoute = new Route({
  method: 'get',
  url: '/users',
  fn: () => 'hola mundo',
});

const PostUsersRoute = new Route({
  method: 'post',
  url: '/users',
  fn: () => 'posted'
})

export const UserController = new Controller({
  url: '/users',
  routes: [GetUsersRoute, PostUsersRoute],
});
