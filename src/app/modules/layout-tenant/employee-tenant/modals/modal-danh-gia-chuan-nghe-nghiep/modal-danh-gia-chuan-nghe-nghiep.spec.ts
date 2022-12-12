import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ModalDanhGiaChuanNgheNghiepComponent} from "./modal-danh-gia-chuan-nghe-nghiep.component";
import {EmployeeTenantModule} from "../../employee-tenant.module";
import {EmployeeTenantRoutingModule} from "../../employee-tenant-routing.module";
import {RouterTestingModule} from "@angular/router/testing";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../../../../environments/environment.firebase";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {TranslocoModule} from "@ngneat/transloco";
import {getTranslocoModule} from "../../../../../transloco-testing.module";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CoreModule} from "../../../../../_core/core.module";
import {RoleTenantModule} from "../../../role-tenant/role-tenant.module";
import {FormArray} from "@angular/forms";


describe('ModalDanhGiaChuanNgheNghiepComponent', () => {
  let component: ModalDanhGiaChuanNgheNghiepComponent;
  let fixture: ComponentFixture<ModalDanhGiaChuanNgheNghiepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDanhGiaChuanNgheNghiepComponent ],
      imports: [
        EmployeeTenantModule,
        EmployeeTenantRoutingModule,
        RouterTestingModule,
        CoreModule,
        RoleTenantModule,
        getTranslocoModule(),
        TranslocoModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule

      ],
      providers: [
        NgbActiveModal,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDanhGiaChuanNgheNghiepComponent);
    component = fixture.componentInstance;
    component.dataModal = {
      dataFromParent: {},
      duLieuDanhGiaChuanNgheNghiep: [],
      tieuChiDanhGiaNhanSu: [],
      nhomChucVu: {},
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create a form with controls', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component.formGroup.contains('danhGiaChuanNgheNghiep')).toBeTruthy();
  });

  it('Should make the form array', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const data = {
      indexOrder: 1,
      code: '03',
      name:"Đạo đức nhà giáo",
      tuDanhGia: "01"
    }
    component.themDanhGiaChuanNgheNghiep(data);
    const control = component.formGroup.controls['danhGiaChuanNgheNghiep'] as FormArray;
    control.at(0).get('indexOrder')?.setValue(1);
    control.at(0).get('code')?.setValue("code");
    control.at(0).get('name')?.setValue("name");
    control.at(0).get('tuDanhGia')?.setValue("01");
    control.at(0).get('capTrenDanhGia')?.setValue("02");
    expect(control.invalid).toBeFalsy();
  });
});
