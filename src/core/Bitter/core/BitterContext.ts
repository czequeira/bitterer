import {
  IBitCache,
  IBitFactoryStore,
  IBitterContext,
} from "../types";

export class BitterContext implements IBitterContext {
  bitCache: IBitCache = {}
  factoryStore: IBitFactoryStore = {}
}
