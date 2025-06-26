import { Constructor } from "../components";

export interface IRegisterExportedClassStep {
  execute(module: Constructor<unknown>): void
}