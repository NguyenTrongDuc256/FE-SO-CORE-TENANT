import { SchoolYearListTenantComponent } from './components/school-year-list-tenant/school-year-list-tenant.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/_core/core.module';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { TranslocoModule, TRANSLOCO_SCOPE } from "@ngneat/transloco";
import { NgxPermissionsModule } from "ngx-permissions";
import { ModalFormEditSchoolYearComponent } from './modals/modal-form-edit-school-year/modal-form-edit-school-year.component';
import { ModalFormAddSchoolYearComponent } from './modals/modal-form-add-school-year/modal-form-add-school-year.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { ModalUpdateGradebookInputComponent } from './modals/modal-update-gradebook-input/modal-update-gradebook-input.component';
import { DetailSchoolYearTenantComponent } from './components/detail-school-year-teanant/detail-school-year-teanant.component';
import {SchoolYearTenantRoutingModule} from "./school-year-tenant-routing.module";

@NgModule({
  declarations: [
    SchoolYearListTenantComponent,
    ModalFormAddSchoolYearComponent,
    ModalFormEditSchoolYearComponent,
    ModalUpdateGradebookInputComponent,
    DetailSchoolYearTenantComponent
  ],
  imports: [
    CommonModule,
    SchoolYearTenantRoutingModule,
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
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: "school-year" }],
})
export class SchoolYearTenantModule { }
