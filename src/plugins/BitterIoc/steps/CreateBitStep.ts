import { IBitFactory, ICreateBitStep } from "../types";

export class CreateBitStep implements ICreateBitStep {
  execute<T>(factory: IBitFactory<T>): T {
    const bit = new factory.class(factory.args)
    return bit
  }
}