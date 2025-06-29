import { Bit, Inject } from "../../core";

@Bit()
export class MathService {
  add(a: number, b: number) { return a + b; }
}

@Bit()
export class Calculator {
  constructor(
    @Inject('mathService') private mathService: MathService,
  ) {}

  add(a: number, b: number) {
    return this.mathService.add(a, b)
  }
}
