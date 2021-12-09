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

const routes: Routes = [
  {path: '', redirectTo: '/teachers', pathMatch: 'full'},
  {path: 'students', component: StudentsListComponent},
  {path: 'teachers', component: TeacherListComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    StudentsListComponent,
    TeacherListComponent,
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
        MatTableModule,
        MatSortModule
    ],
  providers: [TeacherService, StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
