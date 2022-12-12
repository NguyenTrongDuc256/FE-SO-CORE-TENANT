import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { of } from 'rxjs';
import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { CoreModule } from 'src/app/_core/core.module';
import { SubjectGradeStaffService } from 'src/app/_services/layout-staff/declare/subject-grade-staff.service';
import { environment } from 'src/environments/environment.firebase';

import { CreateSubjectGradeComponent } from './create-subject-grade.component';

describe('CreateSubjectGradeComponent', () => {
  let component: CreateSubjectGradeComponent;
  let fixture: ComponentFixture<CreateSubjectGradeComponent>;
  let subjectGradeServiceSpy = jasmine.createSpyObj(
    'SubjectGradeStaffService',
    ['getListReportType', 'getListSubjectToCreate']
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSubjectGradeComponent],
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
        NzCheckboxModule,
      ],
      providers: [
        { provide: TRANSLOCO_SCOPE, useValue: 'declare' },
        { provide: SubjectGradeStaffService, useValue: subjectGradeServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubjectGradeComponent);
    component = fixture.componentInstance;
    subjectGradeServiceSpy.getListSubjectToCreate.and.returnValue(of());
    subjectGradeServiceSpy.getListReportType.and.returnValue(of());
    component.arrList = [
      {
        TenantId: '00000000-0000-0000-0000-000000000000',
        Code: '03',
        Name: 'Đạo đức',
        SubjectType: 1,
        EducationalStages: [5],
        IndexOrder: 0,
        IsActive: 1,
        id: '82fc034d-e8be-4a09-839e-3248934e534d',
      },
      {
        TenantId: '00000000-0000-0000-0000-000000000000',
        Code: '04',
        Name: 'Tự nhiên và Xã hội',
        SubjectType: 1,
        EducationalStages: [5],
        IndexOrder: 0,
        IsActive: 1,
        id: 'f5f6e124-0b39-48ca-a49d-d29dc21cab8e',
      },
      {
        TenantId: '00000000-0000-0000-0000-000000000000',
        Code: '05',
        Name: 'Lịch sử và Địa lý',
        SubjectType: 1,
        EducationalStages: [5],
        IndexOrder: 0,
        IsActive: 1,
        id: '16a279fd-0efc-44d9-a777-4c4ec39572ac',
      },
    ];
    component.arrReportTypes = [
      {
        id: 'accf4050-3e77-4159-8aca-ea115f81fbz9',
        Code: 'SoDiemTieuHoc',
        Name: 'Sổ điểm tiểu học',
        ConvertMethod: [
          {
            ReportTypeFormulaCode: 'CT1',
            ReportTypeFormulaName: 'Công thức 1',
          },
          {
            ReportTypeFormulaCode: 'CT2',
            ReportTypeFormulaName: 'Công thức 2',
          },
        ],
      },
      {
        id: 'accf4050-3e77-4159-8aca-ea115f81fbb5',
        Code: 'SoDiemTrungHoc',
        Name: 'Sổ điểm trung học',
        ConvertMethod: [
          {
            ReportTypeFormulaCode: 'CT1',
            ReportTypeFormulaName: 'Công thức 1',
          },
          {
            ReportTypeFormulaCode: 'CT2',
            ReportTypeFormulaName: 'Công thức 2',
          },
        ],
      },
    ];
    component.arrGrades = [
      {
        id: 'b36e983c-e02c-4a1b-b489-fde7a2e5c323',
        tenantId: 'e98c5a2f-84d0-43fb-beeb-39f5f758b610',
        code: 'K1',
        name: 'Khối 1',
        educationalStages: 5,
        isActive: 1,
      },
      {
        id: '2c64f5e9-625f-4bf2-87c7-60037b43cf11',
        tenantId: 'e98c5a2f-84d0-43fb-beeb-39f5f758b610',
        code: 'K5',
        name: 'Khối 5',
        educationalStages: 5,
        isActive: 1,
      },
    ];
    component.initForm();
    for (let val of component.arrList) {
      component.createFormGroup(val);
    }
    component.isLoading = false;
  });

  it('should create', () => {
    component.isLoading = false;
    expect(component).toBeTruthy();
  });

  // it('should 1', () => {
  //   component.isLoading = false;
  //   let valueForm = {
  //     subjectGroup: [
  //       {
  //         IsCheck: true,
  //         SubjectId: '82fc034d-e8be-4a09-839e-3248934e534d',
  //         Name: 'Đạo đức',
  //         Code: '03',
  //         SubjectType: 1,
  //         OtherName: 'Môn 1',
  //         GradebookType: 1,
  //         IsPrivateGradebook: true,
  //         ReportTypeId: 'accf4050-3e77-4159-8aca-ea115f81fbz9',
  //         IsSyncMoet: true,
  //         ConvertMethod: [
  //           {
  //             arrConvertMethod: [
  //               {
  //                 ReportTypeFormulaCode: 'CT1',
  //                 ReportTypeFormulaName: 'Công thức 1',
  //               },
  //               {
  //                 ReportTypeFormulaCode: 'CT2',
  //                 ReportTypeFormulaName: 'Công thức 2',
  //               },
  //             ],
  //             ReportTypeFormulaCode: 'CT1',
  //             MoetSubjectCode: '03',
  //           },
  //         ],
  //       },
  //       {
  //         IsCheck: true,
  //         SubjectId: 'f5f6e124-0b39-48ca-a49d-d29dc21cab8e',
  //         Name: 'Tự nhiên và Xã hội',
  //         Code: '04',
  //         SubjectType: 1,
  //         OtherName: 'Môn 2',
  //         GradebookType: 1,
  //         IsPrivateGradebook: true,
  //         ReportTypeId: 'accf4050-3e77-4159-8aca-ea115f81fbb5',
  //         IsSyncMoet: true,
  //         ConvertMethod: [
  //           {
  //             arrConvertMethod: [
  //               {
  //                 ReportTypeFormulaCode: 'CT1',
  //                 ReportTypeFormulaName: 'Công thức 1',
  //               },
  //               {
  //                 ReportTypeFormulaCode: 'CT2',
  //                 ReportTypeFormulaName: 'Công thức 2',
  //               },
  //             ],
  //             ReportTypeFormulaCode: 'CT2',
  //             MoetSubjectCode: '03',
  //           },
  //         ],
  //       },
  //       {
  //         IsCheck: false,
  //         SubjectId: '16a279fd-0efc-44d9-a777-4c4ec39572ac',
  //         Name: 'Lịch sử và Địa lý',
  //         Code: '05',
  //         SubjectType: 1,
  //         OtherName: '',
  //         GradebookType: 1,
  //         IsPrivateGradebook: false,
  //         ReportTypeId: '',
  //         IsSyncMoet: false,
  //         ConvertMethod: [],
  //       },
  //     ],
  //   };

  //   component.submit(valueForm)
  //   expect(component).toBeTruthy();
  // });

  it('Should other name invalid max length', () => {
    const control = component.getFormGroupOfFormArray(0).controls['OtherName'];
    control.setValue(
      'When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided'
    );
    expect(control.invalid).toBeTruthy();
  });

  it('Should other name valid max length', () => {
    const control = component.getFormGroupOfFormArray(0).controls['OtherName'];
    control.setValue(
      'When a user clicks the button'
    );
    expect(control.valid).toBeTruthy();
  });

  it('Should other name valid max length, enter all space', () => {
    const control = component.getFormGroupOfFormArray(0).controls['OtherName'];
    control.setValue(
      '                 '
    );
    expect(control.valid).toBeTruthy();
  });

  it('Should GradebookType invalid', () => {
    const control =
      component.getFormGroupOfFormArray(0).controls['GradebookType'];
    control.setValue(null);
    expect(control.invalid).toBeTruthy();
  });

  it('Should GradebookType valid', () => {
    const control =
      component.getFormGroupOfFormArray(0).controls['GradebookType'];
    control.setValue('accf4050-3e77-4159-8aca-ea115f81fbz9');
    expect(control.valid).toBeTruthy();
  });

  it('Should ReportTypeFormulaCode valid', () => {
    const controlIsPrivateGradebook =
      component.getFormGroupOfFormArray(0).controls['IsPrivateGradebook'];
    controlIsPrivateGradebook.setValue(true);
    const controlIsSyncMoet =
      component.getFormGroupOfFormArray(0).controls['IsSyncMoet'];
    controlIsSyncMoet.setValue(true);
    const controlReportTypeFormulaCode = component.getFormGroupOfFormArrayConvertMethod(0, 0).controls['ReportTypeFormulaCode'];
    // expect(control.valid).toBeTruthy();
  });
});
