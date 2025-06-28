import { Constructor, IRegisterExportedClassStep, IScanFilesStep, IScanForBitsFlow, IVerifyMetadataStep } from "../types";

export class ScanForBitsFlow implements IScanForBitsFlow {
  constructor(
    public registerExportedClassStep: IRegisterExportedClassStep,
    public scanFilesStep: IScanFilesStep,
    public verifyMetadataStep: IVerifyMetadataStep,
  ) { }

  async execute(rootDir?: string): Promise<void> {
    const projectRoot = require.main?.path
    const scanPath = rootDir || projectRoot || '';

    const files = await this.scanFilesStep.execute(scanPath);

    for (const file of files) {
      try {
        const modules: {[name: string]: Constructor<unknown>} = await import(file);
        for (const module of Object.values(modules))
          if (this.verifyMetadataStep.execute(module))
            this.registerExportedClassStep.execute(module);
      } catch (err: any) {
        console.warn(`No se pudo escanear ${file}:`, err.message);
      }
    }
  }
}