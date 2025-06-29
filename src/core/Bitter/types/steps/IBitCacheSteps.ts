import { IBitterContext } from "../components"

export interface ISearchBitInCacheStep {
  execute<T>(context: IBitterContext, name: string): T
}

export interface IStoreBitInCacheStep {
  execute(context: IBitterContext, name: string, bit: unknown): void
}