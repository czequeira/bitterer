import { IBitCache, IDestroyBitStep } from "../types";
import 'reflect-metadata';

export class DestroyBitStep implements IDestroyBitStep {
  execute(cache: IBitCache): void {
    Object.values(cache).forEach(this.invokePreDestroyMethods)
  }

  private invokePreDestroyMethods(instance: any): void {
    const methods: PropertyDescriptor[] = Reflect.getMetadata(
      'bit:preDestroy',
      instance.constructor.prototype
    );
    if (!methods) return;
    methods.forEach(i => i.value())
  }
}
