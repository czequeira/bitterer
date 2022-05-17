import express, { Application } from 'express';
import swaggerUiExpress from 'swagger-ui-express';
import { OpenAPIV3 } from 'openapi-types';
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
    let paths: OpenAPIV3.PathsObject = {};

    controllers.forEach((controller) => {
        paths = { ...paths, ...controller.getPathsObject() }
    });

    const openapi: OpenAPIV3.Document = {
      openapi: '3.0.0',
      components: {},
      paths,
      info: {
        title: this.options.title || 'No title',
        version: this.options.version || '0.0.0',
      },
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
