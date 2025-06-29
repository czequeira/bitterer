import { IBitCache } from "./IBitCache";
import { IBitFactoryStore } from "./IBitFactoryStore";

export interface IBitterContext {
  bitCache: IBitCache
  factoryStore: IBitFactoryStore
}
