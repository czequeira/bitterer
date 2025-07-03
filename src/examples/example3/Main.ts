import { readFile } from "fs/promises";
import { Bitter } from "../../core";
import { Person } from "./Person";

const run = async () => {
  const bitter = new Bitter()
  const file = await readFile('./config.yml', 'utf8')
  await bitter.importYaml(file, {env: 'prod'})

  const chinese = bitter.getBit<Person>('chinese')
  chinese.work()
}
run()
