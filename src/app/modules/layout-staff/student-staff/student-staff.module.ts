import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentStaffRoutingModule } from './student-staff-routing.module';
import { CoreModule } from 'src/app/_core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { NgxPermissionsModule } from 'ngx-permissions';
import { StudentStaffListComponent } from './components/student-staff-list/student-staff-list.component';
import { TabStudentPersonInfoStaffComponent } from './tabs/tab-student-person-info-staff/tab-student-person-info-staff.component';
import { StudentRecordsListComponent } from './tabs/student-records-list/student-records-list.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { StudentDetailStaffComponent } from './components/student-detail-staff/student-detail-staff.component';
import { ModalRefuseRecordsComponent } from './modals/modal-refuse-records/modal-refuse-records.component';
import { ModalFormRecordsStaffComponent } from './modals/modal-form-records-staff/modal-form-records-staff.component';
import { CreateStudentStaffComponent } from './components/create-student-staff/create-student-staff.component';
import { UpdateStudentStaffComponent } from './components/update-student-staff/update-student-staff.component';
import { ModalImportStudentStaffComponent } from './modals/modal-import-student-staff/modal-import-student-staff.component';
import { ResultImportFileStudentStaffComponent } from './components/result-import-file-student-staff/result-import-file-student-staff.component';
import { UpdateUsernameCodeTenantComponent } from './modals/update-username-code-tenant/update-username-code-tenant.component';


@NgModule({
  declarations: [
    StudentStaffListComponent,
    StudentDetailStaffComponent,
    TabStudentPersonInfoStaffComponent,
    StudentRecordsListComponent,
    ModalRefuseRecordsComponent,
    ModalFormRecordsStaffComponent,
    CreateStudentStaffComponent,
    UpdateStudentStaffComponent,
    ModalImportStudentStaffComponent,
    ResultImportFileStudentStaffComponent,
    UpdateUsernameCodeTenantComponent
  ],
  imports: [
    CommonModule,
    StudentStaffRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzPopoverModule,
    NzRadioModule,
    NzDropDownModule,
    NzSelectModule,
    TranslocoModule,
    NgxPermissionsModule.forChild(),
    NzInputModule

  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: ["student", 'student-records'] }],

})
export class StudentStaffModule { }
