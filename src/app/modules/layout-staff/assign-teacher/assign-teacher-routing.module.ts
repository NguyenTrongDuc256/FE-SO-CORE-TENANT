import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { DATA_PERMISSION } from 'src/app/_shared/utils/constant';
import { AssignCourseTeacherComponent } from './components/assign-course-teacher/assign-course-teacher.component';
import { AssignGradeMasterComponent } from './components/assign-grade-master/assign-grade-master.component';
import { AssignMainHomeroomTeacherComponent } from './components/assign-main-homeroom-teacher/assign-main-homeroom-teacher.component';
import { DashboardControlAssignTeacherComponent } from './components/dashboard-control-assign-teacher/dashboard-control-assign-teacher.component';

const routes: Routes = [
  {
    path:'homeroom-class',
    component: DashboardControlAssignTeacherComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.school_data_declaration_assignment],
        redirectTo: "/access-denied"
      },
    }
  },
  {
    path:'grade-master',
    component: AssignGradeMasterComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.school_data_declaration_assignment],
        redirectTo: "/access-denied"
      },
    }
  },
  {
    path:'course-teacher',
    component: AssignCourseTeacherComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.school_data_declaration_assignment],
        redirectTo: "/access-denied"
      },
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignTeacherRoutingModule { }
