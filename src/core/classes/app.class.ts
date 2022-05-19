import 'reflect-metadata';
import { OpenAPIObject, PathsObject } from 'openapi3-ts';
import express, { Application } from 'express';
import swaggerUiExpress from 'swagger-ui-express';
import { AppOptionsInterface } from '../interfaces';

export class App {
  private app: Application;

  constructor(private options: AppOptionsInterface) {
    const app = this.run(options);
    this.app = app;
  }

  run(options: AppOptionsInterface): Application {
    try {
      const app = this.initialize(options);
      const port = options.port || 3000;

      app.listen(port, () => {
        // TODO: cambiar el console
        console.log(`TypeScript with Express http://localhost:${port}/`);
      });
      return app;
    } catch (error) {
      // TODO: cambiar el console
      console.error('initialize error', error);
      throw error;
    }
  }

  generateDoc(url: string = '/api-docs'): void {
    const swaggerUi = swaggerUiExpress;

    const { controllers } = this.options;
    const paths: PathsObject = controllers.reduce((prev, current) => {
      return { ...prev, ...current.getPathsObject() };
    }, {} as PathsObject);

    const openapi: OpenAPIObject = {
      openapi: '3.0.0',
      info: {
        title: this.options.title || 'no title',
        version: this.options.version || '0.0.1',
      },
      paths,
    };

    this.app.use(url, swaggerUi.serve, swaggerUi.setup(openapi));
  }

  initialize(options: AppOptionsInterface): Application {
    const app = express();
    const { controllers } = options;
    controllers.forEach((controller) => {
      app.use(controller.getUrl(), controller.getRouter());
    });
    return app;
  }

  getApp() {
    return this.app;
  }
}
