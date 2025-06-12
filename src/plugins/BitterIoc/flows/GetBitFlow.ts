import { IBitterIocContext, ICreateBitStep, IGetBitFactoryStep, IGetBitFlow, ISearchBitInCacheStep, IStoreBitInCacheStep } from "../types";

export class GetBitFlow implements IGetBitFlow {
  constructor(
    public createBitStep: ICreateBitStep,
    public searchBitInCacheStep: ISearchBitInCacheStep,
    public storeBitInCacheStep: IStoreBitInCacheStep,
    public getBitFactoryStep: IGetBitFactoryStep,
  ) { }

  execute<T>(context: IBitterIocContext, name: string): T {
    let bit = this.searchBitInCacheStep.execute<T>(context, name)
    if (bit) return bit
    const factory = this.getBitFactoryStep.execute<T>(context, name)
    bit = this.createBitStep.execute(factory)
    if (factory.scope === 'singleton') this.storeBitInCacheStep.execute(context, name, bit)
    return bit
  }
}