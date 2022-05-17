import { RequestHandler } from 'express';
import { OpenAPIV3 } from 'openapi-types';
import { RouteOptionsInterface } from '../interfaces';
import { Method } from '../types';
import { BitterResponse } from './response.class';

export class Route {
  private responses: BitterResponse[] = [];

  constructor(private options: RouteOptionsInterface) {
    const okResponse = new BitterResponse({ statusCode: options.status });
    const internalServerErrorResponse = new BitterResponse({
      statusCode: '500',
      description: 'Internal Server Error',
    });
    this.responses = [okResponse, internalServerErrorResponse];
  }

  getResponses(): BitterResponse[] {
    return this.responses;
  }

  setResponse(response: BitterResponse): void {
    this.responses.push(response);
  }

  getMethod(): Method {
    return this.options.method;
  }

  getUrl(): string {
    return this.options.url;
  }

  getRequestHandler(): RequestHandler {
    const requestHandler: RequestHandler = async (req, res) => {
      try {
        const response = await this.options.fn();
        res.status(parseInt(this.options.status || '200')).json(response);
      } catch (error) {
        console.error('manejar esto');
      }
    };
    return requestHandler;
  }

  getResponsesObject(): OpenAPIV3.ResponsesObject {
    const responsesObject: OpenAPIV3.ResponsesObject = this.responses.reduce(
      (prev, current) => {
        prev[current.getStatusCode()] = current.getResponseObject();
        return prev;
      },
      {} as OpenAPIV3.ResponsesObject
    );
    return responsesObject;
  }
}
