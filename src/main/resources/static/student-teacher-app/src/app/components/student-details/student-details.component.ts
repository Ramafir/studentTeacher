import { Component, OnInit } from '@angular/core';
import {Student} from "../../interface/student";
import {HttpErrorResponse} from "@angular/common/http";
import {StudentService} from "../../service/student.service";
import {Teacher} from "../../interface/teacher";

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  public teachers: Teacher[];
  public currentStudent: Student;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudentTeachers(this.currentStudent.id)
  }

  public getStudentTeachers(studentId: number): void {
    this.studentService.getStudentTeachers(studentId).subscribe(
      (response: Teacher[]) => {
        this.teachers = response;
      },
      (error: HttpErrorResponse) => {
        alert((error.message))
      }
    );
  }

}
