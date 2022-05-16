import { Router } from "express";
import { AppException } from "../exceptions";
import { ControllerOptionsInterface } from "../interfaces";

export class Controller {
  private router: Router

  constructor(private options: ControllerOptionsInterface) {
    this.router = this.createRouter(options)
  }

  getUrl(): string {
    return this.options.url
  }

  private createRouter(options: ControllerOptionsInterface): Router {
    const router = Router()
    const { routes } = options

    routes.forEach((route) => {
      const method = route.getMethod()
      const url = route.getUrl()
      if (method === 'get') {
        router.get(url, route.getRequestHandler())
      } else {
        throw new AppException('Method not allowed')
      }
    })
    return router
  } 

  getRouter(): Router {
    return this.router
  }
}