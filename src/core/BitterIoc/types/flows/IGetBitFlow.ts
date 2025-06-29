import { IBitterContext } from "../components"
import { ICreateBitStep, IGetBitFactoryStep, ISearchBitInCacheStep, IStoreBitInCacheStep } from "../steps"

export interface IGetBitFlow {
  execute<T>(context: IBitterContext, name: string, namesInProcess?: string[]): T

  searchBitInCacheStep: ISearchBitInCacheStep
  getBitFactoryStep: IGetBitFactoryStep
  storeBitInCacheStep: IStoreBitInCacheStep
  createBitStep: ICreateBitStep
}