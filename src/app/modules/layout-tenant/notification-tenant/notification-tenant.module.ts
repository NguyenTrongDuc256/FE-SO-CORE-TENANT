import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationTenantRoutingModule } from './notification-tenant-routing.module';
import { NotificationListTenantComponent } from './components/notification-list-tenant/notification-list-tenant.component';
import { NotificationCreateTenantComponent } from './components/notification-create-tenant/notification-create-tenant.component';
import { NotificationEditTenantComponent } from './components/notification-edit-tenant/notification-edit-tenant.component';
import { NotificationDetailTenantComponent } from './components/notification-detail-tenant/notification-detail-tenant.component';
import { NotificationReviewContentTenantComponent } from './modals/notification-review-content-tenant/notification-review-content-tenant.component';
import {CoreModule} from "../../../_core/core.module";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {ReactiveFormsModule} from "@angular/forms";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzPopoverModule} from "ng-zorro-antd/popover";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzSelectModule} from "ng-zorro-antd/select";
import {TranslocoModule} from "@ngneat/transloco";
import {NzInputModule} from "ng-zorro-antd/input";
import {NgxPermissionsModule} from "ngx-permissions";
import {
  TabNotificationDetailSentTenantComponent
} from "./tabs/tab-notification-detail-sent-tenant/tab-notification-detail-sent-tenant.component";
import {
  TabNotificationListSentTenantComponent
} from "./tabs/tab-notification-list-sent-tenant/tab-notification-list-sent-tenant.component";
import {NzTabsModule} from "ng-zorro-antd/tabs";


@NgModule({
  declarations: [
    NotificationListTenantComponent,
    NotificationCreateTenantComponent,
    NotificationEditTenantComponent,
    NotificationDetailTenantComponent,
    NotificationReviewContentTenantComponent,
    TabNotificationDetailSentTenantComponent,
    TabNotificationListSentTenantComponent
  ],
  imports: [
    CommonModule,
    NotificationTenantRoutingModule,
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
export class NotificationTenantModule { }
