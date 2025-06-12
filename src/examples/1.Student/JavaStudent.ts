import { StudentInterface } from "./StudentInterface";

export class JavaStudent implements StudentInterface {
  studing(): void {
    console.log('studing java')
  }
}