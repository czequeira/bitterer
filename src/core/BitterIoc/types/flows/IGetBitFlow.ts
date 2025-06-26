import { IBitterIocContext } from "../components"
import { ICreateBitStep, IGetBitFactoryStep, ISearchBitInCacheStep, IStoreBitInCacheStep } from "../steps"

export interface IGetBitFlow {
  execute<T>(context: IBitterIocContext, name: string, namesInProcess?: string[]): T

  searchBitInCacheStep: ISearchBitInCacheStep
  getBitFactoryStep: IGetBitFactoryStep
  storeBitInCacheStep: IStoreBitInCacheStep
  createBitStep: ICreateBitStep
}