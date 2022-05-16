export class HttpException extends Error {
  constructor(message:string, private status: number) {
    super(message)
  }

  getStatus(): number {
    return this.status
  }
}