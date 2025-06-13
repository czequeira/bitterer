import { IBitterIocContext } from "../components"

export interface ISearchBitInCacheStep {
  execute<T>(context: IBitterIocContext, name: string): T
}

export interface IStoreBitInCacheStep {
  execute(context: IBitterIocContext, name: string, bit: unknown): void
}