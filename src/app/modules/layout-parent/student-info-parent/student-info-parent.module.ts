import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentInfoParentRoutingModule } from './student-info-parent-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzPopoverModule} from "ng-zorro-antd/popover";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzSelectModule} from "ng-zorro-antd/select";
import {TranslocoModule} from "@ngneat/transloco";
import {NzInputModule} from "ng-zorro-antd/input";
import {NgxPermissionsModule} from "ngx-permissions";
import {CoreModule} from "../../../_core/core.module";
import { StudentRecordListParentComponent } from './components/student-record-list-parent/student-record-list-parent.component';
import {ModalFormRecordsParentComponent} from "./modals/modal-form-records-parent/modal-form-records-parent.component";


@NgModule({
  declarations: [
    StudentRecordListParentComponent,
    ModalFormRecordsParentComponent,
  ],
  imports: [
    CommonModule,
    StudentInfoParentRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzPopoverModule,
    NzRadioModule,
    NzDropDownModule,
    NzSelectModule,
    TranslocoModule,
    NzInputModule,
    NgxPermissionsModule.forChild()
  ]
})
export class StudentInfoParentModule { }
