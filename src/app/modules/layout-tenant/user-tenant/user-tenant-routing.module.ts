
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { DATA_PERMISSION } from "src/app/_shared/utils/constant";
import { NgxPermissionsGuard } from "ngx-permissions";
import { UserListTenantComponent } from "./components/user-list-tenant/user-list-tenant.component";
import {UserCreateTenantComponent} from "./components/user-create-tenant/user-create-tenant.component";
import {UserEditTenantComponent} from "./components/user-edit-tenant/user-edit-tenant.component";
import {UserDetailTenantComponent} from "./components/user-detail-tenant/user-detail-tenant.component";

const routes: Routes = [
  {
    path: '',
    component: UserListTenantComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.user_view],
        redirectTo: "/access-denied"
      },
    },
  },
  {
    path: 'create',
    component: UserCreateTenantComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.user_modify],
        redirectTo: "/access-denied"
      },
    },
  },
  {
    path: 'edit/:id',
    component: UserEditTenantComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.user_modify],
        redirectTo: "/access-denied"
      },
    },
  },
  {
    path: 'detail/:id',
    component: UserDetailTenantComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.user_view],
        redirectTo: "/access-denied"
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class UserTenantRoutingModule {}
