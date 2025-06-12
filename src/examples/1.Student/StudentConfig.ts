import { IBitFactoryStore } from "../../plugins";
import { JavaStudent } from "./JavaStudent";
import { Student } from "./Student";

export const StudentConfig: IBitFactoryStore = {
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