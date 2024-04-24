import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/admin/header/header.component';
import { authGuard } from './components/admin/guards/auth.guard';
import { CoursesComponent } from './components/admin/Pages/courses-programs/courses/courses.component';
import { ProgramsComponent } from './components/admin/Pages/courses-programs/programs/programs.component';
import { BatchComponent } from './components/admin/Pages/batch/batch.component';
import { TeachersComponent } from './components/admin/Pages/teachers/teachers.component';
import { StudentsComponent } from './components/admin/Pages/students/students.component';
import { TopicsComponent } from './components/admin/Pages/courses-programs/courses/topics/topics.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home',
    component: HeaderComponent,
    canActivate: [authGuard],
    children: [
      { path: 'courses', component: CoursesComponent },
      { path: 'programs', component: ProgramsComponent },
      { path: 'batch', component: BatchComponent },
      { path: 'teachers', component: TeachersComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'topics/:topicCode', component: TopicsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
