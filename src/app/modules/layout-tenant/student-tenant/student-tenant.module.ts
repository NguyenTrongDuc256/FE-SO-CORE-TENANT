import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from 'src/app/_core/core.module';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzPopoverModule} from 'ng-zorro-antd/popover';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {TranslocoModule, TRANSLOCO_SCOPE} from "@ngneat/transloco";
import {NgxPermissionsModule} from "ngx-permissions";
import {StudentTenantListComponent} from "./components/student-tenant-list/student-tenant-list.component";
import {StudentTenantRoutingModule} from "./student-tenant-routing.module";
import { CreateStudentTenantComponent } from './components/create-student-tenant/create-student-tenant.component';
import { UpdateUsernameCodeTenantComponent } from './modals/update-username-code-tenant/update-username-code-tenant.component';
import { StudentDetailTenantComponent } from './components/student-detail-tenant/student-detail-tenant.component';
import { TabStudentPersonInfoTenantComponent } from './tabs/tab-student-person-info-tenant/tab-student-person-info-tenant.component';
import { UpdateStudentTenantComponent } from './components/update-student-tenant/update-student-tenant.component';
import { ModalImportStudentTenantComponent } from './modals/modal-import-student-tenant/modal-import-student-tenant.component';
import { ResultImportFileStudentTenantComponent } from './components/result-import-file-student-tenant/result-import-file-student-tenant.component';

@NgModule({
  declarations: [
    StudentTenantListComponent,
    CreateStudentTenantComponent,
    UpdateUsernameCodeTenantComponent,
    StudentDetailTenantComponent,
    TabStudentPersonInfoTenantComponent,
    UpdateStudentTenantComponent,
    ModalImportStudentTenantComponent,
    ResultImportFileStudentTenantComponent,

  ],
  imports: [
    CommonModule,
    StudentTenantRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzPopoverModule,
    NzRadioModule,
    NzDropDownModule,
    NzSelectModule,
    TranslocoModule,
    NgxPermissionsModule.forChild()
  ],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: "student"}],
})
export class StudentModule {
}
