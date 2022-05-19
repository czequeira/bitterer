import { ValidationError } from 'class-validator';
import { HttpException } from './http.exception';

function parseArg(arg: any): string {
  if (arg instanceof ValidationError) {
    const { constraints } = arg;
    if (constraints)
      return Object.keys(constraints)
        .map((i) => constraints[i])
        .join(', ');
    return 'No data';
  }
  return JSON.stringify(arg);
}

export class BadRequestException extends HttpException {
  constructor(...args: any[]) {
    const message = args.map(parseArg).join(', ');
    super(message, 400);
  }
}
