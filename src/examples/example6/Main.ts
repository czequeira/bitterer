import { BitterIoc } from "../../core";
import { MathService } from "./MathService";

class Main {
  private ioc = new BitterIoc()

  async run() {
    await this.ioc.scan()

    const math = this.ioc.getBit<MathService>('mathService')
    console.log(math.add(2, 3))
  }

}

new Main().run()