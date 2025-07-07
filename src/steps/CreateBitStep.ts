import { IBitFactory, ICreateBitStep } from "../types";
import 'reflect-metadata';

export class CreateBitStep implements ICreateBitStep {
  execute<T>(factory: IBitFactory<T>, args: unknown[]): T {
    const bit = new factory.class(...args);

    this.invokePostConstruct(bit);

    return bit;
  }

  private invokePostConstruct(instance: any): void {
    const postConstructMethods: PropertyDescriptor[] = Reflect.getMetadata(
      'bit:postConstruct',
      instance.constructor.prototype
    );

    if (!postConstructMethods) return;
    postConstructMethods.forEach(i => i.value())
  }
}
