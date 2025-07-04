import { Bitter } from "../core";
import { IBitterContext, ICheckWhenConfigStep, IImportYamlFlow, IKeyValue, IParseYamlStep, IScanForBitsFlow } from "../types";

export class ImportYamlFlow implements IImportYamlFlow {
  constructor(
    public parseYamlStep: IParseYamlStep,
    public checkWhenConfigStep: ICheckWhenConfigStep,
    public scanForBitsFlow: IScanForBitsFlow,
  ) {}

  async execute(context: IBitterContext, file: string, config?: IKeyValue): Promise<void> {
    const parsed = this.parseYamlStep.execute(file)
    if (parsed.scan === true) await this.scanForBitsFlow.execute()

    const keys = Object.keys(parsed.bits)

    keys.forEach((name) => {
      const bit = parsed.bits[name]
      if (!bit) throw new Error('Error interno aqui')
        const impl = bit.implementations.find(i => this.checkWhenConfigStep.execute(i.when, config))
        if (!impl) throw new Error(`${name} do no has implementations`)
        const implFactory = context.factoryStore[impl.name]
        if (!implFactory) throw new Error(`${impl.name} bit not found`)
        context.factoryStore[name] = implFactory
    })
  }
}
