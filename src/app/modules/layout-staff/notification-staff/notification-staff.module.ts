import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationStaffRoutingModule } from './notification-staff-routing.module';
import { NotificationListSentStaffComponent } from './components/notification-list-sent-staff/notification-list-sent-staff.component';
import { NotificationCreateStaffComponent } from './components/notification-create-staff/notification-create-staff.component';
import { NotificationEditStaffComponent } from './components/notification-edit-staff/notification-edit-staff.component';
import { NotificationReviewContentStaffComponent } from './modals/notification-review-content-staff/notification-review-content-staff.component';
import {CoreModule} from "../../../_core/core.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzPopoverModule} from "ng-zorro-antd/popover";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzSelectModule} from "ng-zorro-antd/select";
import {TranslocoModule} from "@ngneat/transloco";
import {NzInputModule} from "ng-zorro-antd/input";
import {NgxPermissionsModule} from "ngx-permissions";
import { NotificationListReceivedStaffComponent } from './components/notification-list-received-staff/notification-list-received-staff.component';
import { NotificationDetailSentStaffComponent } from './components/notification-detail-sent-staff/notification-detail-sent-staff.component';
import { NotificationDetailReceivedStaffComponent } from './components/notification-detail-received-staff/notification-detail-received-staff.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TabNotificationDetailSentStaffComponent } from './tabs/tab-notification-detail-sent-staff/tab-notification-detail-sent-staff.component';
import { TabNotificationListSentStaffComponent } from './tabs/tab-notification-list-sent-staff/tab-notification-list-sent-staff.component';
import { NotificationInSchoolComponent } from './components/notification-in-school/notification-in-school.component';

@NgModule({
  declarations: [
    NotificationListSentStaffComponent,
    NotificationCreateStaffComponent,
    NotificationEditStaffComponent,
    NotificationReviewContentStaffComponent,
    NotificationListReceivedStaffComponent,
    NotificationDetailSentStaffComponent,
    NotificationDetailReceivedStaffComponent,
    TabNotificationDetailSentStaffComponent,
    TabNotificationListSentStaffComponent,
    NotificationInSchoolComponent,
  ],
  exports: [
    TabNotificationDetailSentStaffComponent,
    TabNotificationListSentStaffComponent
  ],
  imports: [
    CommonModule,
    NotificationStaffRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzPopoverModule,
    NzRadioModule,
    NzDropDownModule,
    NzSelectModule,
    TranslocoModule,
    NzInputModule,
    NgxPermissionsModule.forChild(),
    NzTabsModule,
  ]
})
export class NotificationStaffModule { }
