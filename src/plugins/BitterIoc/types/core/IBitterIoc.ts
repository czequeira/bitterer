import { IBitFactoryStore } from "../components"

export interface IBitterIoc {
  init(bitFactoryStore: IBitFactoryStore): void
  getBit<T>(name: string): T
}