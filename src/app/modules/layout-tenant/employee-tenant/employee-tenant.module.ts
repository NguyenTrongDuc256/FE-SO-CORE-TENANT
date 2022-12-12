import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from 'src/app/_core/core.module';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzPopoverModule} from 'ng-zorro-antd/popover';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {TRANSLOCO_SCOPE, TranslocoModule} from "@ngneat/transloco";
import {NgxPermissionsModule} from "ngx-permissions";
import {NzInputModule} from "ng-zorro-antd/input";
import {EmployeeTenantRoutingModule} from "./employee-tenant-routing.module";
import {EmployeeListTenantComponent} from "./components/employee-list-tenant/employee-list-tenant.component";
import {EmployeeCreateTenantComponent} from "./components/employee-create-tenant/employee-create-tenant.component";
import {ModalDienBienLuongComponent} from './modals/modal-dien-bien-luong/modal-dien-bien-luong.component';
import {ModalDiemNgoaiNguComponent} from "./modals/modal-diem-ngoai-ngu/modal-diem-ngoai-ngu.component";
import {
  ModalQuaTrinhDaoTaoBoiDuongComponent
} from "./modals/modal-qua-trinh-dao-tao-boi-duong/modal-qua-trinh-dao-tao-boi-duong.component";
import {
  ModalDanhGiaChuanNgheNghiepComponent
} from "./modals/modal-danh-gia-chuan-nghe-nghiep/modal-danh-gia-chuan-nghe-nghiep.component";
import {ModalKhenThuongComponent} from "./modals/modal-khen-thuong/modal-khen-thuong.component";
import {ModalKyLuatComponent} from "./modals/modal-ky-luat/modal-ky-luat.component";
import {ModalQuanHeGiaDinhComponent} from "./modals/modal-quan-he-gia-dinh/modal-quan-he-gia-dinh.component";
import {
  ModalQuanHeGiaDinhVoChongComponent
} from "./modals/modal-quan-he-gia-dinh-vo-chong/modal-quan-he-gia-dinh-vo-chong.component";
import {ModalQuaTrinhCongTacComponent} from "./modals/modal-qua-trinh-cong-tac/modal-qua-trinh-cong-tac.component";
import {
  ModalSwitchEmployeeEditComponent
} from "./modals/modal-switch-employee-edit/modal-switch-employee-edit.component";
import {
  ModalImportEmployeeTenantComponent
} from "./modals/modal-import-employee-tenant/modal-import-employee-tenant.component";
import {
  ResultImportEmployeeTenantComponent
} from "./components/result-import-employee-tenant/result-import-employee-tenant.component";

@NgModule({
  declarations: [
    EmployeeListTenantComponent,
    EmployeeCreateTenantComponent,
    ModalDienBienLuongComponent,
    ModalDiemNgoaiNguComponent,
    ModalQuaTrinhDaoTaoBoiDuongComponent,
    ModalDanhGiaChuanNgheNghiepComponent,
    ModalKhenThuongComponent,
    ModalKyLuatComponent,
    ModalQuanHeGiaDinhComponent,
    ModalQuanHeGiaDinhVoChongComponent,
    ModalQuaTrinhCongTacComponent,
    ModalSwitchEmployeeEditComponent,
    ModalImportEmployeeTenantComponent,
    ResultImportEmployeeTenantComponent
  ],
  imports: [
    CommonModule,
    EmployeeTenantRoutingModule,
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
  ],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: "employee"}],
})
export class EmployeeTenantModule {
}
