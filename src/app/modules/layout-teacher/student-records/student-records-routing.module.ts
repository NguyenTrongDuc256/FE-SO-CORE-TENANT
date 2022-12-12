import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { DATA_PERMISSION } from 'src/app/_shared/utils/constant';
import { ListStudentRecordsApproveComponent } from './components/list-student-records-approve/list-student-records-approve.component';
import { ListStudentRecordsComponent } from './components/list-student-records/list-student-records.component';
import { ListStudentComponent } from './components/list-student/list-student.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListStudentComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.student_file_user_view],
        redirectTo: "/access-denied"
      },
    },
  },
  {
    path: 'list/:id',
    component: ListStudentRecordsComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.student_file_user_view],
        redirectTo: "/access-denied"
      },
    },
  },
  {
    path: 'approve',
    component: ListStudentRecordsApproveComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.student_file_user_view],
        redirectTo: "/access-denied"
      },
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRecordsRoutingModule { }
