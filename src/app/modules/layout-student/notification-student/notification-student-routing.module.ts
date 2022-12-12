import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {NgxPermissionsGuard} from "ngx-permissions";
import {DATA_PERMISSION} from "../../../_shared/utils/constant";

import {
  NotificationListStudentComponent
} from "./components/notification-list-student/notification-list-student.component";

import {
  NotificationDetailStudentComponent
} from "./components/notification-detail-student/notification-detail-student.component";

const routes: Routes = [
  {path: '', component: NotificationListStudentComponent,
  canActivate: [NgxPermissionsGuard],
  data: {
    permissions: {
      only: [DATA_PERMISSION.announcement_view],
      redirectTo: "/access-denied"
    },
    },
  },
  {path: 'detail/:id', component: NotificationDetailStudentComponent,
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
export class NotificationStudentRoutingModule { }
