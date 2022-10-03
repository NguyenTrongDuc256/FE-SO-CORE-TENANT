import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from "ngx-permissions";
import { DATA_PERMISSION } from "src/app/_shared/utils/constant";
import { CampusListManagerTenantComponent } from "./components/campus-list-manager-tenant/campus-list-manager-tenant.component";

const routes: Routes = [
  {
    path: '',
    component: CampusListManagerTenantComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.campus_access],
        redirectTo: "/access-denied"
      },
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class CampusRoutingModule {}
