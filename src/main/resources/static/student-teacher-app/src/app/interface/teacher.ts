import {Subject} from "../enum/subject.enum";
import {Student} from "./student";

export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  subject: Subject;
  students: Student[];
}
