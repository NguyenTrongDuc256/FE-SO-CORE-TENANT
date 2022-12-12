import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  NotificationListTenantComponent
} from "./components/notification-list-tenant/notification-list-tenant.component";
import {
  NotificationCreateTenantComponent
} from "./components/notification-create-tenant/notification-create-tenant.component";
import {ParentEditTenantComponent} from "../parent-tenant/components/parent-edit-tenant/parent-edit-tenant.component";
import {NgxPermissionsGuard} from "ngx-permissions";
import {DATA_PERMISSION} from "../../../_shared/utils/constant";
import {
  NotificationEditTenantComponent
} from "./components/notification-edit-tenant/notification-edit-tenant.component";
import {
  NotificationDetailTenantComponent
} from "./components/notification-detail-tenant/notification-detail-tenant.component";

const routes: Routes = [
  {path: '', component: NotificationListTenantComponent,
  canActivate: [NgxPermissionsGuard],
  data: {
    permissions: {
      only: [DATA_PERMISSION.announcement_view],
      redirectTo: "/access-denied"
    },
  },
  },
  {path: 'create', component: NotificationCreateTenantComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.announcement_modify],
        redirectTo: "/access-denied"
      },
    },
  },
  {
    path: 'edit/:id',
    component: NotificationEditTenantComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.announcement_modify],
        redirectTo: "/access-denied"
      },
    },
  },
  {path: 'detail/:id', component: NotificationDetailTenantComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.announcement_view],
        redirectTo: "/access-denied"
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationTenantRoutingModule { }
