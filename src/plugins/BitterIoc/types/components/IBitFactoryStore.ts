import { IBitArg } from "./IBitArg";
import { IBitFactory } from "./IBitFactory";

export interface IBitFactoryStore {
  [name: string]: IBitFactory<unknown, IBitArg[]>
}