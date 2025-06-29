import { Bitter } from "../../core";
import { config } from "./config";
import { Person } from "./Person";

const bitter = new Bitter()
bitter.init(config)

const chinese = bitter.getBit<Person>('chinese')
chinese.work()