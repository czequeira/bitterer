import { GetBitFlow } from "../flows";
import {
  CreateBitStep,
  GetBitFactoryStep,
  RegisterExportedClassBitStep,
  ScanFilesStep,
  SearchBitInCacheStep,
  StoreBitInCacheStep,
  VerifyMetadataBitStep,
} from "../steps";
import { IBitFactoryStore, IBitter } from "../types";
import { BitterContext } from "./BitterContext";
import { ScanForBitsFlow } from "../flows/ScanForBitsFlow";

export class Bitter implements IBitter {
  private context = new BitterContext()
  private getBitFlow = new GetBitFlow(
    new CreateBitStep(),
    new SearchBitInCacheStep(),
    new StoreBitInCacheStep(),
    new GetBitFactoryStep(),
  )
  private scanForBitsFlow: ScanForBitsFlow = new ScanForBitsFlow(
    new RegisterExportedClassBitStep(),
    new ScanFilesStep(),
    new VerifyMetadataBitStep(),
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
}
