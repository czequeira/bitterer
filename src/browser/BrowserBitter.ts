import { GetBitFlow } from "../flows/GetBitFlow"
import { CreateBitStep } from "../steps/CreateBitStep"
import { SearchBitInCacheStep } from '../steps/SearchBitInCacheStep'
import { DestroyBitStep } from "../steps/DestroyBitStep"
import { StoreBitInCacheStep } from '../steps/StoreBitInCacheStep'
import { GetBitFactoryStep } from '../steps/GetBitFactoryStep'
import { IBitFactoryStore, IBitter, IKeyValue } from "../types"
import { BitterContext } from "../core/BitterContext"

export class BrowserBitter implements IBitter {
  private context = new BitterContext()
  private destroyBitStep = new DestroyBitStep()
  private getBitFlow = new GetBitFlow(
    new CreateBitStep(),
    new SearchBitInCacheStep(),
    new StoreBitInCacheStep(),
    new GetBitFactoryStep(),
  )
  // private importYamlFlow = new ImportYamlFlow(
  //   new ParseYamlStep(),
  //   new CheckWhenConfigStep(),
  //   this.scanForBitsFlow,
  // )

  constructor() {
    if (globalThis.__BITTER__) {
      return globalThis.__BITTER__
    }
    globalThis.__BITTER__ = this
  }

  init(bitFactoryStore: IBitFactoryStore): void {
    this.context.factoryStore = bitFactoryStore
  }

  register(partialStore: IBitFactoryStore): void {
    this.context.factoryStore = {
      ...this.context.factoryStore,
      ...partialStore,
    }
  }

  getBit<T>(name: string): T {
    if (!this.context.factoryStore[name]) {
      throw new Error(`Bit "${name}" not found?`);
    }
    return this.getBitFlow.execute<T>(this.context, name)
  }

  async scan(rootDir?: string): Promise<void> {
    console.log('sa')
  }

  async importYaml(file: string, config: IKeyValue = {}): Promise<void> {
    console.log('ass')
  }

  shutdown() {
    this.destroyBitStep.execute(this.context.bitCache)
    delete globalThis.__BITTER__
  }
}
