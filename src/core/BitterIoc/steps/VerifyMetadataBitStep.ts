import { IVerifyMetadataStep } from "../types";

export class VerifyMetadataBitStep implements IVerifyMetadataStep {
  execute(target: unknown): boolean {
    return typeof target === 'function' &&
      target.prototype &&
      Reflect.hasMetadata('bit:config', target);
  }
}