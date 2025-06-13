import { IBitFactoryStore } from "../../plugins";
import { Chinese } from "./Chinese";
import { ConcreteToolA } from "./ConcreteToolA";
import { ConcreteToolB } from "./ConcreteToolB";

export const config: IBitFactoryStore = {
  toolA: {
    scope: 'singleton',
    args: [],
    class: ConcreteToolA,
  },
  toolB: {
    scope: 'singleton',
    args: [],
    class: ConcreteToolB,
  },
  chinese: {
    scope: 'prototype',
    args: [{
      name: 'tool',
      ref: 'toolA',
    }],
    class: Chinese,
  },
}