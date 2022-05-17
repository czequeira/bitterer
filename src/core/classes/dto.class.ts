export class Dto {
  getValues(): string[] {
    console.log(this)
    return Object.keys(this);
  }
}
