import {Subject} from "../enum/subject.enum";

export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  subject: Subject;
}
