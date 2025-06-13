import { IBitFactoryStore } from "../../plugins";
import { Student } from "./Student";
import { Teacher } from "./Teacher";

export const config: IBitFactoryStore = {
  student: {
    scope: 'singleton',
    class: Student,
    args: [{
      name: 'name',
      value: 'Tom',
    }, {
      name: 'age',
      value: 20,
    }, {
      name: 'teacher',
      ref: 'teacher',
    }]
  },
  teacher: {
    scope: 'singleton',
    class: Teacher,
    args: [{
      name: 'name',
      value: 'John',
    }, {
      name: 'age',
      value: 40,
    }]
  }
}