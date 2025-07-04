import { IParseYamlStep, IYamlConfig } from "../types";
import YAML from 'yaml'

export class ParseYamlStep implements IParseYamlStep {
  execute(file: string): IYamlConfig {
    const parsed: IYamlConfig = YAML.parse(file)
    return parsed
  }
}
