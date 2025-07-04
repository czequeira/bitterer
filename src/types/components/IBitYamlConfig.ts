export interface IBitImplConfig {
  name: string
  when?: IBitWhenConfig
}

export interface IKeyValue {
  [key: string]: string
}

export interface IBitWhenConfig {
  anyOf?: IKeyValue
  allOf?: IKeyValue
}

export interface IBitConfig {
  implementations: IBitImplConfig[]
}

export interface IBitsConfig {
  [name: string]: IBitConfig
}

export interface IYamlConfig {
  scan?: boolean
  bits: IBitsConfig
}
