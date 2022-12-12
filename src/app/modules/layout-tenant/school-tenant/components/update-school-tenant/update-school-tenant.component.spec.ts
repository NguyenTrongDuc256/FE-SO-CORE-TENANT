import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { CoreModule } from 'src/app/_core/core.module';
import { SchoolService } from 'src/app/_services/layout-tenant/school/school.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { GeneralService } from 'src/app/_services/general.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { environment } from 'src/environments/environment.firebase';
import { SchoolTenantModule } from '../../school-tenant.module';
import { UpdateSchoolTenantComponent } from './update-school-tenant.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getTranslocoModule } from 'src/app/transloco-testing.module';

describe('UpdateSchoolTenantComponent', () => {
  let component: UpdateSchoolTenantComponent;
  let fixture: ComponentFixture<UpdateSchoolTenantComponent>;
  const paramsSubject = new BehaviorSubject({});
  const fakeActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => 1,
      },
    },
    queryParams: { abc: 'testABC' },
    params: paramsSubject,
  };

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
      declarations: [UpdateSchoolTenantComponent],
      imports: [
        CommonModule,
        CoreModule,
        SchoolTenantModule,
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
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        ListenFirebaseService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSchoolTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create a form with controls', () => {
    expect(component.formSchool.contains('name')).toBeTruthy();
    expect(component.formSchool.contains('campus')).toBeTruthy();
    expect(component.formSchool.contains('trainingLevel')).toBeTruthy();
    expect(component.formSchool.contains('loaiHinhTruong')).toBeTruthy();
    expect(component.formSchool.contains('loaiTruong')).toBeTruthy();
    expect(component.formSchool.contains('chinhSachVung')).toBeTruthy();
    expect(component.formSchool.contains('cityCode')).toBeTruthy();
    expect(component.formSchool.contains('khuVuc')).toBeTruthy();
    expect(component.formSchool.contains('districtCode')).toBeTruthy();
    expect(component.formSchool.contains('wardCode')).toBeTruthy();
    expect(component.formSchool.contains('email')).toBeTruthy();
    expect(component.formSchool.contains('sendFromEmail')).toBeTruthy();
    expect(component.formSchool.contains('phone')).toBeTruthy();
    expect(component.formSchool.contains('hotline')).toBeTruthy();
    expect(component.formSchool.contains('fax')).toBeTruthy();
    expect(component.formSchool.contains('tenHieuTruong')).toBeTruthy();
    expect(component.formSchool.contains('emailHieuTruong')).toBeTruthy();
    expect(component.formSchool.contains('dienThoaiHieuTruong')).toBeTruthy();
    expect(component.formSchool.contains('indexOrder')).toBeTruthy();
    expect(component.formSchool.contains('namThanhLap')).toBeTruthy();
    expect(component.formSchool.contains('maDuAn')).toBeTruthy();
    expect(component.formSchool.contains('dienTich')).toBeTruthy();
    expect(component.formSchool.contains('mucChuanQuocGia')).toBeTruthy();
    expect(component.formSchool.contains('maVungKhoKhan')).toBeTruthy();
    expect(component.formSchool.contains('address')).toBeTruthy();

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
      name: 'Trường THCS An Viên',
      campus: '0000-90000-00000',
      trainingLevel: 4,
      loaiHinhTruong: '01',
      loaiTruong: '01',
      chinhSachVung: '01',
      cityCode: '',
      khuVuc: '02',
      districtCode: '',
      wardCode: '',
      email: 'anvien@gmail.com',
      sendFromEmail: 'anvien@gmail.com',
      phone: '0349810349',
      hotline: '0349810349',
      fax: '0349810349',
      dienThoaiHieuTruong: '0349810349',
      indexOrder: 1,
      namThanhLap: '1998',
      maDuAn: '01',
      dienTich: '2000',
      mucChuanQuocGia: '01',
      maVungKhoKhan: '01',
      address: 'Tiên Lữ-Hưng Yên',
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
    const control = component.formSchool.controls['name'];
    control.setValue(
      'When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided'
    );
    expect(control.invalid).toBeTruthy();
  });

  it('Should name invalid empty', () => {
    const control = component.formSchool.controls['name'];
    control.setValue('   ');
    expect(control.invalid).toBeTruthy();
  });

  it('Should name required', () => {
    const control = component.formSchool.controls['name'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should phone invalid regex', () => {
    const control = component.formSchool.controls['dienThoaiHieuTruong'];
    control.setValue('+33333432a');
    expect(control.invalid).toBeTruthy();
  });

  it('Should email invalid', () => {
    const control = component.formSchool.controls['email'];
    control.setValue('omt.com.vn');
    expect(control.invalid).toBeTruthy();
  });

  it('Should ten hieu truong invalid max length', () => {
    const control = component.formSchool.controls['tenHieuTruong'];
    control.setValue(
      'When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided'
    );
    expect(control.invalid).toBeTruthy();
  });

  it('Should campus invalid', () => {
    const control = component.formSchool.controls['campus'];
    let campus = null;
    control.setValue(campus);
    expect(control.invalid).toBeTruthy();
  });

  it('Should trainingLevel invalid', () => {
    const control = component.formSchool.controls['trainingLevel'];
    let trainingLevel = null;
    control.setValue(trainingLevel);
    expect(control.invalid).toBeTruthy();
  });

  it('Should sendFromEmail invalid', () => {
    const control = component.formSchool.controls['sendFromEmail'];
    control.setValue('omt.com.vn');
    expect(control.invalid).toBeTruthy();
  });

  it('Should phone invalid', () => {
    const control = component.formSchool.controls['phone'];
    control.setValue('+33333432a');
    expect(control.invalid).toBeTruthy();
  });

  it('Should hotline invalid', () => {
    const control = component.formSchool.controls['hotline'];
    control.setValue('+33333432a');
    expect(control.invalid).toBeTruthy();
  });

  it('Should fax invalid', () => {
    const control = component.formSchool.controls['fax'];
    control.setValue('+33333432a');
    expect(control.invalid).toBeTruthy();
  });

  it('Should email HT invalid', () => {
    const control = component.formSchool.controls['emailHieuTruong'];
    control.setValue('omt.com.vn');
    expect(control.invalid).toBeTruthy();
  });

  it('Should namThanhLap invalid', () => {
    const control = component.formSchool.controls['namThanhLap'];
    control.setValue(
      'When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided'
    );
    expect(control.invalid).toBeTruthy();
  });

  it('Should dienTich validate', () => {
    const control = component.formSchool.controls['dienTich'];
    control.setValue(
      'When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided'
    );
    expect(control.invalid).toBeTruthy();
  });

  it('Should address validate', () => {
    const control = component.formSchool.controls['address'];
    control.setValue(
      'When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided'
    );
    expect(control.invalid).toBeTruthy();
  });
});
