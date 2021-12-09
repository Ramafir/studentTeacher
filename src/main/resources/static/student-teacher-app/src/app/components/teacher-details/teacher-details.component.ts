import { Component, OnInit } from '@angular/core';
import {Teacher} from "../../interface/teacher";
import {HttpErrorResponse} from "@angular/common/http";
import {Student} from "../../interface/student";
import {TeacherService} from "../../service/teacher.service";

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.css']
})
export class TeacherDetailsComponent implements OnInit {
  public students: Student[];
  public currentTeacher: Teacher;

  constructor(private teacherService: TeacherService) { }

  ngOnInit(): void {
  }

  public getTeacherStudents(teacherId: number): void {
    this.teacherService.getTeacherStudents(teacherId).subscribe(
      (response: Student[]) => {
        this.students = response;
      },
      (error: HttpErrorResponse) => {
        alert((error.message))
      }
    );
  }

}
