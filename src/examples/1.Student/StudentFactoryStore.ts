import { IBitFactoryStore } from "../../plugins";
import { JavaStudent } from "./JavaStudent";
import { Student } from "./Student";

export const StudentContext: IBitFactoryStore = {
  student: {
    args: [],
    class: Student,
    scope: 'singleton',
  },
  javaStudent: {
    args: [],
    class: JavaStudent,
    scope: 'prototype',
  },
}