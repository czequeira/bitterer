import { FnParamsInterface } from '../interfaces';

export type Fn<T> = (params: FnParamsInterface) => T | Promise<T>;
