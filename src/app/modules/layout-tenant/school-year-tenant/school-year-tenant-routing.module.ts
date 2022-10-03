import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { DATA_PERMISSION } from "src/app/_shared/utils/constant";
import { NgxPermissionsGuard } from "ngx-permissions";
import { SchoolYearListTenantComponent } from "./components/school-year-list-tenant/school-year-list-tenant.component";
import { DetailSchoolYearTenantComponent } from "./components/detail-school-year-teanant/detail-school-year-teanant.component";

const routes: Routes = [
  {
    path: '',
    component: SchoolYearListTenantComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.school_year_access],
        redirectTo: "/access-denied"
      },
    },
  },
  {
    path: 'detail/:id',
    component: DetailSchoolYearTenantComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.school_year_access],
        redirectTo: "/accessdenied"
      },
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class SchoolYearListTenantRoutingModule {}
