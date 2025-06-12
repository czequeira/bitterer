import { IBitCache } from "./IBitCache";
import { IBitFactoryStore } from "./IBitFactoryStore";

export interface IBitterIocContext {
  bitCache: IBitCache
  factoryStore: IBitFactoryStore
}