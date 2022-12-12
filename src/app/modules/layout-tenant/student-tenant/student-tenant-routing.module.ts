import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { DATA_PERMISSION } from "src/app/_shared/utils/constant";
import { NgxPermissionsGuard } from "ngx-permissions";
import { StudentTenantListComponent } from "./components/student-tenant-list/student-tenant-list.component";
import { CreateStudentTenantComponent } from "./components/create-student-tenant/create-student-tenant.component";
import { StudentDetailTenantComponent } from "./components/student-detail-tenant/student-detail-tenant.component";
import { UpdateStudentTenantComponent } from "./components/update-student-tenant/update-student-tenant.component";
import { ResultImportFileStudentTenantComponent } from "./components/result-import-file-student-tenant/result-import-file-student-tenant.component";

const routes: Routes = [
  {
    path: '',
    component: StudentTenantListComponent,
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
    component: CreateStudentTenantComponent,
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
    component: StudentDetailTenantComponent,
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
    component: UpdateStudentTenantComponent,
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
    component: ResultImportFileStudentTenantComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.student_modify],
        redirectTo: "/access-denied"
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class StudentTenantRoutingModule {
}
