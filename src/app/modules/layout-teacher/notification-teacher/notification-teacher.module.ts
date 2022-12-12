import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationTeacherRoutingModule } from './notification-teacher-routing.module';
import { NotificationListSentTeacherComponent } from './components/notification-list-sent-teacher/notification-list-sent-teacher.component';
import { NotificationCreateTeacherComponent } from './components/notification-create-teacher/notification-create-teacher.component';
import { NotificationEditTeacherComponent } from './components/notification-edit-teacher/notification-edit-teacher.component';
import { NotificationReviewContentTeacherComponent } from './modals/notification-review-content-teacher/notification-review-content-teacher.component';
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
import { NotificationListReceivedTeacherComponent } from './components/notification-list-received-teacher/notification-list-received-teacher.component';
import { NotificationDetailSentTeacherComponent } from './components/notification-detail-sent-teacher/notification-detail-sent-teacher.component';
import { NotificationDetailReceivedTeacherComponent } from './components/notification-detail-received-teacher/notification-detail-received-teacher.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TabNotificationDetailSentTeacherComponent } from './tabs/tab-notification-detail-sent-teacher/tab-notification-detail-sent-teacher.component';
import { TabNotificationListSentTeacherComponent } from './tabs/tab-notification-list-sent-teacher/tab-notification-list-sent-teacher.component';

@NgModule({
  declarations: [
    NotificationListSentTeacherComponent,
    NotificationCreateTeacherComponent,
    NotificationEditTeacherComponent,
    NotificationReviewContentTeacherComponent,
    NotificationListReceivedTeacherComponent,
    NotificationDetailSentTeacherComponent,
    NotificationDetailReceivedTeacherComponent,
    TabNotificationDetailSentTeacherComponent,
    TabNotificationListSentTeacherComponent,
  ],
  exports: [
    TabNotificationDetailSentTeacherComponent,
    TabNotificationListSentTeacherComponent
  ],
  imports: [
    CommonModule,
    NotificationTeacherRoutingModule,
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
    NzTabsModule
  ]
})
export class NotificationTeacherModule { }
