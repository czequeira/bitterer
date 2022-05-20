import { Logger } from 'winston';

export interface FnParamsInterface<Query, Body> {
  query: Query;
  body: Body;
  logger: Logger;
  locals: Record<string, any>;
}
