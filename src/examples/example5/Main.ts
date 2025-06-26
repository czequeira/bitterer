import { BitterIoc } from "../../core";
import { config } from "./config";
import { User } from "./User";

const bitter = new BitterIoc()
bitter.init(config)

const tom = bitter.getBit<User>('tom')
console.log(tom.getName())
console.log(tom.getFriend().getName())
console.log(tom.getFriend().getFriend().getName())