import { RequestHandler } from "express";
import { RouteOptionsInterface } from "../interfaces";

export class Route {
  constructor(private options: RouteOptionsInterface) {}

  getMethod(): string {
    return this.options.method;
  }

  getUrl(): string {
    return this.options.url;
  }

  getRequestHandler(): RequestHandler {
    const requestHandler: RequestHandler = async (req, res) => {
      try {
        const response = await this.options.fn();
        res.status(this.options.status || 200).json(response);
      } catch (error) {
        console.error("manejar esto");
      }
    };
    return requestHandler;
  }
}
