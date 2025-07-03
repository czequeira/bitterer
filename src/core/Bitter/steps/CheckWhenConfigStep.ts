import { IBitWhenConfig, ICheckWhenConfigStep, IKeyValue } from "../types";

export class CheckWhenConfigStep implements ICheckWhenConfigStep {
  execute(when?: IBitWhenConfig, config: IKeyValue = {}): boolean {
    if (!when) return true;
    if (when.anyOf) {
      const anyOf = when.anyOf
      return !!Object.keys(anyOf).find((key: string) => config[key] === anyOf[key]
      )
    }
    if (when.allOf) {
      const allOf = when.allOf
      const hasDistinct = !!Object.keys(allOf).find((key: string) => config[key] !== allOf[key]
      )
      return !hasDistinct
    }
    return false
  }
}
