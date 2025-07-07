import {
  IBitterContext,
  ICreateBitStep,
  IGetBitFactoryStep,
  IGetBitFlow,
  ISearchBitInCacheStep,
  IStoreBitInCacheStep,
} from "../types";

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
  if (context.bitCache[name]) {
    return context.bitCache[name] as T;
  }

  if (namesInProcess.includes(name)) {
    throw new Error('Circular dependency detected')
  }

  const factory = this.getBitFactoryStep.execute<T>(context, name);
  if (!factory) {
    throw new Error(`Factory not found for bit: ${name}`);
  }

  const args = factory.args.map(arg => {
    return arg.ref 
      ? this.execute(context, arg.ref, [...namesInProcess, name])
      : arg.value;
  });

  const instance = this.createBitStep.execute(factory, args);

  if (factory.scope === 'singleton') {
    this.storeBitInCacheStep.execute(context, name, instance);
  }

  return instance;
}
}
