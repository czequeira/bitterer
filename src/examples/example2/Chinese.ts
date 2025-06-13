import { Person } from "./Person";

export class Chinese implements Person {
  sayHello(name: string): string {
    return name + ' 你好'
  }

  sayGoodbye(name: string): string {
    return name + ' 再见'
  }
}