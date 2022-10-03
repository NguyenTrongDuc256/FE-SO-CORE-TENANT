import { CoreModule } from 'src/app/_core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolTenantRoutingModule } from './school-tenant-routing.module';
import { ListSchoolTenantComponent } from './components/list-school-tenant/list-school-tenant.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzInputModule } from 'ng-zorro-antd/input';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { DetailSchoolTenantComponent } from './components/detail-school-tenant/detail-school-tenant.component';
import { DashboardControlComponent } from './components/dashboard-control/dashboard-control.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ListUserSchoolTenantComponent } from './components/list-user-school-tenant/list-user-school-tenant.component';
import { UpdateSchoolTenantComponent } from './components/update-school-tenant/update-school-tenant.component';
import { ModalUpdateUserSchoolTenantComponent } from './modals/modal-update-user-school-tenant/modal-update-user-school-tenant.component';
import { AssignRoleUserComponent } from './modals/assign-role-user/assign-role-user.component';
import { ModalListRoleUserComponent } from './modals/modal-list-role-user/modal-list-role-user.component';
import { DanhSachDiemTruongComponent } from './components/danh-sach-diem-truong/danh-sach-diem-truong.component';
import { ModalFormDiemTruongComponent } from './modals/modal-form-diem-truong/modal-form-diem-truong.component';
import { TabControlConfigComponent } from './components/tab-control-config/tab-control-config.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TabGradeSchoolTenantComponent } from './components/tab-grade-school-tenant/tab-grade-school-tenant.component';
import { TabSubjectSchoolTenantComponent } from './components/tab-subject-school-tenant/tab-subject-school-tenant.component';
import { ModalAssignSubjectComponent } from './modals/modal-assign-subject/modal-assign-subject.component';

@NgModule({
  declarations: [
    ListSchoolTenantComponent,
    DetailSchoolTenantComponent,
    DashboardControlComponent,
    UpdateSchoolTenantComponent,
    ListUserSchoolTenantComponent,
    ModalUpdateUserSchoolTenantComponent,
    AssignRoleUserComponent,
    ModalListRoleUserComponent,
    DanhSachDiemTruongComponent,
    ModalFormDiemTruongComponent,
    TabControlConfigComponent,
    TabGradeSchoolTenantComponent,
    TabSubjectSchoolTenantComponent,
    ModalAssignSubjectComponent,
  ],
  imports: [
    CommonModule,
    SchoolTenantRoutingModule,
    CoreModule,
    NzDropDownModule,
    NzInputModule,
    TranslocoModule,
    NzCollapseModule,
    NzCheckboxModule,
    NzTabsModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: "school" }],
})
export class SchoolTenantModule { }
