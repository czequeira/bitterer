export class User {
  constructor(
    private friend: User,
    private name: string,
  ) {}

  getFriend() {
    return this.friend
  }

  getName() {
    return this.name
  }
}