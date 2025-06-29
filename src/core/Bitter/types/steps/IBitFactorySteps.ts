import { IBitFactory, IBitterContext } from "../components"

export interface IStoreBitFactoryStep {
  execute(context: IBitterContext, name: string, factory: IBitFactory<unknown>): void
}

export interface IGetBitFactoryStep {
  execute<T>(context: IBitterContext, name: string): IBitFactory<T>
}

export interface ICreateBitStep {
  execute<T>(factory: IBitFactory<T>, args: unknown[]): T
}