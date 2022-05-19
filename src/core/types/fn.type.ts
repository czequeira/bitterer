import { FnParamsInterface } from '../interfaces';

export type Fn<Out, Query, Body> = (params: FnParamsInterface<Query, Body>) => Out | Promise<Out>;
