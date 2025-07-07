import { GetBitFlow, ImportYamlFlow, ScanForBitsFlow } from "../flows";
import {
  CheckWhenConfigStep,
  CreateBitStep,
  DestroyBitStep,
  GetBitFactoryStep,
  ParseYamlStep,
  RegisterExportedClassBitStep,
  ScanFilesStep,
  SearchBitInCacheStep,
  StoreBitInCacheStep,
  VerifyMetadataBitStep,
} from "../steps";
import { IBitFactoryStore, IBitter, IKeyValue } from "../types";
import { BitterContext } from "./BitterContext";

export class Bitter implements IBitter {
  private destroyBitStep = new DestroyBitStep()
  private context = new BitterContext()
  private getBitFlow = new GetBitFlow(
    new CreateBitStep(),
    new SearchBitInCacheStep(),
    new StoreBitInCacheStep(),
    new GetBitFactoryStep(),
  )
  private scanForBitsFlow = new ScanForBitsFlow(
    new RegisterExportedClassBitStep(),
    new ScanFilesStep(),
    new VerifyMetadataBitStep(),
  )
  private importYamlFlow = new ImportYamlFlow(
    new ParseYamlStep(),
    new CheckWhenConfigStep(),
    this.scanForBitsFlow,
  )

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
    return this.scanForBitsFlow.execute(rootDir)
  }

  async importYaml(file: string, config: IKeyValue = {}): Promise<void> {
    return this.importYamlFlow.execute(this.context, file, config)
  }

  shutdown() {
    this.destroyBitStep.execute(this.context.bitCache)
    delete globalThis.__BITTER__
  }
}
