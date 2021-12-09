import {Subject} from "../enum/subject.enum";

export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  subject: Subject;
}
