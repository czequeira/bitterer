import { Controller, Route } from "../../../core";

const GetUsersRoute = new Route({
  method: 'get',
  url: '/users',
  fn: () => 'hola mundo'
})

export const UserController = new Controller({
  url: '/users',
  routes: [GetUsersRoute]
})