export interface IScanFilesStep {
  execute(rootDir: string): Promise<string[]>
}