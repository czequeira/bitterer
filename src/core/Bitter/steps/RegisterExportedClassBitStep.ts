import { Bitter } from "../core";
import { Constructor, IRegisterExportedClassStep } from "../types";

export class RegisterExportedClassBitStep implements IRegisterExportedClassStep {
  execute(module: Constructor<unknown>): void {
    const ioc = new Bitter()

    const injections: {parameterIndex: number, name: string}[] = Reflect.getOwnMetadata("bit:inject", module) || [];
    
    const config: { name?: string, scope: 'singleton' | 'prototype' } = Reflect.getMetadata('bit:config', module);
    ioc.register({
      [`${config.name || module.name}`]: {
        class: module,
        scope: config.scope || 'singleton',
        args: injections.map(i => ({
          name: 'a',
          ref: i.name,
        }))
      }
    });
  }
}