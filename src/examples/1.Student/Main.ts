import { BitterIoc } from "../../plugins";
import { config } from "./config";
import { Student } from "./Student";

const bitter = new BitterIoc()
bitter.init(config)

const student = bitter.getBit<Student>('student')

console.log(student.getName())
console.log(student.getAge())

console.log('================')

console.log(student.getTeacher().getName())
console.log(student.getTeacher().getAge())