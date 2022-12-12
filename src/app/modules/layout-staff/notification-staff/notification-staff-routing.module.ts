import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  NotificationListSentStaffComponent
} from "./components/notification-list-sent-staff/notification-list-sent-staff.component";
import {
  NotificationCreateStaffComponent
} from "./components/notification-create-staff/notification-create-staff.component";
import {NgxPermissionsGuard} from "ngx-permissions";
import {DATA_PERMISSION} from "../../../_shared/utils/constant";
import {
  NotificationEditStaffComponent
} from "./components/notification-edit-staff/notification-edit-staff.component";
import {
  NotificationListReceivedStaffComponent
} from "./components/notification-list-received-staff/notification-list-received-staff.component";
import {
  NotificationDetailSentStaffComponent
} from "./components/notification-detail-sent-staff/notification-detail-sent-staff.component";
import {
  NotificationDetailReceivedStaffComponent
} from "./components/notification-detail-received-staff/notification-detail-received-staff.component";
import { NotificationInSchoolComponent } from './components/notification-in-school/notification-in-school.component';

const routes: Routes = [
  {path: 'sent', component: NotificationListSentStaffComponent,
  canActivate: [NgxPermissionsGuard],
  data: {
    permissions: {
      only: [DATA_PERMISSION.announcement_view],
      redirectTo: "/access-denied"
    },
    },
  },
  {path: 'received', component: NotificationListReceivedStaffComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.announcement_view],
        redirectTo: "/access-denied"
      },
    },
  },
  {path: 'create', component: NotificationCreateStaffComponent,
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
    component: NotificationEditStaffComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.announcement_view],
        redirectTo: "/access-denied"
      },
    },
  },
  // detail-received
  // detail-sent
  {path: 'sent/detail/:id', component: NotificationDetailSentStaffComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.announcement_view],
        redirectTo: "/access-denied"
      },
    },
  },
  {path: 'received/detail/:id', component: NotificationDetailReceivedStaffComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.announcement_view],
        redirectTo: "/access-denied"
      },
    },
  },
  {
    path: 'school',
    component: NotificationInSchoolComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.announcement_school_manager],
        redirectTo: "/access-denied"
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationStaffRoutingModule { }
