import { BitterIoc } from "../../core";
import { Calculator, MathService } from "./MathService";

class Main {
  private ioc = new BitterIoc()

  async run() {
    await this.ioc.scan()

    const calculator = this.ioc.getBit<Calculator>('calculator')
    console.log(calculator.add(2, 3))
  }

}

new Main().run()
