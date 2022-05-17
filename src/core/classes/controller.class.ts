import { Router } from 'express';
import { OpenAPIV3 } from 'openapi-types';
import { AppException } from '../exceptions';
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
    let paths: OpenAPIV3.PathsObject = {};

    routes.forEach((route) => {
      let pathItemObject: OpenAPIV3.PathItemObject = {};
      const method = route.getMethod();
      const routeUrl = route.getUrl();

      pathItemObject[method] = {
        responses: {}
      };

      paths[`${url}${routeUrl}`] = pathItemObject
    });

    return paths;
  }
}
