import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { HomeroomClassModule } from './../../homeroom-class.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { TrainingService } from 'src/app/_services/layout-staff/training/training.service';

import { FormHomeroomClassComponent } from './form-homeroom-class.component';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.firebase';
import { RouterTestingModule } from '@angular/router/testing';
import { SchoolService } from 'src/app/_services/layout-staff/school/school.service';
import { Validators } from '@angular/forms';
import { ValidatorNotNull } from 'src/app/_services/validator-custom.service';
import { CoreModule } from 'src/app/_core/core.module';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

describe('FormHomeroomClassComponent', () => {
  let component: FormHomeroomClassComponent;
  let fixture: ComponentFixture<FormHomeroomClassComponent>;
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

  const trainingServiceSpy = jasmine.createSpyObj('TrainingService', [
    'getAnotherInfoToMapHomeroomClass',
    'getListCompoundClass',
    'getListTeacher',
    'getDetailHomeroomClass',
    'getListParent',
    'getListStudentHomeroomClass'
  ]);

  const schoolServiceSpy = jasmine.createSpyObj('SchoolService', [
    'danhSachDiemTruong'
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormHomeroomClassComponent],
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        getTranslocoModule(),
        CoreModule,
        CommonModule,
        NzSelectModule,
        NzCheckboxModule
      ],
      providers: [
        { provide: TrainingService, useValue: trainingServiceSpy },
        { provide: SchoolService, useValue: schoolServiceSpy },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHomeroomClassComponent);
    trainingServiceSpy.getAnotherInfoToMapHomeroomClass.and.returnValue(of());
    trainingServiceSpy.getDetailHomeroomClass.and.returnValue(of());
    trainingServiceSpy.getListCompoundClass.and.returnValue(of());
    schoolServiceSpy.danhSachDiemTruong.and.returnValue(of());
    trainingServiceSpy.getListTeacher.and.returnValue(of());
    trainingServiceSpy.getListParent.and.returnValue(of());
    trainingServiceSpy.getListStudentHomeroomClass.and.returnValue(of());
    component = fixture.componentInstance;
    component.isLoading = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('Should create a form create with controls', () => {
    component.nameForm = 'create';
    component.isLoading = false;
    fixture.detectChanges();
    expect(component.formSubmit.contains('Name')).toBeTruthy();
    expect(component.formSubmit.contains('Code')).toBeTruthy();
    expect(component.formSubmit.contains('GradeId')).toBeTruthy();
    expect(component.formSubmit.contains('SoBuoiHocTrenTuan')).toBeTruthy();
    expect(component.formSubmit.contains('DiemTruong')).toBeTruthy();
    expect(component.formSubmit.contains('HomeroomTeacherId')).toBeTruthy();
    expect(component.formSubmit.contains('IndexOrder')).toBeTruthy();
    expect(component.formSubmit.contains('GhepVaoLop')).toBeTruthy();
    expect(component.formSubmit.contains('SachGiaoKhoa')).toBeTruthy();
    expect(component.formSubmit.contains('SoTietHocTrenTuan')).toBeTruthy();
    expect(component.formSubmit.contains('SoTietNN1')).toBeTruthy();
    expect(component.formSubmit.contains('SoTietNN2')).toBeTruthy();
    expect(component.formSubmit.contains('ChuongTrinhNN1')).toBeTruthy();
    expect(component.formSubmit.contains('ChuongTrinhNN2')).toBeTruthy();
    expect(component.formSubmit.contains('MaDanhMucNgoaiNgu1')).toBeTruthy();
    expect(component.formSubmit.contains('MaDanhMucNgoaiNgu2')).toBeTruthy();
    expect(component.formSubmit.contains('IsFreeDom')).toBeTruthy();
    expect(component.formSubmit.contains('HocBanTru')).toBeTruthy();
    expect(component.formSubmit.contains('IsVNEN')).toBeTruthy();
    expect(component.formSubmit.contains('IsTBDHTiengViet')).toBeTruthy();
    expect(component.formSubmit.contains('IsTBDHToan')).toBeTruthy();
    expect(component.formSubmit.contains('IsDaiDienChaMeLop')).toBeTruthy();
    expect(component.formSubmit.contains('IsDaiDienChaMeTruong')).toBeTruthy();
    expect(component.formSubmit.contains('IsGiaiThe')).toBeTruthy();
    expect(component.formSubmit.contains('IsBanTru')).toBeTruthy();
    expect(component.formSubmit.contains('IsBoTucTieuHoc')).toBeTruthy();
    expect(component.formSubmit.contains('IsCapNhatLopGhep')).toBeTruthy();
    expect(component.formSubmit.contains('Is2BuoiNgay')).toBeTruthy();
    expect(component.formSubmit.contains('IsLopGhep')).toBeTruthy();
    expect(component.formSubmit.contains('IsBilingual')).toBeTruthy();
    expect(component.formSubmit.contains('IsHocNghe')).toBeTruthy();
    expect(component.formSubmit.contains('IsChuyenBiet')).toBeTruthy();
    expect(component.formSubmit.contains('IsActive')).toBeTruthy();
  });

  it('Should create a form update with controls', () => {
    component.nameForm = 'update';
    component.isLoading = false;
    fixture.detectChanges();
    expect(component.formSubmit.contains('Name')).toBeTruthy();
    expect(component.formSubmit.contains('Code')).toBeTruthy();
    expect(component.formSubmit.contains('GradeId')).toBeTruthy();
    expect(component.formSubmit.contains('SoBuoiHocTrenTuan')).toBeTruthy();
    expect(component.formSubmit.contains('DiemTruong')).toBeTruthy();
    expect(component.formSubmit.contains('HomeroomTeacherId')).toBeTruthy();
    expect(component.formSubmit.contains('IndexOrder')).toBeTruthy();
    expect(component.formSubmit.contains('GhepVaoLop')).toBeTruthy();
    expect(component.formSubmit.contains('SachGiaoKhoa')).toBeTruthy();
    expect(component.formSubmit.contains('SoTietHocTrenTuan')).toBeTruthy();
    expect(component.formSubmit.contains('SoTietNN1')).toBeTruthy();
    expect(component.formSubmit.contains('SoTietNN2')).toBeTruthy();
    expect(component.formSubmit.contains('ChuongTrinhNN1')).toBeTruthy();
    expect(component.formSubmit.contains('ChuongTrinhNN2')).toBeTruthy();
    expect(component.formSubmit.contains('MaDanhMucNgoaiNgu1')).toBeTruthy();
    expect(component.formSubmit.contains('MaDanhMucNgoaiNgu2')).toBeTruthy();
    expect(component.formSubmit.contains('IsFreeDom')).toBeTruthy();
    expect(component.formSubmit.contains('HocBanTru')).toBeTruthy();
    expect(component.formSubmit.contains('ClassLeaderId')).toBeTruthy();
    expect(component.formSubmit.contains('ParentLeaderId')).toBeTruthy();
    expect(component.formSubmit.contains('IsVNEN')).toBeTruthy();
    expect(component.formSubmit.contains('IsTBDHTiengViet')).toBeTruthy();
    expect(component.formSubmit.contains('IsTBDHToan')).toBeTruthy();
    expect(component.formSubmit.contains('IsDaiDienChaMeLop')).toBeTruthy();
    expect(component.formSubmit.contains('IsDaiDienChaMeTruong')).toBeTruthy();
    expect(component.formSubmit.contains('IsGiaiThe')).toBeTruthy();
    expect(component.formSubmit.contains('IsBanTru')).toBeTruthy();
    expect(component.formSubmit.contains('IsBoTucTieuHoc')).toBeTruthy();
    expect(component.formSubmit.contains('IsCapNhatLopGhep')).toBeTruthy();
    expect(component.formSubmit.contains('Is2BuoiNgay')).toBeTruthy();
    expect(component.formSubmit.contains('IsLopGhep')).toBeTruthy();
    expect(component.formSubmit.contains('IsBilingual')).toBeTruthy();
    expect(component.formSubmit.contains('IsHocNghe')).toBeTruthy();
    expect(component.formSubmit.contains('IsChuyenBiet')).toBeTruthy();
    expect(component.formSubmit.contains('IsActive')).toBeTruthy();
  });

  it('Should form valid', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const form = component.formSubmit;
    form.patchValue({
      Name: 'Trường THCS An Viên',
      Code: '123',
      GradeId: 'e98c5a2f-84d0-43fb-beeb-39f5f758b610',
      SoBuoiHocTrenTuan: 5,
      DiemTruong: 'e98c5a2f-84d0-43fb-beeb-39f5f758b611',
      HomeroomTeacherId: 'e98c5a2f-84d0-43fb-beeb-39f5f758b612',
      IndexOrder: 1,
      GhepVaoLop: 'e98c5a2f-84d0-43fb-beeb-39f5f758b613',
      SachGiaoKhoa: 'e98c5a2f-84d0-43fb-beeb-39f5f758b614',
      SoTietHocTrenTuan: 12,
      SoTietNN1: 2,
      SoTietNN2: 2,
      ChuongTrinhNN1: 'e98c5a2f-84d0-43fb-beeb-39f5f758b615',
      ChuongTrinhNN2: 'e98c5a2f-84d0-43fb-beeb-39f5f758b616',
      MaDanhMucNgoaiNgu1: 'e98c5a2f-84d0-43fb-beeb-39f5f758b617',
      MaDanhMucNgoaiNgu2: 'e98c5a2f-84d0-43fb-beeb-39f5f758b618',
      IsFreeDom: 1,
      HocBanTru: '01',
      ClassLeaderId: 'e98c5a2f-84d0-43fb-beeb-39f5f758b620',
      ParentLeaderId: 'e98c5a2f-84d0-43fb-beeb-39f5f758b621',

      IsVNEN: '1',
      IsTBDHTiengViet: '0',
      IsTBDHToan: '1',
      IsDaiDienChaMeLop: '1',
      IsDaiDienChaMeTruong: '0',
      IsGiaiThe: '0',
      IsBanTru: '0',
      IsBoTucTieuHoc: '0',
      IsCapNhatLopGhep: '1',
      Is2BuoiNgay: '0',
      IsLopGhep: '0',
      IsBilingual: '1',
      IsHocNghe: '1',
      IsChuyenBiet: '1',
      IsActive: '1'
    });
    expect(form.valid).toBeTrue();
  });

  it('Should name invalid max length', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formSubmit.controls['Name'];
    control.setValue(
      'When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided'
    );
    expect(control.invalid).toBeTruthy();
  });

  it('Should name invalid empty', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formSubmit.controls['Name'];
    control.setValue('   ');
    expect(control.invalid).toBeTruthy();
  });

  it('Should name required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formSubmit.controls['Name'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should code invalid max length', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formSubmit.controls['Code'];
    control.setValue(
      'When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided'
    );
    expect(control.invalid).toBeTruthy();
  });

  it('Should code invalid regex', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formSubmit.controls['Code'];
    control.setValue('@fdhsj');
    expect(control.invalid).toBeTruthy();
  });

  it('Should code required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formSubmit.controls['Code'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should grade invalid', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formSubmit.controls['GradeId'];
    let value = '';
    control.setValue(value);
    expect(control.invalid).toBeTruthy();
  });

  it('Should SoBuoiHocTrenTuan invalid', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formSubmit.controls['SoBuoiHocTrenTuan'];
    let value = '';
    control.setValue(value);
    expect(control.invalid).toBeTruthy();
  });

  it('Should index order required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formSubmit.controls['IndexOrder'];
    let value = null;
    control.setValue(value);
    expect(control.invalid).toBeTruthy();
  });

  it('Should index order not is number', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formSubmit.controls['IndexOrder'];
    let value = 'abc';
    control.setValue(value);
    expect(control.invalid).toBeTruthy();
  });

  it('Should index order not is number with dots', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formSubmit.controls['IndexOrder'];
    let value = '123.456';
    control.setValue(value);
    expect(control.invalid).toBeTruthy();
  });

  it('Should GhepVaoLop invalid when IsLopGhep is checked', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formSubmit.controls['GhepVaoLop'];
    component.formSubmit.controls['IsLopGhep'].setValue(true);
    component.formSubmit.get('GhepVaoLop').setValidators([Validators.required, ValidatorNotNull]);
    let value = '';
    control.setValue(value);
    expect(control.invalid).toBeTruthy();
  });

  it('should get extension img jpeg', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component.getExtension('image/jpeg')).toEqual('jpeg');
  });

  it('should get extension img jpg', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component.getExtension('image/jpg')).toEqual('jpg');
  });

  it('should get extension img png', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component.getExtension('image/png')).toEqual('png');
  });
});
