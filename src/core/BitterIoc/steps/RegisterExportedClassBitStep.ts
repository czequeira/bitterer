import { BitterIoc } from "../core";
import { Constructor, IRegisterExportedClassStep } from "../types";

export class RegisterExportedClassBitStep implements IRegisterExportedClassStep {
  execute(module: Constructor<unknown>): void {
    const ioc = new BitterIoc()
    const config: { name?: string, scope: 'singleton' | 'prototype' } = Reflect.getMetadata('bit:config', module);
    ioc.register({
      [`${config.name || module.name}`]: {
        class: module,
        scope: config.scope || 'singleton',
        args: []
      }
    });
  }
}