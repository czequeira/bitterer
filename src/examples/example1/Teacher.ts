export class Teacher {
  constructor(
    private name: string,
    private age: number,
  ) {}

  getName() {
    return this.name
  }

  getAge() {
    return this.age
  }
}