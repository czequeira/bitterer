import { IBitWhenConfig, IKeyValue } from "../components";

export interface ICheckWhenConfigStep {
  execute(when?: IBitWhenConfig, config?: IKeyValue): boolean
}
