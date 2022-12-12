import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { CoreModule } from 'src/app/_core/core.module';
import { SubjectGradeStaffService } from 'src/app/_services/layout-staff/declare/subject-grade-staff.service';
import { environment } from 'src/environments/environment.firebase';

import { CommonModule } from '@angular/common';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ModalUpdateSubjectGradeComponent } from './modal-update-subject-grade.component';

describe('ModalUpdateSubjectGradeComponent', () => {
  let component: ModalUpdateSubjectGradeComponent;
  let fixture: ComponentFixture<ModalUpdateSubjectGradeComponent>;

  let subjectGradeServiceSpy = jasmine.createSpyObj(
    'SubjectGradeStaffService',
    ['getList', 'getListReportType']
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalUpdateSubjectGradeComponent],
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        BrowserAnimationsModule,
        getTranslocoModule(),
        ReactiveFormsModule,
        CoreModule,
        FormsModule,
        CommonModule,
        NzCheckboxModule
      ],
      providers: [
        { provide: TRANSLOCO_SCOPE, useValue: 'declare' },
        { provide: SubjectGradeStaffService, useValue: subjectGradeServiceSpy },
        NgbActiveModal,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUpdateSubjectGradeComponent);
    component = fixture.componentInstance;
    component.dataModal = {
      dataFromParent: {
        id: 'c942ba9a-8f3f-4034-9744-6dc00c7e5fe6',
        subject: {
          id: 'c942ba9a-8f3f-4034-9744-6dc00c7e5fe6',
          OtherName: null,
          SubjectCode: 'MH12345',
          SubjectName: 'Toán học',
          SubjectId: 'a0e0b62c-8efb-49fe-b9db-0e25231ef04f',
          GradeId: '51f7c9b6-5834-4ab8-a23a-27b941753cz3',
          GradebookType: 1,
          GradebookTypeName: '',
          IsPrivateGradebook: 1,
          ReportTypeId: 'accf4050-3e77-4159-8aca-ea115f81fbz9',
          ReportTypeName: '',
          IsSyncMoet: 1,
          ConvertMethod: [
            {
              ReportTypeFormulaCode: 'CT1',
              ReportTypeFormulaName: 'Công thức 1',
              MoetSubjectCode: 'MH-7437',
              MoetSubjectName: 'Môn Tiếng Anh 6',
            },
            {
              ReportTypeFormulaCode: 'CT1',
              ReportTypeFormulaName: 'Công thức 1',
              MoetSubjectCode: 'Mh353',
              MoetSubjectName: 'ngữ văn',
            },
          ],
          IsActive: 1,
        },
        gradeId: '51f7c9b6-5834-4ab8-a23a-27b941753cz3',
        arrReportTypes: [
          {
            id: 'accf4050-3e77-4159-8aca-ea115f81fbz9',
            Code: 'SoDiemTieuHoc',
            Name: 'Sổ điểm tiểu học',
            ConvertMethod: [{ Code: 'CT1', Name: 'Công thức 1' }],
          },
          {
            id: 'accf4050-3e77-4159-8aca-ea115f81fbb5',
            Code: 'SoDiemTrungHoc',
            Name: 'Sổ điểm trung học',
            ConvertMethod: [{ Code: 'CT1', Name: 'Công thức 1' }],
          },
        ],
        arrListSubject: [
          {
            TenantId: '00000000-0000-0000-0000-000000000000',
            Code: 'HHAA',
            Name: 'Toán học',
            SubjectType: 1,
            EducationalStages: [3, 4],
            IndexOrder: 0,
            IsActive: 1,
            id: '21a6a8f7-18b4-4e01-ae5e-9925ec79b119',
          },
          {
            TenantId: '00000000-0000-0000-0000-000000000000',
            Code: 'MH-7437',
            Name: 'Môn Tiếng Anh 6',
            SubjectType: 1,
            EducationalStages: [4],
            IndexOrder: 0,
            IsActive: 1,
            id: '365bba7f-069a-4ebf-bb1f-fb3ed3a74cfb',
          },
        ],
      },
    };
    component.dataFromParent = component.dataModal.dataFromParent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create a form with controls', () => {
    expect(component.formSubmit.contains('SubjectId')).toBeTruthy();
    expect(component.formSubmit.contains('Name')).toBeTruthy();
    expect(component.formSubmit.contains('Code')).toBeTruthy();
    expect(component.formSubmit.contains('OtherName')).toBeTruthy();
    expect(component.formSubmit.contains('GradebookType')).toBeTruthy();
    expect(component.formSubmit.contains('IsPrivateGradebook')).toBeTruthy();
    expect(component.formSubmit.contains('ReportTypeId')).toBeTruthy();
    expect(component.formSubmit.contains('IsSyncMoet')).toBeTruthy();
    expect(component.formSubmit.contains('ConvertMethod')).toBeTruthy();
    expect(component.formSubmit.contains('IsActive')).toBeTruthy();
    if(component.dataFromParent.subject.ConvertMethod.length > 0) {
      expect((component.getFormArray.controls[0] as FormGroup).contains('CanDelete')).toBeTruthy();
      expect((component.getFormArray.controls[0] as FormGroup).contains('ReportTypeFormulaCode')).toBeTruthy();
      expect((component.getFormArray.controls[0] as FormGroup).contains('MoetSubjectCode')).toBeTruthy();
    }
  })

  it('Should form valid, using report type, don\'t sync moet', () => {
    const form = component.formSubmit;
    form.patchValue({
      SubjectId: '03979087-d27f-498b-a147-d51e521cc4d2',
      Name: 'Văn 1234',
      Code: 'van123',
      OtherName: 'van123',
      GradebookType: 1,
      IsPrivateGradebook: 1,
      ReportTypeId: 'accf4050-3e77-4159-8aca-ea115f81fbz9',
      IsSyncMoet: 0,
      ConvertMethod: [],
      IsActive: 1,
    });
    expect(form.valid).toBeTrue();
  });

  it('Should form valid, using report type, sync moet', () => {
    const form = component.formSubmit;
    form.patchValue({
      SubjectId: '03979087-d27f-498b-a147-d51e521cc4d2',
      Name: 'Văn 1234',
      Code: 'van123',
      OtherName: 'van123',
      GradebookType: 1,
      IsPrivateGradebook: 1,
      ReportTypeId: 'accf4050-3e77-4159-8aca-ea115f81fbz9',
      IsSyncMoet: 1,
      ConvertMethod: [
        {
          ReportTypeFormulaCode: 'CT1',
          MoetSubjectCode: 'MH-7437',
        },
        {
          ReportTypeFormulaCode: 'CT1',
          MoetSubjectCode: 'Mh353',
        },
      ],
      IsActive: 1,
    });
    expect(form.valid).toBeTrue();
  });

  it('Should form valid, don\'t using report type', () => {
    const form = component.formSubmit;
    form.patchValue({
      SubjectId: '03979087-d27f-498b-a147-d51e521cc4d2',
      Name: 'Văn 1234',
      Code: 'van123',
      OtherName: 'van123',
      GradebookType: 1,
      IsPrivateGradebook: 0,
      ReportTypeId: '',
      IsSyncMoet: 0,
      ConvertMethod: [],
      IsActive: 1,
    });
    expect(form.valid).toBeTrue();
  });

  it('Should other name invalid max length', () => {
    const control = component.formSubmit.controls['OtherName'];
    control.setValue(
      'When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided'
    );
    expect(control.invalid).toBeTruthy();
  });

  it('Should other name valid max length', () => {
    const control = component.formSubmit.controls['OtherName'];
    control.setValue(
      'When a user clicks the button'
    );
    expect(control.valid).toBeTruthy();
  });

  it('Should other name valid max length, enter all space', () => {
    const control = component.formSubmit.controls['OtherName'];
    control.setValue(
      '                 '
    );
    expect(control.valid).toBeTruthy();
  });

  it('Should GradebookType invalid', () => {
    const control = component.formSubmit.controls['GradebookType'];
    control.setValue(null);
    expect(control.invalid).toBeTruthy();
  });

  // it('Should campus invalid', () => {
  //   const control = component.formSubmit.controls['GradebookType'];
  //   control.setValue(null);
  //   expect(control.invalid).toBeTruthy();
  // });
});
