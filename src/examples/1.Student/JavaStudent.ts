import { StudentInterface } from "./StudentInterface";

export class JavaStudent implements StudentInterface {
  constructor() {
    console.log('[JAVA STUDENT] constructor of JavaStudent')
  }

  studing(): void {
    console.log('[JAVA STUDENT] studing java')
  }
}