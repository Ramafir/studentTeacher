import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Observable} from "rxjs";
import {Student} from "../interface/student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiServerUrl}/students`)

  }

  public addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.apiServerUrl}/students`, student)

  }

  public updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiServerUrl}/students/${student.id}`, student)

  }

  public deleteStudent(studentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/students/delete/${studentId}`)

  }

  public getStudent(theStudentId: number): Observable<Student> {
    const studentUrl = `${this.apiServerUrl}/${theStudentId}`;
    return this.http.get<Student>(studentUrl);
  }
}
