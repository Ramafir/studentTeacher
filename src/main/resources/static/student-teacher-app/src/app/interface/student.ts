import {Study} from "../enum/field-of-study.enum";
import {Teacher} from "./teacher";

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  fieldOfStudy: Study;
  teachers: Teacher[];
}
