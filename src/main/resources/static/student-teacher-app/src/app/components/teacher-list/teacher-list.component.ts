import {Component, OnInit, ViewChild} from '@angular/core';
import {Teacher} from "../../interface/teacher";
import {TeacherService} from "../../service/teacher.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Sort} from "@angular/material/sort";
import {StudentService} from "../../service/student.service";
import {Student} from "../../interface/student";

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  public students: Student[] = [];
  public teachers: Teacher[] = [];
  public editTeacher: Teacher;
  public deleteTeacher: Teacher;
  sortedTeachers: Teacher[];

  key: string = 'id';
  reverse: boolean = false;


  constructor(private teacherService: TeacherService,
              private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.getTeachers()
    this.getStudents()
  }

  sortTeachers(sort: Sort) {
    const data = this.teachers.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedTeachers = data;
      return;
    }
    this.sortedTeachers = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc)
        case 'firstName':
          return compare(a.firstName, b.firstName, isAsc);
        case 'lastName':
          return compare(a.lastName, b.lastName, isAsc);
        case 'age':
          return compare(a.age, b.age, isAsc);
        case 'email':
          return compare(a.email, b.email, isAsc);
        case 'fieldOfStudy':
          return compare(a.subject, b.subject, isAsc);
        default:
          return 0;
      }
    });
  }

  public getStudents(): void {
    this.studentService.getStudents().subscribe(
      (response: Student[]) => {
        this.students = response;
      },
      (error: HttpErrorResponse) => {
        alert((error.message))
      }
    );
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
    for (const teacher of this.sortedTeachers) {
      if (teacher.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        teacher.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(teacher);
      }
    }
    this.sortedTeachers = results;
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

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
