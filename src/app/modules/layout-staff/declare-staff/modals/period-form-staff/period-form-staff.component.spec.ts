import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodFormStaffComponent } from './period-form-staff.component';
import {CommonModule} from "@angular/common";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {getTranslocoModule} from "../../../../../transloco-testing.module";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../../../../environments/environment.firebase";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {NgxDaterangepickerMd} from "ngx-daterangepicker-material";
import {TranslocoModule} from "@ngneat/transloco";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DeclareModule} from "../../declare.module";
import {DeclareRoutingModule} from "../../declare-routing.module";

describe('PeriodFormStaffComponent', () => {
  let component: PeriodFormStaffComponent;
  let fixture: ComponentFixture<PeriodFormStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodFormStaffComponent ],
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
      providers: [
        NgbActiveModal
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodFormStaffComponent);
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
    expect(component.infoForm.contains('periodMoet')).toBeTruthy();
    expect(component.infoForm.contains('displayOrder')).toBeTruthy();
    expect(component.infoForm.contains('timeStart')).toBeTruthy();
    expect(component.infoForm.contains('timeEnd')).toBeTruthy();
    expect(component.infoForm.contains('showOnApp')).toBeTruthy();
  });

  it('Should form valid', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const formGroup = component.infoForm;
    formGroup.patchValue({
      name: 'Tên của bạn',
      code: 'CODE',
      periodMoet: 'Moet1',
      displayOrder: 1,
      timeStart: '7:30',
      timeEnd: '8:30',
      showOnApp: 1,
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

  it('Should code invalid pattern', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.infoForm.controls['code'];
    control.setValue('code code');
    expect(control.invalid).toBeTruthy();
  });

  it('Should periodMoet invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.infoForm.controls['periodMoet'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should displayOrder valid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.infoForm.controls['displayOrder'];
    control.setValue('');
    expect(control.valid).toBeTruthy();
  });

  it('Should timeStart valid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.infoForm.controls['timeStart'];
    control.setValue('');
    expect(control.valid).toBeTruthy();
  });

  it('Should timeEnd valid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.infoForm.controls['timeEnd'];
    control.setValue('');
    expect(control.valid).toBeTruthy();
  });

  it('Should showOnApp valid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.infoForm.controls['showOnApp'];
    control.setValue('');
    expect(control.valid).toBeTruthy();
  });
});
