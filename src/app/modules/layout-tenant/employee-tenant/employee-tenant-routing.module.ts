import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import {DATA_PERMISSION} from "src/app/_shared/utils/constant";
import {NgxPermissionsGuard} from "ngx-permissions";
import {EmployeeListTenantComponent} from "./components/employee-list-tenant/employee-list-tenant.component";
import {EmployeeCreateTenantComponent} from "./components/employee-create-tenant/employee-create-tenant.component";
import {
  ResultImportEmployeeTenantComponent
} from "./components/result-import-employee-tenant/result-import-employee-tenant.component";

const routes: Routes = [
  {
    path: '',
    component: EmployeeListTenantComponent,
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
    component: EmployeeCreateTenantComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.employee_modify],
        redirectTo: "/access-denied"
      },
    },
  },
  {
    path: 'result-import-file/:id/:schoolId',
    component: ResultImportEmployeeTenantComponent,
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

export class EmployeeTenantRoutingModule {}
