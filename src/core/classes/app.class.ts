import 'reflect-metadata';
import { OpenAPIObject, PathsObject } from 'openapi3-ts';
import express, { Application, ErrorRequestHandler } from 'express';
import swaggerUiExpress from 'swagger-ui-express';
import { AppOptionsInterface } from '../interfaces';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import { Logger } from './logger.class';
import { BadRequestException } from '../exceptions';
import { addLogger, httpLogger } from '../middlewares';
import { Logger as LoggerWinston } from 'winston'

export class App {
  private app: Application;
  private logger: Logger;

  constructor(private options: AppOptionsInterface) {
    this.logger = new Logger(options.logger || {});
    const app = this.run(options);
    this.app = app;
  }

  run(options: AppOptionsInterface): Application {
    const child = this.logger.getChild();
    try {
      const app = this.initialize(options);
      const port = options.port || 3000;

      app.listen(port, () => {
        child.info(`http://localhost:${port}`);
      });
      return app;
    } catch (error) {
      child.error('initialize error', error);
      throw error;
    }
  }

  private getErrorHandler(): ErrorRequestHandler {
    return (err, _, res, __) => {
      const logger: LoggerWinston = res.locals.logger
      logger.error(err)
      if (err instanceof BadRequestException)
        res.status(400).json({ message: err.message });
      else res.status(500).json({ message: 'error' });
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
    app.use(bodyParser.json());
    app.use(helmet());
    app.use(addLogger(this.logger))
    app.use(httpLogger)
    const { controllers } = options;
    controllers.forEach((controller) => {
      app.use(controller.getUrl(), controller.getRouter());
    });
    app.use(this.getErrorHandler())
    return app;
  }

  getApp() {
    return this.app;
  }
}
