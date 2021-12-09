import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Student} from "../../interface/student";
import {StudentService} from "../../service/student.service";
import {Sort} from "@angular/material/sort";

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  public students: Student[];
  public editStudent: Student;
  public deleteStudent: Student;
  sortedStudents: Student[];



  constructor(private studentService: StudentService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.getStudents();
  }

  sortStudents(sort: Sort) {
    const data = this.students.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedStudents = data;
      return;
    }

    this.sortedStudents = data.sort((a, b) => {
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
          return compare(a.fieldOfStudy, b.fieldOfStudy, isAsc);
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
  public onAddStudent(addForm: NgForm): void {
    document.getElementById('add-student-form').click();
    this.studentService.addStudent(addForm.value).subscribe(
      (response: Student) => {
        console.log(response);
        this.getStudents();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateStudent(student: Student): void {
    this.studentService.updateStudent(student).subscribe(
      (response: Student) => {
        console.log(response);
        this.getStudents();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteStudent(studentId: number): void {
    this.studentService.deleteStudent(studentId).subscribe(
      (response: void) => {
        console.log(response);
        this.getStudents();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchStudents(key: string): void {
    console.log(key);
    const results: Student[] = [];
    for (const student of this.sortedStudents) {
      if (student.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        student.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(student);
      }
    }
    this.sortedStudents = results;
    if (results.length === 0 || !key) {
      this.getStudents();
    }
  }

  public onOpenModal(student: Student, mode: string): void {
    const container = document.getElementById('student-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addStudentModal');
    }
    if (mode === 'edit') {
      this.editStudent = student;
      button.setAttribute('data-target', '#updateStudentModal');
    }
    if (mode === 'delete') {
      this.deleteStudent = student;
      button.setAttribute('data-target', '#deleteStudentModal');
    }
    container.appendChild(button);
    button.click();
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
