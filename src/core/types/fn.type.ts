export type GetFn<T, Q> = (query?: Q) => T | Promise<T>;
export type DeleteFn<T, Q> = (query?: Q) => T | Promise<T>;
export type PostFn<T, Q, B> = (query?: Q, body?: B) => T | Promise<T>;
export type PutFn<T, Q, B> = (query?: Q, body?: B) => T | Promise<T>;
export type Fn<T, Q, B> =
  | GetFn<T, Q>
  | DeleteFn<T, Q>
  | PostFn<T, Q, B>
  | PutFn<T, Q, B>;
