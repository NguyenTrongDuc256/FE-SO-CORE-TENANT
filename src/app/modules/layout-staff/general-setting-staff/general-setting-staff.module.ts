import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralSettingStaffRoutingModule } from './general-setting-staff-routing.module';
import { InfoSettingSchoolStaffComponent } from './info-setting-school-staff/info-setting-school-staff.component';
import {CoreModule} from "../../../_core/core.module";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzInputModule} from "ng-zorro-antd/input";
import {TranslocoModule} from "@ngneat/transloco";
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzTabsModule} from "ng-zorro-antd/tabs";


@NgModule({
  declarations: [
    InfoSettingSchoolStaffComponent
  ],
  imports: [
    CommonModule,
    GeneralSettingStaffRoutingModule,
    CoreModule,
    NzDropDownModule,
    NzInputModule,
    TranslocoModule,
    NzCollapseModule,
    NzCheckboxModule,
    NzTabsModule
  ]
})
export class GeneralSettingStaffModule { }
