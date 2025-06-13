import { BitterIoc } from "../../core";
import { config } from "./config";
import { Person } from "./Person";

const bitter = new BitterIoc()
bitter.init(config)

const chinese = bitter.getBit<Person>('chinese')
chinese.work()