import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentInfoStaffRoutingModule } from './student-info-staff-routing.module';
import { ProfileManagerStaffComponent } from './components/profile-manager-staff/profile-manager-staff.component';
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
import { ModalImportProfileStudentStaffComponent } from './modals/modal-import-profile-student-staff/modal-import-profile-student-staff.component';
import { StudentRecordListStaffComponent } from './components/student-record-list-staff/student-record-list-staff.component';
import {ModalFormRecordsStaffComponent} from "./modals/modal-form-records-staff/modal-form-records-staff.component";
import { ApproveProfileStudentStaffComponent } from './components/approve-profile-student-staff/approve-profile-student-staff.component';
import { ResultImportFileProfileStudentStaffComponent } from './components/result-import-file-profile-student-staff/result-import-file-profile-student-staff.component';


@NgModule({
  declarations: [
    ProfileManagerStaffComponent,
    ModalImportProfileStudentStaffComponent,
    StudentRecordListStaffComponent,
    ModalFormRecordsStaffComponent,
    ApproveProfileStudentStaffComponent,
    ResultImportFileProfileStudentStaffComponent
  ],
  imports: [
    CommonModule,
    StudentInfoStaffRoutingModule,
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
export class StudentInfoStaffModule { }
