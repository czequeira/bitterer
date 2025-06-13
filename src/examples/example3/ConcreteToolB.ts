import { Tool } from "./Tool";

export class ConcreteToolB implements Tool {
  realWork(): void {
    console.log('from ConcreteToolB')
  }
}