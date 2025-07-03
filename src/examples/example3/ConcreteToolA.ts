import { Bit } from "../../core";
import { Tool } from "./Tool";

@Bit()
export class ConcreteToolA implements Tool {
  realWork(): void {
    console.log('from ConcreteToolA')
  }
}
