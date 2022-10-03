import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from "ngx-permissions";
import { DATA_PERMISSION } from "src/app/_shared/utils/constant";
import { ModuleDetailTenantComponent } from "./components/module-detail-tenant/module-detail-tenant.component";
import { ModuleListTenantComponent } from "./components/module-list-tenant/module-list-tenant.component";

const routes: Routes = [
  {
    path: '',
    component: ModuleListTenantComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.module_view],
        redirectTo: "/access-denied"
      },
    }
  },
  {
    path: 'detail/:id',
    component: ModuleDetailTenantComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.module_view],
        redirectTo: "/access-denied"
      },
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ModuleManagerRoutingModule {}
