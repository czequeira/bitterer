import express, { Application } from "express";
import swaggerUiExpress from "swagger-ui-express";
import { OpenAPIV3 } from "openapi-types";
import { AppOptionsInterface } from "../interfaces";

export class App {
  private app: Application;

  constructor(private options: AppOptionsInterface) {
    const app = this.run(options);
    this.createDoc(app, options);
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
      console.error("initialize error", error);
      throw error;
    }
  }

  createDoc(app: Application, options: AppOptionsInterface): void {
    const swaggerUi = swaggerUiExpress;
    const openapi: OpenAPIV3.Document = {
      openapi: "3.0.0",
      components: {},
      paths: {},
      info: {
        title: "test",
        version: "0.0.0",
      },
    };

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapi));
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
