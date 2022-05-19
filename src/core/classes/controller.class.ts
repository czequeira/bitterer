import { Router } from 'express';
import {
  OperationObject,
  ParameterObject,
  PathItemObject,
  PathsObject,
  RequestBodyObject,
} from 'openapi3-ts';
import { ControllerOptionsInterface } from '../interfaces';
import { Logger } from './logger.class';

export class Controller {
  private router: Router;

  constructor(private options: ControllerOptionsInterface) {
  }

  getUrl(): string {
    return this.options.url;
  }

  getRouter(logger: Logger): Router {
    const router = Router();
    const { routes } = this.options;

    routes.forEach((route) => {
      const method = route.getMethod();
      const url = route.getUrl();
      router[method](url, route.getRequestHandler(logger));
    });
    return router;
  }

  getPathsObject(): PathsObject {
    const { routes, url } = this.options;
    const paths: PathsObject = {};

    routes.forEach((route) => {
      const pattern = `${url}${route.getUrl()}`;
      const pathItemObject: PathItemObject = paths[pattern] || {};
      const method = route.getMethod();
      const parameters: ParameterObject[] = route.getParametersObject();
      const requestBody: RequestBodyObject | undefined = [
        'post',
        'put',
      ].includes(method)
        ? route.getRequestBodyObject()
        : undefined;
      // TODO: poner el body y los parametros solo si es necesario
      const operationObject: OperationObject = {
        responses: route.getResponsesObject(),
        parameters,
        requestBody,
      };
      pathItemObject[method] = operationObject;
      paths[pattern] = pathItemObject;
    });

    return paths;
  }
}
