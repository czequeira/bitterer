import { RequestHandler } from "express";
import { Logger } from "../classes";

export function addLogger(logger: Logger): RequestHandler {
  return (_, res, next) => {
    res.locals.logger = logger.getChild()
    next()
  }
}