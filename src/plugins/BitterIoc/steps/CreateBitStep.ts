import { IBitFactory, ICreateBitStep } from "../types";

export class CreateBitStep implements ICreateBitStep {
  execute<T>(factory: IBitFactory<T>): T {
    // TODO: do something whith the args
    const bit = factory.factory() as T
    return bit
  }
}