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
import {EmployeeStaffRoutingModule} from "./employee-staff-routing.module";
import {EmployeeListStaffComponent} from "./components/employee-list-staff/employee-list-staff.component";
import {EmployeeCreateStaffComponent} from "./components/employee-create-staff/employee-create-staff.component";
import {
  ModalDanhGiaChuanNgheNghiepStaffComponent
} from "./modals/modal-danh-gia-chuan-nghe-nghiep-staff/modal-danh-gia-chuan-nghe-nghiep-staff.component";
import {
  ModalDiemNgoaiNguStaffComponent
} from "./modals/modal-diem-ngoai-ngu-staff/modal-diem-ngoai-ngu-staff.component";
import {
  ModalDienBienLuongStaffComponent
} from "./modals/modal-dien-bien-luong-staff/modal-dien-bien-luong-staff.component";
import {ModalKhenThuongStaffComponent} from "./modals/modal-khen-thuong-staff/modal-khen-thuong-staff.component";
import {ModalKyLuatStaffComponent} from "./modals/modal-ky-luat-staff/modal-ky-luat-staff.component";
import {
  ModalQuaTrinhCongTacStaffComponent
} from "./modals/modal-qua-trinh-cong-tac-staff/modal-qua-trinh-cong-tac-staff.component";
import {
  ModalQuaTrinhDaoTaoBoiDuongStaffComponent
} from "./modals/modal-qua-trinh-dao-tao-boi-duong-staff/modal-qua-trinh-dao-tao-boi-duong-staff.component";
import {
  ModalQuanHeGiaDinhStaffComponent
} from "./modals/modal-quan-he-gia-dinh-staff/modal-quan-he-gia-dinh-staff.component";
import {
  ModalQuanHeGiaDinhVoChongStaffComponent
} from "./modals/modal-quan-he-gia-dinh-vo-chong-staff/modal-quan-he-gia-dinh-vo-chong-staff.component";
import { ModalImportEmployeeStaffComponent } from './modals/modal-import-employee-staff/modal-import-employee-staff.component';
import { ResultImportEmployeeStaffComponent } from './components/result-import-employee-staff/result-import-employee-staff.component';

@NgModule({
  declarations: [
    EmployeeListStaffComponent,
    EmployeeCreateStaffComponent,
    ModalDanhGiaChuanNgheNghiepStaffComponent,
    ModalDiemNgoaiNguStaffComponent,
    ModalDienBienLuongStaffComponent,
    ModalKhenThuongStaffComponent,
    ModalKyLuatStaffComponent,
    ModalQuaTrinhCongTacStaffComponent,
    ModalQuaTrinhDaoTaoBoiDuongStaffComponent,
    ModalQuanHeGiaDinhStaffComponent,
    ModalQuanHeGiaDinhVoChongStaffComponent,
    ModalImportEmployeeStaffComponent,
    ResultImportEmployeeStaffComponent
  ],
  imports: [
    CommonModule,
    EmployeeStaffRoutingModule,
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
export class EmployeeStaffModule {
}
