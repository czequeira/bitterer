import { BitterIoc } from "../../plugins";
import { StudentContext } from "./StudentFactoryStore";
import { StudentInterface } from "./StudentInterface";

const context = new BitterIoc()
context.init(StudentContext)

const student = context.getBit<StudentInterface>('student')

student.studing()

const javaStudent = context.getBit<StudentInterface>('javaStudent')

javaStudent.studing()
