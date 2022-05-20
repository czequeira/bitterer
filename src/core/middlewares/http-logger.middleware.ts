import { RequestHandler } from "express";
import { Logger } from "winston";

export const httpLogger: RequestHandler = (req, res, next) => {
  const logger: Logger = res.locals.logger
  const method = req.method
  const url = req.url
  const start = new Date()
  logger.info(`${method}: ${url}`)
  res.on('close', () => {
    const end = new Date()
    const time = end.getTime() - start.getTime()
    logger.info(`time: ${time} ms - status: ${res.statusCode}`)
  })
  next()
}