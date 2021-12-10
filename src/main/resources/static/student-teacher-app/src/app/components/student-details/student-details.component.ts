import { Component, OnInit } from '@angular/core';
import {Student} from "../../interface/student";
import {StudentService} from "../../service/student.service";
import {TeacherService} from "../../service/teacher.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  student: Student;

  constructor(private teacherService: TeacherService,
              private studentService: StudentService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleStudentDetails();
    })
  }

  handleStudentDetails() {
    const theStudentId: number = +this.route.snapshot.paramMap.get('id');

    this.studentService.getStudent(theStudentId).subscribe(
      data => {
        this.student = data;
      }
    )
  }

}
