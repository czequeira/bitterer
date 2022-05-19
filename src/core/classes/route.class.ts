import { RequestHandler, Request as Req } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { targetConstructorToSchema } from 'class-validator-jsonschema';
import { RouteOptionsInterface } from '../interfaces';
import { Method } from '../types';
import { BitterResponse } from './response.class';
import { BadRequestException } from '../exceptions';
import {
  ParameterObject,
  RequestBodyObject,
  ResponsesObject,
} from 'openapi3-ts';

async function validateDto(
  Dto: ClassConstructor<any> | undefined,
  json: any
): Promise<any> {
  if (Dto) {
    const dto = plainToInstance(Dto, json);
    const errors = await validate(dto);
    if (errors.length) throw new BadRequestException(...errors);
    return dto;
  }
  return {};
}

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
    const response = await Promise.all([
      validateDto(this.options.queryDto, req.query),
      validateDto(this.options.bodyDto, req.body),
    ])
    return response
  }

  getRequestHandler(): RequestHandler {
    const requestHandler: RequestHandler = async (req, res) => {
      try {
        const [queryDto, bodyDto] = await this.validate(req);
        const response = await this.options.fn(queryDto, bodyDto);
        res.status(parseInt(this.options.status || '200')).json(response);
      } catch (error) {
        // TODO: poner un log mejor
        console.log(error)
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
      content: { 'Application/json': { schema: jsonSchema } },
    };
  }
}
