export type GetFn<T> = () => T | Promise<T>;
export type Fn<T> = GetFn<T>;
