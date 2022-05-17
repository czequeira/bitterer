import { controllers } from './controllers';
import { App } from '../core';

const appCore = new App({
  controllers,
});

appCore.generateDoc()

export const app = appCore.getApp();
