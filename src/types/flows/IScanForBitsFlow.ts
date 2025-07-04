import { IRegisterExportedClassStep, IScanFilesStep, IVerifyMetadataStep } from "../steps"

export interface IScanForBitsFlow {
  execute(rootDir?: string): Promise<void>

  registerExportedClassStep: IRegisterExportedClassStep
  scanFilesStep: IScanFilesStep
  verifyMetadataStep: IVerifyMetadataStep
}