import { ResponseObject } from 'openapi3-ts';
import { ResponseOptionsInterface } from '../interfaces';

export class BitterResponse {
  private responseObject: ResponseObject;
  private statusCode: string;

  constructor(private options: ResponseOptionsInterface) {
    this.statusCode = options.statusCode || '200';
    this.responseObject = {
      description: options.description || 'ok',
    };
  }

  getStatusCode(): string {
    return this.statusCode;
  }

  getResponseObject(): ResponseObject {
    return this.responseObject;
  }
}
