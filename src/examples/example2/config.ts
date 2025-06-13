import { IBitFactoryStore } from "../../core";
import { American } from "./American";
import { Chinese } from "./Chinese";

export const config: IBitFactoryStore = {
  chinese: {
    scope: 'singleton',
    args: [],
    class: Chinese,
  },
  american: {
    scope: 'singleton',
    args: [],
    class: American,
  },
}