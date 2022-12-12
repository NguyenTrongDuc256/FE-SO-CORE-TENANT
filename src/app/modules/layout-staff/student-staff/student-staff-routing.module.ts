import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { DATA_PERMISSION } from 'src/app/_shared/utils/constant';
import { CreateStudentStaffComponent } from './components/create-student-staff/create-student-staff.component';
import { ResultImportFileStudentStaffComponent } from './components/result-import-file-student-staff/result-import-file-student-staff.component';
import { StudentDetailStaffComponent } from './components/student-detail-staff/student-detail-staff.component';
import { StudentStaffListComponent } from './components/student-staff-list/student-staff-list.component';
import { UpdateStudentStaffComponent } from './components/update-student-staff/update-student-staff.component';

const routes: Routes = [
  {
    path: '',
    component: StudentStaffListComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.student_view],
        redirectTo: "/access-denied"
      },
    },
  },
  {
    path: 'create-student',
    component: CreateStudentStaffComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.student_modify],
        redirectTo: "/access-denied"
      },
    },
  },
  {
    path: 'detail/:studentId',
    component: StudentDetailStaffComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.student_view],
        redirectTo: "/access-denied"
      },
    },
  },
  {
    path: 'update-student/:studentId',
    component: UpdateStudentStaffComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.student_modify],
        redirectTo: "/access-denied"
      },
    },
  },
  {
    path: 'result-import-file/:id',
    component: ResultImportFileStudentStaffComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.student_file_user_view],
        redirectTo: "/access-denied"
      }
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentStaffRoutingModule { }
