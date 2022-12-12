import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentStaffRoutingModule } from './parent-staff-routing.module';
import { ParentCreateStaffComponent } from './components/parent-create-staff/parent-create-staff.component';
import { ParentDetailStaffComponent } from './components/parent-detail-staff/parent-detail-staff.component';
import { ParentEditStaffComponent } from './components/parent-edit-staff/parent-edit-staff.component';
import { ParentListStaffComponent } from './components/parent-list-staff/parent-list-staff.component';
import { ModalUpdateStatusComponent } from './modals/modal-update-status/modal-update-status.component';
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
import {
  ResultImportParentStaffComponent
} from "./components/result-import-parent-staff/result-import-parent-staff.component";
import {ModalImportParentStaffComponent} from "./modals/modal-import-parent-staff/modal-import-parent-staff.component";


@NgModule({
  declarations: [
    ParentCreateStaffComponent,
    ParentDetailStaffComponent,
    ParentEditStaffComponent,
    ParentListStaffComponent,
    ModalUpdateStatusComponent,
    ResultImportParentStaffComponent,
    ModalImportParentStaffComponent
  ],
  imports: [
    CommonModule,
    ParentStaffRoutingModule,
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
export class ParentStaffModule { }
