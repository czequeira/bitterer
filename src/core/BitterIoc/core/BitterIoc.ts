import { GetBitFlow } from "../flows";
import { CreateBitStep, GetBitFactoryStep, SearchBitInCacheStep, StoreBitInCacheStep } from "../steps";
import { IBitFactoryStore, IBitterIoc, IBitterIocContext } from "../types";
import { BitterIocContext } from "./BitterIocContext";

export class BitterIoc implements IBitterIoc {
  private context: IBitterIocContext
  private getBitFlow: GetBitFlow

  constructor() {
    this.context = new BitterIocContext()
    this.getBitFlow = new GetBitFlow(
      new CreateBitStep(),
      new SearchBitInCacheStep(),
      new StoreBitInCacheStep(),
      new GetBitFactoryStep(),
    )
  }

  init(bitFactoryStore: IBitFactoryStore): void {
    this.context.factoryStore = bitFactoryStore
  }

  getBit<T>(name: string): T {
    return this.getBitFlow.execute<T>(this.context, name)
  }
}