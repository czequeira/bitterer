import { IBitFactoryStore } from "../../core";
import { User } from "./User";

export const config: IBitFactoryStore = {
  tom: {
    scope: "singleton",
    class: User,
    args: [{
      name: 'friend',
      ref: 'lily',
    }, {
      name: 'name',
      value: 'Tom',
    }],
  },
  lily: {
    scope: "singleton",
    class: User,
    args: [{
      name: 'friend',
      ref: 'tom',
    }, {
      name: 'name',
      value: 'Lily',
    }],
  }
}