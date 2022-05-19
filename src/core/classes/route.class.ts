import { RequestHandler, Request as Req } from 'express';
import { plainToInstance } from 'class-transformer';
import {
  validate,
  getFromContainer,
  getMetadataStorage,
} from 'class-validator';
import { OpenAPIV3 } from 'openapi-types';
import { RouteOptionsInterface } from '../interfaces';
import { Method } from '../types';
import { BitterResponse } from './response.class';
import { BadRequestException } from '../exceptions';

export class Route {
  private responses: BitterResponse[] = [];

  constructor(private options: RouteOptionsInterface) {
    const okResponse = new BitterResponse({ statusCode: options.status });
    const internalServerErrorResponse = new BitterResponse({
      statusCode: '500',
      description: 'Internal Server Error',
    });
    const badRequestResponse = new BitterResponse({
      statusCode: '400',
      description: 'Bad Request',
    });
    this.responses = [
      okResponse,
      internalServerErrorResponse,
      badRequestResponse,
    ];
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

  getParametersObject(): OpenAPIV3.ParameterObject[] {
    const parametersObject: OpenAPIV3.ParameterObject[] = [];
    if (this.options.queryDto) {
      const a = getFromContainer(this.options.queryDto);
      // TODO: work in progress
      console.log(a);
      const params = this.options.queryDto;
      console.log(params);
    }
    return parametersObject;
  }

  private async validate(req: Req): Promise<Array<any>> {
    const dtos = [];
    if (this.options.queryDto) {
      const queryDto = plainToInstance(this.options.queryDto, req.query);
      const queryErrors = await validate(queryDto);
      if (queryErrors.length) throw new BadRequestException(...queryErrors);
      dtos.push(queryDto);
    } else dtos.push({});
    return dtos;
  }

  getRequestHandler(): RequestHandler {
    const requestHandler: RequestHandler = async (req, res) => {
      try {
        const [queryDto] = await this.validate(req);
        const response = await this.options.fn(req.query);
        res.status(parseInt(this.options.status || '200')).json(response);
      } catch (error) {
        if (error instanceof BadRequestException)
          res.status(400).json({ message: error.message });
        else res.status(500).json({ message: 'error' });
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
