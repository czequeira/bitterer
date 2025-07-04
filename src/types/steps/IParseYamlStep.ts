import { IYamlConfig } from "../components";

export interface IParseYamlStep {
  execute(file: string): IYamlConfig
}
