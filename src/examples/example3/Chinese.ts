import { Bit, Inject } from "../../core";
import { Person } from "./Person";
import { Tool } from "./Tool";

@Bit()
export class Chinese implements Person {
  constructor(
    @Inject('tool') private tool: Tool
  ) {}

  work(): void {
    this.tool.realWork()
  }
}
