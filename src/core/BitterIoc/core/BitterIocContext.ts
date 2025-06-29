import {
  IBitCache,
  IBitFactoryStore,
  IBitterIocContext,
} from "../types";

export class BitterIocContext implements IBitterIocContext {
  bitCache: IBitCache = {}
  factoryStore: IBitFactoryStore = {}
}
