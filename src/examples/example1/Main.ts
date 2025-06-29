import { Bitter } from "../../core";
import { config } from "./config";
import { Student } from "./Student";

const bitter = new Bitter()
bitter.init(config)

const student = bitter.getBit<Student>('student')

console.log(student.getName())
console.log(student.getAge())

console.log('================')

console.log(student.getTeacher().getName())
console.log(student.getTeacher().getAge())