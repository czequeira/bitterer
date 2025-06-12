type Constructor<T> = new (...args: unknown[]) => T

export interface IBitFactory<T, args = unknown[]> {
  scope: 'singleton' | 'prototype'
  args: args
  class: Constructor<T>
}