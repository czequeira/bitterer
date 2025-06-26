import 'reflect-metadata'
import { BitterIoc } from "../core";

export function Bit(
  name?: string,
  options?: { scope?: 'singleton' | 'prototype' }
): ClassDecorator {
  return (target: any) => {
    const bitName = name || target.name
    Reflect.defineMetadata('bit:config', {name: bitName}, target)
    const ioc = new BitterIoc()
    ioc.register({
      [bitName]: {
        class: target,
        scope: options?.scope || 'singleton',
        args: []
      }
    })
  };
}