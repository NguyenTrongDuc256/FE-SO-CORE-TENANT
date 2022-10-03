import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ParentListTenantComponent} from "./components/parent-list-tenant/parent-list-tenant.component";
import {NgxPermissionsGuard} from "ngx-permissions";
import {DATA_PERMISSION} from "../../../_shared/utils/constant";
import {ParentCreateTenantComponent} from "./components/parent-create-tenant/parent-create-tenant.component";
import {ParentEditTenantComponent} from "./components/parent-edit-tenant/parent-edit-tenant.component";
import {UserDetailTenantComponent} from "../user-tenant/components/user-detail-tenant/user-detail-tenant.component";
import {ParentDetailTenantComponent} from "./components/parent-detail-tenant/parent-detail-tenant.component";

const routes: Routes = [
  {
    path: '',
    component: ParentListTenantComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.parent_view],
        redirectTo: '/access-denied',
      },
    }
  },
  {
    path: 'create',
    component: ParentCreateTenantComponent,
    data: {
      permissions: {
        only: [DATA_PERMISSION.parent_modify],
        redirectTo: '/access-denied',
      },
    }
  },
  {
    path: 'edit/:id',
    component: ParentEditTenantComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.parent_modify],
        redirectTo: "/access-denied"
      },
    },
  },
  {
    path: 'detail/:id',
    component: ParentDetailTenantComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.parent_view],
        redirectTo: "/access-denied"
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentTenantRoutingModule { }
