import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationStudentRoutingModule } from './notification-student-routing.module';
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
import { NotificationListStudentComponent } from './components/notification-list-student/notification-list-student.component';
import { NotificationDetailStudentComponent } from './components/notification-detail-student/notification-detail-student.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@NgModule({
  declarations: [
    NotificationListStudentComponent,
    NotificationDetailStudentComponent,
  ],
  imports: [
    CommonModule,
    NotificationStudentRoutingModule,
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
export class NotificationStudentModule { }
