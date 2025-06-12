import { IBitFactory, ICreateBitStep } from "../types";

export class CreateBitStep implements ICreateBitStep {
  execute<T>(factory: IBitFactory<T>, args: unknown[]): T {
    const bit = new factory.class(...args)
    return bit
  }
}