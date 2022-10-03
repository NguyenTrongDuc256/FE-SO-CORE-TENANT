import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from "ngx-permissions";
import { DATA_PERMISSION } from "src/app/_shared/utils/constant";
import { MenuDetailTenantComponent } from "./components/menu-detail-tenant/menu-detail-tenant.component";
import { MenuListTenantComponent } from "./components/menu-list-tenant/menu-list-tenant.component";

const routes: Routes = [
  {
    path: '',
    component: MenuListTenantComponent,
    // canActivate: [NgxPermissionsGuard],
    // data: {
    //   permissions: {
    //     only: [DATA_PERMISSION.module_view],
    //     redirectTo: "/access-denied"
    //   },
    // }
  },
  {
    path: 'detail/:id',
    component: MenuDetailTenantComponent,
    // canActivate: [NgxPermissionsGuard],
    // data: {
    //   permissions: {
    //     only: [DATA_PERMISSION.module_view],
    //     redirectTo: "/access-denied"
    //   },
    // }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class MenuManagerRoutingModule {}
