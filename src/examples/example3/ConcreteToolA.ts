import { Tool } from "./Tool";

export class ConcreteToolA implements Tool {
  realWork(): void {
    console.log('from ConcreteToolA')
  }
}