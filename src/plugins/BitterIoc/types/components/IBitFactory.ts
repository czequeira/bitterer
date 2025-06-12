export interface IBitFactory<T, args = unknown[]> {
  scope: 'singleton' | 'prototype'
  args: args
  factory(): T
}