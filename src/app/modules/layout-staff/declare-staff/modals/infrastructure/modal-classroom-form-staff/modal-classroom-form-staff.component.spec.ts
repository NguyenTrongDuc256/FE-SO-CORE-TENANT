import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalClassroomFormStaffComponent} from './modal-classroom-form-staff.component';
import {CommonModule} from "@angular/common";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {NgxDaterangepickerMd} from "ngx-daterangepicker-material";
import {TRANSLOCO_SCOPE, TranslocoModule} from "@ngneat/transloco";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {environment} from "../../../../../../../environments/environment.firebase";
import {getTranslocoModule} from "../../../../../../transloco-testing.module";

describe('ModalClassroomFormStaffComponent', () => {
  let component: ModalClassroomFormStaffComponent;
  let fixture: ComponentFixture<ModalClassroomFormStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalClassroomFormStaffComponent ],
      imports: [
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
    fixture = TestBed.createComponent(ModalClassroomFormStaffComponent);
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
    expect(component.infoForm.contains('floor')).toBeTruthy();
    expect(component.infoForm.contains('numberOfSeats')).toBeTruthy();
    expect(component.infoForm.contains('isRoom')).toBeTruthy();
    expect(component.infoForm.contains('isActive')).toBeTruthy();
    expect(component.infoForm.contains('classroomBuildingId')).toBeTruthy();
  });

  it('Should form valid', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const formGroup = component.infoForm;
    formGroup.patchValue({
      name: 'Tên của bạn',
      code: 'CODE',
      floor: 123,
      numberOfSeats: 456,
      isRoom: 1,
      isActive: 1,
      classroomBuildingId: 'id',
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

  it('Should floor invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.infoForm.controls['floor'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should numberOfSeats invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.infoForm.controls['numberOfSeats'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should isRoom invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.infoForm.controls['isRoom'];
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

  it('Should classroomBuildingId invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.infoForm.controls['classroomBuildingId'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });
});
