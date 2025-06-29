import { Bitter } from "../core";

export function Scan(
  rootDir?: string
): ClassDecorator {
  return () => {
    const basePath = rootDir || require.main?.path
    const ioc = new Bitter()
    ioc.scan(basePath)
  };
}