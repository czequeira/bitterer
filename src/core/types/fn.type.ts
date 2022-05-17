export type GetFn<T, Q> = (query?: Q) => T | Promise<T>;
export type Fn<T, Q> = GetFn<T, Q>;
