import { glob } from "glob";
import { GetBitFlow } from "../flows";
import { CreateBitStep, GetBitFactoryStep, SearchBitInCacheStep, StoreBitInCacheStep } from "../steps";
import { Constructor, IBitFactory, IBitFactoryStore, IBitterIoc, IBitterIocContext } from "../types";
import { BitterIocContext } from "./BitterIocContext";
import process from "process";

export class BitterIoc implements IBitterIoc {
  private context = new BitterIocContext()
  private getBitFlow: GetBitFlow =new GetBitFlow(
      new CreateBitStep(),
      new SearchBitInCacheStep(),
      new StoreBitInCacheStep(),
      new GetBitFactoryStep(),
    ) 

  constructor() {
    if (globalThis.__BITTER_IOC__) {
      return globalThis.__BITTER_IOC__
    }
    globalThis.__BITTER_IOC__ = this
  }

  init(bitFactoryStore: IBitFactoryStore): void {
    this.context.factoryStore = bitFactoryStore
  }

  register(partialStore: IBitFactoryStore): void {
    this.context.factoryStore = {
      ...this.context.factoryStore,
      ...partialStore,
    }
  }

  getBit<T>(name: string): T {
    if (!this.context.factoryStore[name]) {
      throw new Error(`Bit "${name}" not found?`);
    }
    return this.getBitFlow.execute<T>(this.context, name)
  }

  // Método de escaneo simplificado
  async scan(rootDir?: string): Promise<void> {
    const projectRoot = require.main?.path
    const scanPath = rootDir || projectRoot;

    const files = await glob(`${scanPath}/*.js`, {
      ignore: ['**/node_modules/**', '**/*.d.ts'],
      absolute: true,
    });
    
    for (const file of files) {
      try {
        const modulePath = file.replace('\.ts$/', '');
        const module = await import(modulePath);
        this.registerExportedClasses(module);
      } catch (err: any) {
        console.warn(`No se pudo escanear ${file}:`, err.message);
      }
    }
  }

  private registerExportedClasses(module: any): void {
    for (const exported of Object.values(module)) {
      if (this.isBitClass(exported)) {
        const exp = exported as Constructor<unknown>
        const config: {name?: string, scope: 'singleton' | 'prototype'} = Reflect.getMetadata('bit:config', exp);
        this.register({
          [`${config.name || exp.name}`]: {
            class: exp,
            scope: config.scope || 'singleton',
            args: []
          }
        });
      }
    }
  }

  private isBitClass(target: any): boolean {
    return typeof target === 'function' && 
           target.prototype && 
           Reflect.hasMetadata('bit:config', target);
  }
}