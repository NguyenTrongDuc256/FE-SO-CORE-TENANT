import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreModule } from 'src/app/_core/core.module';
import { SchoolTenantModule } from './../../school-tenant.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment.firebase';
import { ModalFormDiemTruongComponent } from './modal-form-diem-truong.component';

describe('ModalFormDiemTruongComponent', () => {
  let component: ModalFormDiemTruongComponent;
  let fixture: ComponentFixture<ModalFormDiemTruongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFormDiemTruongComponent],
      imports: [
        CommonModule,
        CoreModule,
        SchoolTenantModule,
        RouterModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        BrowserAnimationsModule,
      ],
      providers: [NgbActiveModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFormDiemTruongComponent);
    component = fixture.componentInstance;
    component.dataModal = {
      dataFromParent: {
        CityCode: '01',
        arrDistrict: [],
        keyFirebaseAction: 'create',
        keyFirebaseModule: 'school-location',
        nameForm: 'create',
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create a form with controls', () => {
    expect(component.formSubmit.contains('TenDiemTruong')).toBeTruthy();
    expect(component.formSubmit.contains('MaDiemTruong')).toBeTruthy();
    expect(component.formSubmit.contains('DiaChi')).toBeTruthy();
    expect(component.formSubmit.contains('KhoangCach')).toBeTruthy();
    expect(component.formSubmit.contains('PhuongTien')).toBeTruthy();
    expect(component.formSubmit.contains('DienTich')).toBeTruthy();
    expect(component.formSubmit.contains('DienThoai')).toBeTruthy();
    expect(component.formSubmit.contains('Email')).toBeTruthy();
    expect(component.formSubmit.contains('QuanHuyen')).toBeTruthy();
    expect(component.formSubmit.contains('TrangThai')).toBeTruthy();
  });

  it('Should form valid', () => {
    const form = component.formSubmit;
    form.patchValue({
      TenDiemTruong: 'Điểm trường test',
      MaDiemTruong: 'OMT01',
      DiaChi: 'Ba Đình, Hà Nội',
      KhoangCach: 200,
      PhuongTien: 'xe bus',
      DienTich: 100,
      DienThoai: '0349954675',
      Email: 'dungdt@omt.vn',
      QuanHuyen: 'Ba Đình',
      TrangThai: 1,
    });
    expect(form.valid).toBeTrue();
  });

  it('Should name invalid max length', () => {
    const control = component.formSubmit.controls['TenDiemTruong'];
    control.setValue(
      'When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided'
    );
    expect(control.invalid).toBeTruthy();
  });

  it('Should name invalid required', () => {
    const control = component.formSubmit.controls['TenDiemTruong'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should name invalid empty', () => {
    const control = component.formSubmit.controls['TenDiemTruong'];
    control.setValue('      ');
    expect(control.invalid).toBeTruthy();
  });

  it('Should code invalid required', () => {
    const control = component.formSubmit.controls['MaDiemTruong'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should code invalid regex', () => {
    const control = component.formSubmit.controls['MaDiemTruong'];
    control.setValue('@ạ sdk_-');
    expect(control.invalid).toBeTruthy();
  });

  it('Should phone invalid regex', () => {
    const control = component.formSubmit.controls['DienThoai'];
    control.setValue('0124956970a');
    expect(control.invalid).toBeTruthy();
  });

  it('Should email invalid', () => {
    const control = component.formSubmit.controls['Email'];
    control.setValue('omt.com.vn');
    expect(control.invalid).toBeTruthy();
  });
});
