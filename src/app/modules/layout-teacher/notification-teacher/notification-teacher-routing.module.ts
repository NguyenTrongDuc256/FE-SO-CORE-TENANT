import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  NotificationListSentTeacherComponent
} from "./components/notification-list-sent-teacher/notification-list-sent-teacher.component";
import {
  NotificationCreateTeacherComponent
} from "./components/notification-create-teacher/notification-create-teacher.component";
import {NgxPermissionsGuard} from "ngx-permissions";
import {DATA_PERMISSION} from "../../../_shared/utils/constant";
import {
  NotificationEditTeacherComponent
} from "./components/notification-edit-teacher/notification-edit-teacher.component";
import {
  NotificationListReceivedTeacherComponent
} from "./components/notification-list-received-teacher/notification-list-received-teacher.component";
import {
  NotificationDetailSentTeacherComponent
} from "./components/notification-detail-sent-teacher/notification-detail-sent-teacher.component";
import {
  NotificationDetailReceivedTeacherComponent
} from "./components/notification-detail-received-teacher/notification-detail-received-teacher.component";

const routes: Routes = [
  {path: 'sent', component: NotificationListSentTeacherComponent,
  canActivate: [NgxPermissionsGuard],
  data: {
    permissions: {
      only: [DATA_PERMISSION.announcement_view],
      redirectTo: "/access-denied"
    },
    },
  },
  {path: 'received', component: NotificationListReceivedTeacherComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.announcement_view],
        redirectTo: "/access-denied"
      },
    },
  },
  {path: 'create', component: NotificationCreateTeacherComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.announcement_view],
        redirectTo: "/access-denied"
      },
    },
  },
  {
    path: 'edit/:id',
    component: NotificationEditTeacherComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.announcement_view],
        redirectTo: "/access-denied"
      },
    },
  },
  {path: 'sent/detail/:id', component: NotificationDetailSentTeacherComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.announcement_view],
        redirectTo: "/access-denied"
      },
    },
  },
  {path: 'received/detail/:id', component: NotificationDetailReceivedTeacherComponent,
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
export class NotificationTeacherRoutingModule { }
