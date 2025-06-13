import { IBitFactoryStore } from "../../core";
import { User } from "./User";

export const config: IBitFactoryStore = {
  user: {
    scope: 'prototype',
    args: [{
      name: 'id',
      value: 1,
    }, {
      name: 'username',
      value: 'username',
    }, {
      name: 'age',
      value: 20,
    }, {
      name: 'password',
      value: '123456',
    }],
    class: User,
  },
}