
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { DATA_PERMISSION } from "src/app/_shared/utils/constant";
import { NgxPermissionsGuard } from "ngx-permissions";
import {EmployeeListStaffComponent} from "./components/employee-list-staff/employee-list-staff.component";
import {EmployeeCreateStaffComponent} from "./components/employee-create-staff/employee-create-staff.component";
import {
  ResultImportEmployeeStaffComponent
} from "./components/result-import-employee-staff/result-import-employee-staff.component";


const routes: Routes = [
  {
    path: '',
    component: EmployeeListStaffComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.employee_view],
        redirectTo: "/access-denied"
      },
    },
  },
  {
    path: 'create-or-edit/:id',
    component: EmployeeCreateStaffComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.employee_modify],
        redirectTo: "/access-denied"
      },
    },
  },
  {
    path: 'result-import-file/:id',
    component: ResultImportEmployeeStaffComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.employee_import],
        redirectTo: "/access-denied"
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class EmployeeStaffRoutingModule {}
