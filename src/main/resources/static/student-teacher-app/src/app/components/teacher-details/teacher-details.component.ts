import { Component, OnInit } from '@angular/core';
import {Teacher} from "../../interface/teacher";
import {TeacherService} from "../../service/teacher.service";
import {StudentService} from "../../service/student.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.css']
})
export class TeacherDetailsComponent implements OnInit {
  teacher: Teacher;

  constructor(private teacherService: TeacherService,
              private studentService: StudentService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleTeacherDetails();
    })
  }

  handleTeacherDetails() {
    const theTeacherId: number = +this.route.snapshot.paramMap.get('id');

    this.teacherService.getTeacher(theTeacherId).subscribe(
      data => {
        this.teacher = data;
      }
    )
  }

}
