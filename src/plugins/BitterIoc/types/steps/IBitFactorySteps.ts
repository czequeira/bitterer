import { IBitFactory, IBitterIocContext } from "../components"

export interface IStoreBitFactoryStep {
  execute(context: IBitterIocContext, name: string, factory: IBitFactory<unknown>): void
}

export interface IGetBitFactoryStep {
  execute<T>(context: IBitterIocContext, name: string): IBitFactory<T>
}

export interface ICreateBitStep {
  execute<T>(factory: IBitFactory<T>): T
}