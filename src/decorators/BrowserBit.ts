import 'reflect-metadata'
import { toLowerCase } from '../helpers';
import { BrowserBitter } from '../browser';

export function Bit(
  name?: string,
  options?: { scope?: 'singleton' | 'prototype' }
): ClassDecorator {
  return (target: any) => {
    const bitName = name || toLowerCase(target.name)

    const injections: {parameterIndex: number, name: string}[] = Reflect.getOwnMetadata("bit:inject", target) || [];

    const ioc = new BrowserBitter()

    ioc.register({
      [bitName]: {
        class: target,
        scope: options?.scope || 'singleton',
        args: injections.map(i => ({
          name: i.name,
          ref: i.name,
        }))
      }
    });
  };
}