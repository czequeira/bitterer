import { IBitterContext, ICreateBitStep, IGetBitFactoryStep, IGetBitFlow, ISearchBitInCacheStep, IStoreBitInCacheStep } from "../types";

export class GetBitFlow implements IGetBitFlow {
  constructor(
    public createBitStep: ICreateBitStep,
    public searchBitInCacheStep: ISearchBitInCacheStep,
    public storeBitInCacheStep: IStoreBitInCacheStep,
    public getBitFactoryStep: IGetBitFactoryStep,
  ) { }

  execute<T>(
    context: IBitterContext,
    name: string,
    namesInProcess: string[] = []
  ): T {
    // getting the bit from cache
    let bit = this.searchBitInCacheStep.execute<T>(context, name)
    if (bit) return bit

    // searching for the necesary to create the bit
    const factory = this.getBitFactoryStep.execute<T>(context, name)

    // search the args
    const args: unknown[] = factory.args.map(i => {
      if (i.ref) {
        if (namesInProcess.includes(name)) {
          return new Proxy({}, {
            get: (_, prop) => this.execute<T>(context, name, [...namesInProcess])
          });
        }
        return this.execute(context, i.ref, [...namesInProcess, name])
      }
      return i.value
    })

    // creating the bit
    bit = this.createBitStep.execute(factory, args)

    // if is singleton then storing in cache
    if (factory.scope === 'singleton') this.storeBitInCacheStep.execute(context, name, bit)
    
    // return the bit
    return bit
  }
}