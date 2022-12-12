import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SettingTenantRoutingModule} from './setting-tenant-routing.module';
import {SettingIndexTenantComponent} from './components/setting-index-tenant/setting-index-tenant.component';
import {CoreModule} from "../../../_core/core.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzPopoverModule} from "ng-zorro-antd/popover";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzSelectModule} from "ng-zorro-antd/select";
import {TRANSLOCO_SCOPE, TranslocoModule} from "@ngneat/transloco";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NgxPermissionsModule} from "ngx-permissions";
import {InfoTenantComponent} from './tabs/info-tenant/info-tenant.component';
import {UpdateTenantComponent} from "./tabs/update-tenant/update-tenant.component";
import { TabAttendanceConfigComponent } from './tabs/tab-attendance-config/tab-attendance-config.component';
import { TabAttendanceDeviceConfigComponent } from './tabs/tab-attendance-device-config/tab-attendance-device-config.component';
import { TabConfigTenantComponent } from './tabs/tab-config-tenant/tab-config-tenant.component';
import { TabConfigLoginTenantComponent } from './tabs/tab-config-login-tenant/tab-config-login-tenant.component';
import { TabConfigStudyTimeTenantComponent } from './tabs/tab-config-study-time-tenant/tab-config-study-time-tenant.component';
import { TabConfigNotificationSendTenantComponent } from './tabs/tab-config-notification-send-tenant/tab-config-notification-send-tenant.component';
import { TabUpdateConfigSendNotificationTenantComponent } from './tabs/tab-update-config-send-notification-tenant/tab-update-config-send-notification-tenant.component';


@NgModule({
  declarations: [
    SettingIndexTenantComponent,
    InfoTenantComponent,
    UpdateTenantComponent,
    TabAttendanceConfigComponent,
    TabAttendanceDeviceConfigComponent,
    TabConfigTenantComponent,
    TabConfigLoginTenantComponent,
    TabConfigStudyTimeTenantComponent,
    TabConfigNotificationSendTenantComponent,
    TabUpdateConfigSendNotificationTenantComponent
  ],
  imports: [
    CommonModule,
    SettingTenantRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzPopoverModule,
    NzRadioModule,
    NzDropDownModule,
    NzSelectModule,
    TranslocoModule,
    NzSwitchModule,
    NgxPermissionsModule.forChild()
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: "setting" }],
})
export class SettingTenantModule { }
