import { IBitFactory, IBitterIocContext, IGetBitFactoryStep } from "../types";

export class GetBitFactoryStep implements IGetBitFactoryStep {
  execute<T>(context: IBitterIocContext, name: string): IBitFactory<T> {
    const factory = context.factoryStore[name] as IBitFactory<T>
    if (!factory) throw new Error('BitFactory not found')
    return factory
  }
}