import { Router } from 'express';
import { OpenAPIV3 } from 'openapi-types';
import { ControllerOptionsInterface } from '../interfaces';

export class Controller {
  private router: Router;

  constructor(private options: ControllerOptionsInterface) {
    this.router = this.createRouter(options);
  }

  getUrl(): string {
    return this.options.url;
  }

  private createRouter(options: ControllerOptionsInterface): Router {
    const router = Router();
    const { routes } = options;

    routes.forEach((route) => {
      const method = route.getMethod();
      const url = route.getUrl();
      router[method](url, route.getRequestHandler());
    });
    return router;
  }

  getRouter(): Router {
    return this.router;
  }

  getPathsObject(): OpenAPIV3.PathsObject {
    const { routes, url } = this.options;
    const paths: OpenAPIV3.PathsObject = {};

    routes.forEach((route) => {
      const pattern = `${url}${route.getUrl()}`;
      const pathItemObject: OpenAPIV3.PathItemObject = paths[pattern] || {};
      const method = route.getMethod();
      const operationObject: OpenAPIV3.OperationObject = {
        responses: route.getResponsesObject(),
      };
      pathItemObject[method] = operationObject;
      paths[pattern] = pathItemObject
    });

    return paths;
  }
}
