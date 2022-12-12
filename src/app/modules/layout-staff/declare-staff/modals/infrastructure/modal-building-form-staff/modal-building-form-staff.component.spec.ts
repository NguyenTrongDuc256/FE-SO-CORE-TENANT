/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalBuildingFormStaffComponent } from './modal-building-form-staff.component';

import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { getTranslocoModule } from '../../../../../../transloco-testing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../../../../../../environments/environment.firebase';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { TranslocoModule } from '@ngneat/transloco';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DeclareModule } from '../../../declare.module';
import { DeclareRoutingModule } from '../../../declare-routing.module';

describe('ModalBuildingFormStaffComponent', () => {
  let component: ModalBuildingFormStaffComponent;
  let fixture: ComponentFixture<ModalBuildingFormStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalBuildingFormStaffComponent],
      imports: [
        DeclareModule,
        DeclareRoutingModule,
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        getTranslocoModule(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        NgxDaterangepickerMd.forRoot(),
        TranslocoModule,
        BrowserAnimationsModule,
        RouterModule,
      ],
      providers: [NgbActiveModal],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBuildingFormStaffComponent);
    component = fixture.componentInstance;
    component.dataModal = {
      dataFromParent: {},
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('Should create a form with controls', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component.infoForm.contains('name')).toBeTruthy();
    expect(component.infoForm.contains('code')).toBeTruthy();
    expect(component.infoForm.contains('numberOfFloor')).toBeTruthy();
    expect(component.infoForm.contains('SchoolId')).toBeTruthy();
    expect(component.infoForm.contains('isActive')).toBeTruthy();
  });

  it('Should form valid', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const formGroup = component.infoForm;
    formGroup.patchValue({
      name: 'Tên của bạn',
      code: 'CODE',
      numberOfFloor: 123,
      SchoolId: 456,
      isActive: 1,
    });
    expect(formGroup.valid).toBeTrue();
  });

  it('Should name invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.infoForm.controls['name'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should name invalid maxLength', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.infoForm.controls['name'];
    control.setValue(
      'Tên của tui đâyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy maxlength là 255 ký tự nhé, text này 256 ký tự đó heheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
    );
    expect(control.invalid).toBeTruthy();
  });

  it('Should code invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.infoForm.controls['code'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should code invalid maxLength', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.infoForm.controls['code'];
    control.setValue(
      'textnay56kytunheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
    );
    expect(control.invalid).toBeTruthy();
  });

  it('Should code invalid minLength', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.infoForm.controls['code'];
    control.setValue('aa');
    expect(control.invalid).toBeTruthy();
  });

  it('Should code invalid pattern', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.infoForm.controls['code'];
    control.setValue('code code');
    expect(control.invalid).toBeTruthy();
  });

  it('Should numberOfFloor invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.infoForm.controls['numberOfFloor'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should SchoolId invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.infoForm.controls['SchoolId'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should isActive invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.infoForm.controls['isActive'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });
});
