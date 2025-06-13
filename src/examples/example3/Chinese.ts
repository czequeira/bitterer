import { Person } from "./Person";
import { Tool } from "./Tool";

export class Chinese implements Person {
  constructor(
    private tool: Tool
  ) {}

  work(): void {
    this.tool.realWork()
  }
}