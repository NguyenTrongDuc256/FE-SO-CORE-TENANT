import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTranslocoModule } from 'src/app/transloco-testing.module';

import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { LocaleService, NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { CoreModule } from 'src/app/_core/core.module';
import { environment } from 'src/environments/environment.firebase';
import { FormCourseLStaffComponent } from './form-course-staff.component';

describe('FormCourseLStaffComponent', () => {
  let component: FormCourseLStaffComponent;
  let fixture: ComponentFixture<FormCourseLStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCourseLStaffComponent],
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        getTranslocoModule(),
        FormsModule,
        CommonModule,
        NzCheckboxModule,
        ReactiveFormsModule,
        CoreModule,
        NgxDaterangepickerMd.forRoot()
      ],
      providers: [
        { provide: TRANSLOCO_SCOPE, useValue: 'declare' },
        NgbActiveModal,
        LocaleService
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCourseLStaffComponent);
    component = fixture.componentInstance;
    component.dataModal = {
      dataFromParent: {
        arrHomeroomClasses: [
          {
            Code: 'L01',
            Name: 'Lớp 1',
            id: '61321a0f-0e35-4ce0-a5a3-c7bec5d054ed',
          },
          {
            Code: 'L02',
            Name: 'Lớp 2',
            id: '92827460-2050-4816-a946-82ad40d09864',
          },
          {
            Code: 'L03',
            Name: 'Lớp 3',
            id: '9a4e9528-a11f-4f3c-b890-1971e3334cb5',
          },
        ],
        nameForm: 'update',
        course: {
          name: 'OMT-TOAN',
          code: 'OMT7123',
          gradeId: 'e71cd181-6792-4d52-855e-78646cb95cad',
          homeroomClassId: '61321a0f-0e35-4ce0-a5a3-c7bec5d054ed',
          subjectId: 'a0e0b62c-8efb-49fe-b9db-0e25231ef04f',
          startDate: 1653028832,
          endDate: 1652337632,
          status: 2,
          avatar: '',
          id: '556fc34e-7917-4a81-b9e6-46fead521701',
        },
      },
    };
    component.isLoading = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create a form with controls', () => {
    expect(component.formSubmit.contains('name')).toBeTruthy();
    expect(component.formSubmit.contains('code')).toBeTruthy();
    expect(component.formSubmit.contains('gradeId')).toBeTruthy();
    expect(component.formSubmit.contains('subjectId')).toBeTruthy();
    expect(component.formSubmit.contains('homeroomClassId')).toBeTruthy();
    expect(component.formSubmit.contains('startDate')).toBeTruthy();
    expect(component.formSubmit.contains('endDate')).toBeTruthy();
    expect(component.formSubmit.contains('status')).toBeTruthy();
  });

  it('Should form valid', () => {
    const form = component.formSubmit;
    form.patchValue({
      name: 'Lớp 1',
      code: '123',
      gradeId: 'e71cd181-6792-4d52-855e-78646cb95cad',
      subjectId: 'a0e0b62c-8efb-49fe-b9db-0e25231ef04f',
      homeroomClassId: '61321a0f-0e35-4ce0-a5a3-c7bec5d054ed',
      startDate: 1653028832,
      endDate: 1652337632,
      status: 1,
    });
    expect(form.valid).toBeTrue();
  });

  it('Should name invalid max length', () => {
    const control = component.formSubmit.controls['name'];
    control.setValue(
      'When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided'
    );
    expect(control.invalid).toBeTruthy();
  });

  it('Should name invalid empty', () => {
    const control = component.formSubmit.controls['name'];
    control.setValue('   ');
    expect(control.invalid).toBeTruthy();
  });

  it('Should name required', () => {
    const control = component.formSubmit.controls['name'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should code invalid max length', () => {
    const control = component.formSubmit.controls['code'];
    control.setValue(
      'When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided'
    );
    expect(control.invalid).toBeTruthy();
  });

  it('Should code invalid regex', () => {
    const control = component.formSubmit.controls['code'];
    control.setValue('@fdhsj');
    expect(control.invalid).toBeTruthy();
  });

  it('Should code required', () => {
    const control = component.formSubmit.controls['code'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should grade invalid', () => {
    const control = component.formSubmit.controls['gradeId'];
    let value = '';
    control.setValue(value);
    expect(control.invalid).toBeTruthy();
  });

  it('Should subject invalid', () => {
    const control = component.formSubmit.controls['subjectId'];
    let value = '';
    control.setValue(value);
    expect(control.invalid).toBeTruthy();
  });

  it('Should homeroom class invalid', () => {
    const control = component.formSubmit.controls['homeroomClassId'];
    let value = '';
    control.setValue(value);
    expect(control.invalid).toBeTruthy();
  });

  it('Should start date grate than end date', () => {
    const startDate = component.formSubmit.controls['startDate'];
    const endDate = component.formSubmit.controls['endDate'];
    component.dataFromParent.course.startDate = 1653028832;
    component.dataFromParent.course.endDate = 1653028830;
    startDate.setValue(component.dataFromParent.course.startDate);
    endDate.setValue(component.dataFromParent.course.endDate);
    let result = component.formSubmit.controls['startDate'].value > component.formSubmit.controls['endDate'].value
    expect(result).toBeTruthy();
  });

  it('should get extension img jpeg', () => {
    expect(component.getExtension('image/jpeg')).toEqual('jpeg');
  });

  it('should get extension img jpg', () => {
    expect(component.getExtension('image/jpg')).toEqual('jpg');
  });

  it('should get extension img png', () => {
    expect(component.getExtension('image/png')).toEqual('png');
  });
});
