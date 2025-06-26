import { glob } from "glob";
import { IScanFilesStep } from "../types";

export class ScanFilesStep implements IScanFilesStep {
  async execute(rootDir: string): Promise<string[]> {
    const files = await glob(`${rootDir}/*.js`, {
      ignore: ['**/node_modules/**', '**/*.d.ts'],
      absolute: true,
    });
    return files
  }
}