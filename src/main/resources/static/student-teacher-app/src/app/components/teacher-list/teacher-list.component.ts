import { Component, OnInit } from '@angular/core';
import {Teacher} from "../../interface/teacher";
import {TeacherService} from "../../service/teacher.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  public teachers: Teacher[] = [];
  public editTeacher: Teacher;
  public deleteTeacher: Teacher;

  key: string = 'id';
  reverse: boolean = false;


  constructor(private teacherService: TeacherService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getTeachers()
  }

  public getTeachers(): void {
    this.teacherService.getTeachers().subscribe(
      (response: Teacher[]) => {
        this.teachers = response;
      },
      (error: HttpErrorResponse) => {
        alert((error.message))
      }
    );
  }
  public onAddTeacher(addForm: NgForm): void {
    document.getElementById('add-teacher-form').click();
    this.teacherService.addTeacher(addForm.value).subscribe(
      (response: Teacher) => {
        console.log(response);
        this.getTeachers();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateTeacher(teacher: Teacher): void {
    this.teacherService.updateTeacher(teacher).subscribe(
      (response: Teacher) => {
        console.log(response);
        this.getTeachers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteTeacher(teacherId: number): void {
    this.teacherService.deleteTeacher(teacherId).subscribe(
      (response: void) => {
        console.log(response);
        this.getTeachers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchTeachers(key: string): void {
    console.log(key);
    const results: Teacher[] = [];
    for (const teacher of this.teachers) {
      if (teacher.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        teacher.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(teacher);
      }
    }
    this.teachers = results;
    if (results.length === 0 || !key) {
      this.getTeachers();
    }
  }

  public onOpenModal(teacher: Teacher, mode: string): void {
    const container = document.getElementById('teacher-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addTeacherModal');
    }
    if (mode === 'edit') {
      this.editTeacher = teacher;
      button.setAttribute('data-target', '#updateTeacherModal');
    }
    if (mode === 'delete') {
      this.deleteTeacher = teacher;
      button.setAttribute('data-target', '#deleteTeacherModal');
    }
    container.appendChild(button);
    button.click();
  }


  public sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}
