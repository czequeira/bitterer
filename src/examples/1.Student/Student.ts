import { StudentInterface } from "./StudentInterface";

export class Student implements StudentInterface {
  studing(): void {
    console.log('studing')
  }
}