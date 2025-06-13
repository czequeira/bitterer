import { IBitterIocContext, IStoreBitInCacheStep } from "../types";

export class StoreBitInCacheStep implements IStoreBitInCacheStep {
  execute(context: IBitterIocContext, name: string, bit: unknown): void {
    context.bitCache[name] = bit
  }
}