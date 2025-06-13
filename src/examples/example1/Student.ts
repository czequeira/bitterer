import { Teacher } from "./Teacher";

export class Student {
  constructor(
    private name: string,
    private age: number,
    private teacher: Teacher,
  ) {}

  getName() {
    return this.name
  }

  getAge() {
    return this.age
  }

  getTeacher() {
    return this.teacher
  }
}