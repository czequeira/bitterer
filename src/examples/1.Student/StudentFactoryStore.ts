import { IBitFactoryStore } from "../../plugins";
import { JavaStudent } from "./JavaStudent";
import { Student } from "./Student";

function createStudent<T>(): T {
  const s =  new Student() as T
  return s
}
function createJavaStudent<T>(): T {
  const s =  new JavaStudent() as T
  return s
}

export const StudentContext: IBitFactoryStore = {
  student: {
    args: [],
    factory: createStudent,
    scope: 'singleton',
  },
  javaStudent: {
    args: [],
    factory: createJavaStudent,
    scope: 'prototype',
  },
}