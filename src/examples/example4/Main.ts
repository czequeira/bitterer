import { Bitter } from "../../core";
import { config } from "./config";
import { User } from "./User";

const bitter = new Bitter()
bitter.init(config)

const user = bitter.getBit<User>('user')
const user2 = bitter.getBit<User>('user')

console.log(user === user2)