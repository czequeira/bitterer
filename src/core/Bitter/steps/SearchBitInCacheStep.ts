import { IBitterContext, ISearchBitInCacheStep } from "../types";

export class SearchBitInCacheStep implements ISearchBitInCacheStep {
  execute<T>(context: IBitterContext, name: string): T {
    return context.bitCache[name] as T
  }
}