import {Study} from "../enum/field-of-study.enum";

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  fieldOfStudy: Study
}
