import { IBitFactory, ICreateBitStep } from "../types";

export class CreateBitStep implements ICreateBitStep {
  execute<T>(factory: IBitFactory<T>): T {
    console.log(`Creating the bit ${factory.class.name}`)
    const bit = new factory.class(factory.args)
    return bit
  }
}