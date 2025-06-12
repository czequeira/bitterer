import { StudentInterface } from "./StudentInterface";

export class Student implements StudentInterface {
  constructor() { 
    console.log('[STUDENT] Constructor of Student')
   }

  studing(): void {
    console.log('[STUDENT] studing')
  }
}