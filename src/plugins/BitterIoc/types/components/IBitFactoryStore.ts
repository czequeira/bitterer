import { IBitFactory } from "./IBitFactory";

export interface IBitFactoryStore {
  [name: string]: IBitFactory<unknown>
}