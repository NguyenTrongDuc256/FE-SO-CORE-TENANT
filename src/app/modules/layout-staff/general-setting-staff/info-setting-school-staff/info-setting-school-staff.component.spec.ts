import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSettingSchoolStaffComponent } from './info-setting-school-staff.component';
import {BehaviorSubject} from "rxjs";
import {CommonModule} from "@angular/common";

import {CoreModule} from "../../../../_core/core.module";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../../../environments/environment.firebase";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {getTranslocoModule} from "../../../../transloco-testing.module";
import {TRANSLOCO_SCOPE} from "@ngneat/transloco";
import {SchoolService} from "../../../../_services/layout-staff/school/school.service";
import {GeneralService} from "../../../../_services/general.service";
import {ListenFirebaseService} from "../../../../_services/listen-firebase.service";
import {GeneralSettingStaffRoutingModule} from "../general-setting-staff-routing.module";

describe('InfoSettingSchoolStaffComponent', () => {
  let component: InfoSettingSchoolStaffComponent;
  let fixture: ComponentFixture<InfoSettingSchoolStaffComponent>;

  const schoolServiceSpy = jasmine.createSpyObj('SchoolService', [
    'getAnotherInfoToMapSchool',
    'getDetail',
  ]);

  const generalServiceSpy = jasmine.createSpyObj('SchoolService', [
    'getListCity',
    'getListDistrict',
    'getListWard',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoSettingSchoolStaffComponent],
      imports: [
        CommonModule,
        GeneralSettingStaffRoutingModule,
        CoreModule,
        RouterModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        BrowserAnimationsModule,
        getTranslocoModule()
      ],
      providers: [
        { provide: TRANSLOCO_SCOPE, useValue: 'school' },
        { provide: SchoolService, useValue: schoolServiceSpy },
        { provide: GeneralService, useValue: generalServiceSpy },
        ListenFirebaseService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoSettingSchoolStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create a form with controls', () => {
    expect(component.formSchool.contains('Name')).toBeTruthy();
    expect(component.formSchool.contains('Campus')).toBeTruthy();
    expect(component.formSchool.contains('TrainingLevel')).toBeTruthy();
    expect(component.formSchool.contains('LoaiHinhTruong')).toBeTruthy();
    expect(component.formSchool.contains('LoaiTruong')).toBeTruthy();
    expect(component.formSchool.contains('ChinhSachVung')).toBeTruthy();
    expect(component.formSchool.contains('KhuVuc')).toBeTruthy();
    expect(component.formSchool.contains('Email')).toBeTruthy();
    expect(component.formSchool.contains('SendFromEmail')).toBeTruthy();
    expect(component.formSchool.contains('Phone')).toBeTruthy();
    expect(component.formSchool.contains('Hotline')).toBeTruthy();
    expect(component.formSchool.contains('Fax')).toBeTruthy();
    expect(component.formSchool.contains('TenHieuTruong')).toBeTruthy();
    expect(component.formSchool.contains('EmailHieuTruong')).toBeTruthy();
    expect(component.formSchool.contains('DienThoaiHieuTruong')).toBeTruthy();
    expect(component.formSchool.contains('IndexOrder')).toBeTruthy();
    expect(component.formSchool.contains('NamThanhLap')).toBeTruthy();
    expect(component.formSchool.contains('MaDuAn')).toBeTruthy();
    expect(component.formSchool.contains('DienTich')).toBeTruthy();
    expect(component.formSchool.contains('MucChuanQuocGia')).toBeTruthy();
    expect(component.formSchool.contains('MaVungKhoKhan')).toBeTruthy();

    expect(component.formSchool.contains('IsCoChiBoDang')).toBeTruthy();
    expect(component.formSchool.contains('IsTruongQuocTe')).toBeTruthy();
    expect(component.formSchool.contains('IsHocSinhKhuyetTat')).toBeTruthy();
    expect(component.formSchool.contains('IsHocSinhBanTru')).toBeTruthy();
    expect(component.formSchool.contains('IsKhiHauThienTai')).toBeTruthy();
    expect(component.formSchool.contains('IsKyNangSongGDXG')).toBeTruthy();
    expect(component.formSchool.contains('IsHocSinhNoiTru')).toBeTruthy();
    expect(component.formSchool.contains('IsVungDacBietKhoKhan')).toBeTruthy();
    expect(
      component.formSchool.contains('IsDatChatLuongToiThieu')
    ).toBeTruthy();
    expect(component.formSchool.contains('IsSuDungMayTinhDayHoc')).toBeTruthy();
    expect(
      component.formSchool.contains('IsKhaiThacInternetDayHoc')
    ).toBeTruthy();
    expect(component.formSchool.contains('IsDienLuoi')).toBeTruthy();
    expect(component.formSchool.contains('IsCongTrinhVeSinh')).toBeTruthy();
    expect(component.formSchool.contains('IsCtGdvsDoiTay')).toBeTruthy();
    expect(
      component.formSchool.contains('IsChuongTrinhGiaoDucCoBan')
    ).toBeTruthy();
    expect(
      component.formSchool.contains('IsCoHaTangTlhtPhuHopHskt')
    ).toBeTruthy();
    expect(
      component.formSchool.contains('IsCongTacTuVanHocDuong')
    ).toBeTruthy();
    expect(component.formSchool.contains('IsChuyenBietKhuyetTat')).toBeTruthy();
    expect(component.formSchool.contains('IsCoNuocUong')).toBeTruthy();
    expect(
      component.formSchool.contains('IsHocChuongTrinhSongNgu')
    ).toBeTruthy();
    expect(component.formSchool.contains('IsActive')).toBeTruthy();
  });

  it('Should form valid', () => {
    const form = component.formSchool;
    form.patchValue({
      Name: 'Trường THCS An Viên',
      Campus: '0000-90000-00000',
      TrainingLevel: 4,
      LoaiHinhTruong: '01',
      LoaiTruong: '01',
      ChinhSachVung: '01',
      KhuVuc: '02',
      Email: 'anvien@gmail.com',
      SendFromEmail: 'anvien@gmail.com',
      Phone: '0349810349',
      Hotline: '0349810349',
      Fax: '0349810349',
      DienThoaiHieuTruong: '0349810349',
      IndexOrder: 1,
      NamThanhLap: '1998',
      MaDuAn: '01',
      DienTich: '2000',
      MucChuanQuocGia: '01',
      MaVungKhoKhan: '01',
      IsCoChiBoDang: '1',
      IsTruongQuocTe: '0',
      IsHocSinhKhuyetTat: '0',
      IsHocSinhBanTru: '0',
      IsKhiHauThienTai: '0',
      IsKyNangSongGDXG: '1',
      IsHocSinhNoiTru: '0',
      IsVungDacBietKhoKhan: '0',
      IsDatChatLuongToiThieu: '1',
      IsSuDungMayTinhDayHoc: '1',
      IsKhaiThacInternetDayHoc: '1',
      IsDienLuoi: '1',
      IsCongTrinhVeSinh: '1',
      IsCtGdvsDoiTay: '1',
      IsChuongTrinhGiaoDucCoBan: '1',
      IsCoHaTangTlhtPhuHopHskt: '1',
      IsCongTacTuVanHocDuong: '1',
      IsChuyenBietKhuyetTat: '0',
      IsCoNuocUong: '1',
      IsHocChuongTrinhSongNgu: '0',
      IsActive: 1,
    });
    expect(form.valid).toBeTrue();
  });

  it('Should name invalid max length', () => {
    const control = component.formSchool.controls['Name'];
    control.setValue('When a user clicks the button, the profileForm model is  When a user clicks the button, the profileForm model is  When a user clicks the button, the profileForm model is When a user clicks the button, the profileForm model is When a user clicks the button, the profileForm model is');
    expect(control.invalid).toBeTruthy();
  });

  it('Should name invalid empty', () => {
    const control = component.formSchool.controls['Name'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should phone invalid regex', () => {
    const control = component.formSchool.controls['DienThoaiHieuTruong'];
    control.setValue('09149á');
    expect(control.invalid).toBeTruthy();
  });

  it('Should email invalid', () => {
    const control = component.formSchool.controls['Email'];
    control.setValue('omt.com.vn');
    expect(control.invalid).toBeTruthy();
  });

  it('Should ten hieu truong invalid max length', () => {
    const control = component.formSchool.controls['TenHieuTruong'];
    control.setValue(
      'When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided'
    );
    expect(control.invalid).toBeTruthy();
  });

  it('Should campus invalid', () => {
    const control = component.formSchool.controls['Campus'];
    let campus = '';
    control.setValue(campus);
    expect(control.invalid).toBeTruthy();
  });

  it('Should sendFromEmail invalid', () => {
    const control = component.formSchool.controls['SendFromEmail'];
    control.setValue('omt.com.vn');
    expect(control.invalid).toBeTruthy();
  });

  it('Should phone invalid', () => {
    const control = component.formSchool.controls['Phone'];
    control.setValue('09149á');
    expect(control.invalid).toBeTruthy();
  });

  it('Should hotline invalid', () => {
    const control = component.formSchool.controls['Hotline'];
    control.setValue('09149á');
    expect(control.invalid).toBeTruthy();
  });

  it('Should fax invalid', () => {
    const control = component.formSchool.controls['Fax'];
    control.setValue('09149á');
    expect(control.invalid).toBeTruthy();
  });

  it('Should email HT invalid', () => {
    const control = component.formSchool.controls['EmailHieuTruong'];
    control.setValue('omt.com.vn');
    expect(control.invalid).toBeTruthy();
  });

  it('Should namThanhLap invalid', () => {
    const control = component.formSchool.controls['NamThanhLap'];
    control.setValue(
      'When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided'
    );
    expect(control.invalid).toBeTruthy();
  });

  it('Should dienTich validate', () => {
    const control = component.formSchool.controls['DienTich'];
    control.setValue(
      'When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided'
    );
    expect(control.invalid).toBeTruthy();
  });

});
