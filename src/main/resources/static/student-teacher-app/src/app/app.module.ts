import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {TeacherService} from "./service/teacher.service";
import {StudentService} from "./service/student.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router"
import { StudentsListComponent } from './components/students-list/students-list.component';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from "@angular/material/paginator";
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { TeacherDetailsComponent } from './components/teacher-details/teacher-details.component';

const routes: Routes = [
  {path: '', redirectTo: '/teachers', pathMatch: 'full'},
  {path: 'students', component: StudentsListComponent},
  {path: 'teachers', component: TeacherListComponent},
  {path: 'students/:id', component: StudentDetailsComponent},
  {path: 'teachers/:id', component: TeacherDetailsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    StudentsListComponent,
    TeacherListComponent,
    StudentDetailsComponent,
    TeacherDetailsComponent,
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
    ],
  providers: [TeacherService, StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
