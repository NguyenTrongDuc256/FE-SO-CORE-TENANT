import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {NgxPermissionsGuard} from "ngx-permissions";
import {DATA_PERMISSION} from "../../../_shared/utils/constant";

import {
  NotificationListParentComponent
} from "./components/notification-list-parent/notification-list-parent.component";

import {
  NotificationDetailParentComponent
} from "./components/notification-detail-parent/notification-detail-parent.component";

const routes: Routes = [
  {path: '', component: NotificationListParentComponent,
  canActivate: [NgxPermissionsGuard],
  data: {
    permissions: {
      only: [DATA_PERMISSION.announcement_view],
      redirectTo: "/access-denied"
    },
    },
  },
  {path: 'detail/:id', component: NotificationDetailParentComponent,
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
export class NotificationParentRoutingModule { }
