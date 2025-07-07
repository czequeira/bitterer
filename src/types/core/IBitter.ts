import { IBitFactoryStore, IKeyValue } from "../components"

export interface IBitter {
  init(bitFactoryStore: IBitFactoryStore): void
  getBit<T>(name: string): T
  register(partialStore: IBitFactoryStore): void
  scan(rootDir?: string): Promise<void>
  importYaml(file: string, config?: IKeyValue): Promise<void>
  shutdown(): void
}
