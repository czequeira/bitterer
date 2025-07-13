import 'reflect-metadata'
import { Bitter } from "../core";
import { toLowerCase } from '../helpers';

export function Bit(
  name?: string,
  options?: { scope?: 'singleton' | 'prototype' }
): ClassDecorator {
  return (target: any) => {
    const bitName = name || toLowerCase(target.name)

    const injections: {parameterIndex: number, name: string}[] = Reflect.getOwnMetadata("bit:inject", target) || [];

    const ioc = new Bitter()

    ioc.register({
      [bitName]: {
        class: target,
        scope: options?.scope || 'singleton',
        args: injections.reverse().map(i => ({
          name: i.name,
          ref: i.name,
        }))
      }
    });
  };
}
