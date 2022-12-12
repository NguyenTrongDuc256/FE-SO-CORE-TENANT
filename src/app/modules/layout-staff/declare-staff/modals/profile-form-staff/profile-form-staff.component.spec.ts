import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { environment } from 'src/environments/environment.firebase';
import { DeclareRoutingModule } from '../../declare-routing.module';
import { DeclareModule } from '../../declare.module';

import { ProfileFormStaffComponent } from './profile-form-staff.component';

describe('ProfileFormStaffComponent', () => {
  let component: ProfileFormStaffComponent;
  let fixture: ComponentFixture<ProfileFormStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileFormStaffComponent],
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFormStaffComponent);
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
    expect(component.infoForm.contains('type')).toBeTruthy();
    expect(component.infoForm.contains('isImperative')).toBeTruthy();
    expect(component.infoForm.contains('note')).toBeTruthy();
    expect(component.infoForm.contains('indexOrder')).toBeTruthy();
  });

  it('Should form valid', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const formGroup = component.infoForm;
    formGroup.patchValue({
      name: 'Tên của bạn',
      code: 'CODE',
      type: 1,
      isImperative: 1,
      note: 'oke la',
      indexOrder: 1,
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

  it('Should type invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.infoForm.controls['type'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should isImperative invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.infoForm.controls['isImperative'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should note valid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.infoForm.controls['note'];
    control.setValue('');
    expect(control.valid).toBeTruthy();
  });

  it('Should indexOrder invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.infoForm.controls['indexOrder'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });
});
