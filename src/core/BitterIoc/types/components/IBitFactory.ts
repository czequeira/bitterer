import { IBitArg } from "./IBitArg"

type Constructor<T> = new (...args: any[]) => T

export interface IBitFactory<T, args = IBitArg[]> {
  scope: 'singleton' | 'prototype'
  args: args
  class: Constructor<T>
}