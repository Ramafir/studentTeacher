import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Teacher} from "../interface/teacher";
import {Student} from "../interface/student";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getTeacherStudents(teacherId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiServerUrl}/students/${teacherId}/students`)
  }

  public getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.apiServerUrl}/teachers`)

  }

  public addTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(`${this.apiServerUrl}/teachers/add`, teacher)

  }

  public updateTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(`${this.apiServerUrl}/teachers/${teacher.id}`, teacher)

  }

  public deleteTeacher(teacherId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/teachers/delete/${teacherId}`)

  }

  public getTeacher(theTeacherId: number): Observable<Teacher> {
    const teacherUrl = `${this.apiServerUrl}/teachers/${theTeacherId}`;
    return this.http.get<Teacher>(teacherUrl);
  }
}
