import 'reflect-metadata'
import { BitterIoc } from "../core";
import { toLowerCase } from '../../helpers';

export function Bit(
  name?: string,
  options?: { scope?: 'singleton' | 'prototype' }
): ClassDecorator {
  return (target: any) => {
    const bitName = name || toLowerCase( target.name)

    Reflect.defineMetadata('bit:config', {name: bitName}, target)

    const ioc = new BitterIoc()

    ioc.register({
      [bitName]: {
        class: target,
        scope: options?.scope || 'singleton',
        args: [],
      }
    })
  };
}
