import { Person } from "./Person";

export class American implements Person {
  sayHello(name: string): string {
    return name + ' hello'
  }

  sayGoodbye(name: string): string {
    return name + ' goodbye'
  }
}