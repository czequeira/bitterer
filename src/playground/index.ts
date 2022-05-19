import { controllers } from './controllers';
import { App } from '../core';
import { transports, format } from 'winston';

const appCore = new App({
  controllers,
  logger: {
    format: format.simple(),
    transports: [new transports.Console()],
  },
});

appCore.generateDoc();

export const app = appCore.getApp();
