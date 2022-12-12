import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileManagerStaffComponent } from "./components/profile-manager-staff/profile-manager-staff.component";
import {
  StudentRecordListStaffComponent
} from "./components/student-record-list-staff/student-record-list-staff.component";
import {
  ApproveProfileStudentStaffComponent
} from "./components/approve-profile-student-staff/approve-profile-student-staff.component";
import {
  ResultImportFileProfileStudentStaffComponent
} from "./components/result-import-file-profile-student-staff/result-import-file-profile-student-staff.component";
import { NgxPermissionsGuard } from "ngx-permissions";
import { DATA_PERMISSION } from "../../../_shared/utils/constant";

const routes: Routes = [
  {
    path: 'manager-profile',
    component: ProfileManagerStaffComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.student_file_user_view],
        redirectTo: "/access-denied"
      }
    }
  },
  {
    path: 'student-record/:id',
    component: StudentRecordListStaffComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.student_file_user_view],
        redirectTo: "/access-denied"
      }
    }
  },
  {
    path: 'approve-profile-student',
    component: ApproveProfileStudentStaffComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.student_file_user_view],
        redirectTo: "/access-denied"
      }
    }
  },
  {
    path: 'result-import-file/:id',
    component: ResultImportFileProfileStudentStaffComponent,
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
export class StudentInfoStaffRoutingModule { }
