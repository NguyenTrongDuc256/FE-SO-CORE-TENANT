import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  StudentRecordListParentComponent
} from "./components/student-record-list-parent/student-record-list-parent.component";


import {NgxPermissionsGuard} from "ngx-permissions";
import {DATA_PERMISSION} from "../../../_shared/utils/constant";

const routes: Routes = [
  {
    path: '',
    component: StudentRecordListParentComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.student_file_user_view],
        redirectTo: "/access-denied"
      }
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentInfoParentRoutingModule { }
