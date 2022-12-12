import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { DATA_PERMISSION } from 'src/app/_shared/utils/constant';
import { ClassDetailCourseTeacherComponent } from './components/class-detail-course-teacher/class-detail-course-teacher.component';
import { ClassDetailTeacherComponent } from './components/class-detail-teacher/class-detail-teacher.component';
import { ClassListTeacherComponent } from './components/class-list-teacher/class-list-teacher.component';
import { HistoryScoreHomeroomClassTeacherComponent } from './components/history-score-homeroom-class-teacher/history-score-homeroom-class-teacher.component';

const routes: Routes = [
  {
    path: 'list',
    component: ClassListTeacherComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.course_access,DATA_PERMISSION.homeroom_class_access],
        redirectTo: "/access-denied"
      },
    },
  },
  {
    path: 'detail-homeroom-class/:id',
    component: ClassDetailTeacherComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.course_access,DATA_PERMISSION.homeroom_class_access],
        redirectTo: "/access-denied"
      },
    },
  },
  {
    path: 'detail-course/:id',
    component: ClassDetailCourseTeacherComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.course_access,DATA_PERMISSION.homeroom_class_access],
        redirectTo: "/access-denied"
      },
    },
  },
  {
    path: 'history-homeroom-class', // Lịch sử chấm điểm hành vi tất cả lớp chủ nhiệm
    component: HistoryScoreHomeroomClassTeacherComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassManagerRoutingModule { }
