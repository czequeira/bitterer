import { RequestHandler, Request as Req } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { targetConstructorToSchema } from 'class-validator-jsonschema';
import { RouteOptionsInterface } from '../interfaces';
import { Method } from '../types';
import { BitterResponse } from './response.class';
import { BadRequestException } from '../exceptions';
import { ParameterObject, RequestBodyObject, ResponsesObject } from 'openapi3-ts';

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
        const response = await this.options.fn(queryDto);
        res.status(parseInt(this.options.status || '200')).json(response);
      } catch (error) {
        if (error instanceof BadRequestException)
          res.status(400).json({ message: error.message });
        else res.status(500).json({ message: 'error' });
      }
    };
    return requestHandler;
  }

  getResponsesObject(): ResponsesObject {
    const responsesObject: ResponsesObject = this.responses.reduce(
      (prev, current) => {
        prev[current.getStatusCode()] = current.getResponseObject();
        return prev;
      },
      {} as ResponsesObject
    );
    return responsesObject;
  }

  getParametersObject(): ParameterObject[] {
    const { queryDto } = this.options;
    if (!queryDto) return [];
    const jsonSchema = targetConstructorToSchema(queryDto);
    if (!jsonSchema.properties) return [];
    return Object.keys(jsonSchema.properties).map((i) => ({
      name: i,
      in: 'query',
    }));
  }

  getRequestBodyObject(): RequestBodyObject {
    const { bodyDto } = this.options;
    if (!bodyDto) return { content: {} };
    const jsonSchema = targetConstructorToSchema(bodyDto);
    return {
      content: { dto: { schema: jsonSchema }}
    }
  }
}
