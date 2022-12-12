import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { RouterTestingModule } from '@angular/router/testing';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {
  NgxPermissionsConfigurationStore,
  NgxPermissionsService,
  NgxPermissionsStore,
  NgxRolesStore
} from 'ngx-permissions';
import { of } from 'rxjs';
import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { CoreModule } from 'src/app/_core/core.module';
import { AssignTeacherService } from 'src/app/_services/layout-staff/assign-teacher/assign-teacher.service';
import { environment } from 'src/environments/environment.firebase';

import { AssignHomeroomTeacherComponent } from './assign-homeroom-teacher.component';

describe('AssignHomeroomTeacherComponent', () => {
  let component: AssignHomeroomTeacherComponent;
  let fixture: ComponentFixture<AssignHomeroomTeacherComponent>;
  let assignTeacherServiceSpy = jasmine.createSpyObj('AssignTeacherService', [
    'getListHomeroomClassesToAssign',
    'getListHomeroomTeachersToAssign',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignHomeroomTeacherComponent],
      imports: [
        CoreModule,
        CommonModule,
        RouterTestingModule,
        NzSelectModule,
        getTranslocoModule(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        NzCheckboxModule,
      ],
      providers: [
        { provide: TRANSLOCO_SCOPE, useValue: 'assign-teacher' },
        { provide: AssignTeacherService, useValue: assignTeacherServiceSpy },
        NgxPermissionsService,
        NgxPermissionsStore,
        NgxPermissionsConfigurationStore,
        NgxRolesStore,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignHomeroomTeacherComponent);
    component = fixture.componentInstance;
    assignTeacherServiceSpy.getListHomeroomClassesToAssign.and.returnValue(
      of()
    );
    assignTeacherServiceSpy.getListHomeroomTeachersToAssign.and.returnValue(
      of()
    );
    component.isLoading = false;
    component.arrClasses = [
      {
        id: '70e62f10-064c-4797-a3e6-40116791a3f3',
        name: 'Chủ nhiệm 001',
        code: 'CN001',
        gradeId: 'b36e983c-e02c-4a1b-b489-fde7a2e5c323',
        homeroomTeacherId: '27a3b565-1a88-4f04-9999-42263780e8e4',
      },
      {
        id: '03d25f30-3d12-48df-8758-9e6286e8df3c',
        name: 'Lớp chủ nhiệm 1',
        code: 'CN1',
        gradeId: 'b36e983c-e02c-4a1b-b489-fde7a2e5c323',
        homeroomTeacherId: '1446bc19-9bfa-456c-a77b-3349a68315d2',
      },
      {
        id: '442ad76e-9033-434c-8160-be282c2a923e',
        name: 'Lớp 1A1 OMT',
        code: '1A1',
        gradeId: 'b36e983c-e02c-4a1b-b489-fde7a2e5c323',
        homeroomTeacherId: '82beed72-0432-492d-9d2a-abbf0cd908c0',
      },
    ];
    component.arrUsers = [
      {
        id: '321f4d12-deeb-48ea-a8a0-039237fe8720',
        name: 'Lê Lan Hương',
        code: 'HU1972',
        phone: '0904188060',
        email: 'huongle70@gmail.com',
        classIds: ['c716bdee-6ec1-46bb-b3d5-3fe92b084a73'],
      },
      {
        id: 'c7d32685-bfbd-414b-a680-d0c56c3a7102',
        name: 'Lê Văn Thiện ',
        code: 'thienlv',
        phone: null,
        email: null,
        classIds: ['442ad76e-9033-434c-8160-be282c2a923e'],
      },
      {
        id: '82beed72-0432-492d-9d2a-abbf0cd908c0',
        name: 'Trịnh Tuấn Anh',
        code: 'ND_01010',
        phone: '+14255550100',
        email: '',
        classIds: [
          '9a924d22-d2a7-4473-b271-388b12a82200',
          '442ad76e-9033-434c-8160-be282c2a923e',
        ],
      },
      {
        id: '27a3b565-1a88-4f04-9999-42263780e8e4',
        name: 'Long Thành 1',
        code: 'longthanh1',
        phone: '09555555555',
        email: 'longthanh1@gmail.com',
        classIds: [
          '9a924d22-d2a7-4473-b271-388b12a82200',
          '70e62f10-064c-4797-a3e6-40116791a3f3',
          'e0ca76d8-6bd3-4236-9a16-1af6422577d6',
          '7bbebffa-5b60-4759-a9a6-f394bde03ac0',
          'b11bed7d-780c-42ee-8996-6d518ee0c844',
          '7daa864a-8f59-419f-9656-f72f0217dbd5',
        ],
      },
    ];
    // fixture.detectChanges();
  });

  it('should create', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should map data', () => {
    component.isLoading = false;
    fixture.detectChanges();
    let output = [
      {
        userId: '321f4d12-deeb-48ea-a8a0-039237fe8720',
        userName: 'Lê Lan Hương',
        code: 'HU1972',
        phone: '0904188060',
        email: 'huongle70@gmail.com',
        arrClasses: [
          {
            id: '70e62f10-064c-4797-a3e6-40116791a3f3',
            name: 'Chủ nhiệm 001',
            code: 'CN001',
            gradeId: 'b36e983c-e02c-4a1b-b489-fde7a2e5c323',
            homeroomTeacherId: '27a3b565-1a88-4f04-9999-42263780e8e4',
            isChecked: false,
          },
          {
            id: '03d25f30-3d12-48df-8758-9e6286e8df3c',
            name: 'Lớp chủ nhiệm 1',
            code: 'CN1',
            gradeId: 'b36e983c-e02c-4a1b-b489-fde7a2e5c323',
            homeroomTeacherId: '1446bc19-9bfa-456c-a77b-3349a68315d2',
            isChecked: false,
          },
          {
            id: '442ad76e-9033-434c-8160-be282c2a923e',
            name: 'Lớp 1A1 OMT',
            code: '1A1',
            gradeId: 'b36e983c-e02c-4a1b-b489-fde7a2e5c323',
            homeroomTeacherId: '82beed72-0432-492d-9d2a-abbf0cd908c0',
            isChecked: false,
          },
        ],
      },
      {
        userId: 'c7d32685-bfbd-414b-a680-d0c56c3a7102',
        userName: 'Lê Văn Thiện ',
        code: 'thienlv',
        phone: null,
        email: null,
        arrClasses: [
          {
            id: '70e62f10-064c-4797-a3e6-40116791a3f3',
            name: 'Chủ nhiệm 001',
            code: 'CN001',
            gradeId: 'b36e983c-e02c-4a1b-b489-fde7a2e5c323',
            homeroomTeacherId: '27a3b565-1a88-4f04-9999-42263780e8e4',
            isChecked: false,
          },
          {
            id: '03d25f30-3d12-48df-8758-9e6286e8df3c',
            name: 'Lớp chủ nhiệm 1',
            code: 'CN1',
            gradeId: 'b36e983c-e02c-4a1b-b489-fde7a2e5c323',
            homeroomTeacherId: '1446bc19-9bfa-456c-a77b-3349a68315d2',
            isChecked: false,
          },
          {
            id: '442ad76e-9033-434c-8160-be282c2a923e',
            name: 'Lớp 1A1 OMT',
            code: '1A1',
            gradeId: 'b36e983c-e02c-4a1b-b489-fde7a2e5c323',
            homeroomTeacherId: '82beed72-0432-492d-9d2a-abbf0cd908c0',
            isChecked: true,
          },
        ],
      },
      {
        userId: '82beed72-0432-492d-9d2a-abbf0cd908c0',
        userName: 'Trịnh Tuấn Anh',
        code: 'ND_01010',
        phone: '+14255550100',
        email: '',
        arrClasses: [
          {
            id: '70e62f10-064c-4797-a3e6-40116791a3f3',
            name: 'Chủ nhiệm 001',
            code: 'CN001',
            gradeId: 'b36e983c-e02c-4a1b-b489-fde7a2e5c323',
            homeroomTeacherId: '27a3b565-1a88-4f04-9999-42263780e8e4',
            isChecked: false,
          },
          {
            id: '03d25f30-3d12-48df-8758-9e6286e8df3c',
            name: 'Lớp chủ nhiệm 1',
            code: 'CN1',
            gradeId: 'b36e983c-e02c-4a1b-b489-fde7a2e5c323',
            homeroomTeacherId: '1446bc19-9bfa-456c-a77b-3349a68315d2',
            isChecked: false,
          },
          {
            id: '442ad76e-9033-434c-8160-be282c2a923e',
            name: 'Lớp 1A1 OMT',
            code: '1A1',
            gradeId: 'b36e983c-e02c-4a1b-b489-fde7a2e5c323',
            homeroomTeacherId: '82beed72-0432-492d-9d2a-abbf0cd908c0',
            isChecked: true,
          },
        ],
      },
      {
        userId: '27a3b565-1a88-4f04-9999-42263780e8e4',
        userName: 'Long Thành 1',
        code: 'longthanh1',
        phone: '09555555555',
        email: 'longthanh1@gmail.com',
        arrClasses: [
          {
            id: '70e62f10-064c-4797-a3e6-40116791a3f3',
            name: 'Chủ nhiệm 001',
            code: 'CN001',
            gradeId: 'b36e983c-e02c-4a1b-b489-fde7a2e5c323',
            homeroomTeacherId: '27a3b565-1a88-4f04-9999-42263780e8e4',
            isChecked: true,
          },
          {
            id: '03d25f30-3d12-48df-8758-9e6286e8df3c',
            name: 'Lớp chủ nhiệm 1',
            code: 'CN1',
            gradeId: 'b36e983c-e02c-4a1b-b489-fde7a2e5c323',
            homeroomTeacherId: '1446bc19-9bfa-456c-a77b-3349a68315d2',
            isChecked: false,
          },
          {
            id: '442ad76e-9033-434c-8160-be282c2a923e',
            name: 'Lớp 1A1 OMT',
            code: '1A1',
            gradeId: 'b36e983c-e02c-4a1b-b489-fde7a2e5c323',
            homeroomTeacherId: '82beed72-0432-492d-9d2a-abbf0cd908c0',
            isChecked: false,
          },
        ],
      },
    ];
    expect(component.convertData(component.arrClasses, component.arrUsers)).toEqual(output);
  });
});
