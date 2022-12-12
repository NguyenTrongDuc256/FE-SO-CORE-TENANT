import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { DATA_PERMISSION } from 'src/app/_shared/utils/constant';
import { CourseClassDetailComponent } from './components/course-class-detail/course-class-detail.component';
import { ListCoursesStaffComponent } from './components/list-courses/list-courses.component';
import { ListStudentsCourseComponent } from './components/list-students/list-students.component';
import { ListTeachersHomeroomClassComponent } from './components/list-teachers/list-teachers.component';

const routes: Routes = [
  {
    path:'',
    component: ListCoursesStaffComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.course_access],
        redirectTo: "/access-denied"
      },
    }
  },
  {
    path: 'detail/:id',
    component: CourseClassDetailComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.course_access],
        redirectTo: "/access-denied"
      },
    },
  },
  {
    path:':id/teacher',
    component: ListTeachersHomeroomClassComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.course_access],
        redirectTo: "/access-denied"
      },
    }
  },
  {
    path:':id/student',
    component: ListStudentsCourseComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.course_access],
        redirectTo: "/access-denied"
      },
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
