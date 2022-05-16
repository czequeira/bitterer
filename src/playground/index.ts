import { controllers } from "./controllers";
import { App } from "../core";

const appCore = new App({
  controllers
})

export const app = appCore.getApp()