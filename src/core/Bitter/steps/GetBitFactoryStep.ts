import { IBitFactory, IBitterContext, IGetBitFactoryStep } from "../types";

export class GetBitFactoryStep implements IGetBitFactoryStep {
  execute<T>(context: IBitterContext, name: string): IBitFactory<T> {
    const factory = context.factoryStore[name] as IBitFactory<T>
    if (!factory) throw new Error('BitFactory not found')
    return factory
  }
}