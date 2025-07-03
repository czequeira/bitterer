import { Bit } from "../../core";
import { Tool } from "./Tool";

@Bit()
export class ConcreteToolB implements Tool {
  realWork(): void {
    console.log('from ConcreteToolB')
  }
}
