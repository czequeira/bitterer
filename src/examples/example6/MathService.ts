import { Bit } from "../../core";

@Bit('mathService')
export class MathService {
  add(a: number, b: number) { return a + b; }
}