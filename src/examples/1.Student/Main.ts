import { BitterIoc } from "../../plugins";
import { StudentConfig } from "./StudentConfig";
import { StudentInterface } from "./StudentInterface";

const context = new BitterIoc()
context.init(StudentConfig)

console.log('[MAIN] before get student')
const student = context.getBit<StudentInterface>('student')

student.studing()

console.log('[MAIN] before get java student')
const javaStudent = context.getBit<StudentInterface>('javaStudent')

javaStudent.studing()

console.log('[MAIN] before get student')
const student2 = context.getBit<StudentInterface>('student')

student2.studing()

console.log('[MAIN] before get java student')
const javaStudent2 = context.getBit<StudentInterface>('javaStudent')

javaStudent2.studing()

