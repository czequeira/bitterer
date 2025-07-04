import { IBitterContext, IKeyValue } from "../components"
import { IParseYamlStep, ICheckWhenConfigStep } from "../steps"
import { IScanForBitsFlow } from "./IScanForBitsFlow"

export interface IImportYamlFlow {
  execute(context: IBitterContext, file: string, config?: IKeyValue): Promise<void>

  scanForBitsFlow: IScanForBitsFlow
  parseYamlStep: IParseYamlStep
  checkWhenConfigStep: ICheckWhenConfigStep
}
