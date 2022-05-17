import { OpenAPIV3 } from 'openapi-types';
import { ResponseOptionsInterface } from '../interfaces';

export class BitterResponse {
  private responseObject: OpenAPIV3.ResponseObject;
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

  getResponseObject(): OpenAPIV3.ResponseObject {
    return this.responseObject;
  }
}
