import { IBitterContext, IStoreBitInCacheStep } from "../types";

export class StoreBitInCacheStep implements IStoreBitInCacheStep {
  execute(context: IBitterContext, name: string, bit: unknown): void {
    context.bitCache[name] = bit
  }
}