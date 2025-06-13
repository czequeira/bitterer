import { BitterIoc } from "../../core";
import { config } from "./config";
import { Person } from "./Person";

const bitter = new BitterIoc()
bitter.init(config)

const p1 = bitter.getBit<Person>('chinese')

console.log(p1.sayHello('Tom'))
console.log(p1.sayGoodbye('Tom'))

console.log('==================')

const p2 = bitter.getBit<Person>('american')

console.log(p2.sayHello('Jack'))
console.log(p2.sayGoodbye('Jack'))

