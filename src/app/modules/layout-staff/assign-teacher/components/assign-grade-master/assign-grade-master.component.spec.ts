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
  NgxRolesStore,
} from 'ngx-permissions';
import { of } from 'rxjs';
import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { CoreModule } from 'src/app/_core/core.module';
import { AssignTeacherService } from 'src/app/_services/layout-staff/assign-teacher/assign-teacher.service';
import { environment } from 'src/environments/environment.firebase';

import { AssignGradeMasterComponent } from './assign-grade-master.component';

describe('AssignGradeMasterComponent', () => {
  let component: AssignGradeMasterComponent;
  let fixture: ComponentFixture<AssignGradeMasterComponent>;
  let assignTeacherServiceSpy = jasmine.createSpyObj('AssignTeacherService', [
    'getListTeacherToAssignGradeMaster',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignGradeMasterComponent],
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
    fixture = TestBed.createComponent(AssignGradeMasterComponent);
    component = fixture.componentInstance;
    component = fixture.componentInstance;
    assignTeacherServiceSpy.getListTeacherToAssignGradeMaster.and.returnValue(
      of()
    );
    component.isLoading = false;
    component.arrGrades = [
      {
        id: '2c64f5e9-625f-4bf2-87c7-60037b43cf11',
        tenantId: 'e98c5a2f-84d0-43fb-beeb-39f5f758b610',
        code: 'K5',
        name: 'Khối 5',
        educationalStages: 5,
        isActive: 1,
        indexOrder: null,
      },
      {
        id: '8df52d8a-a9cf-4a74-9b4e-8dfa0af53f62',
        tenantId: 'e98c5a2f-84d0-43fb-beeb-39f5f758b610',
        code: 'K2',
        name: 'Khối 2',
        educationalStages: 5,
        isActive: 1,
        indexOrder: null,
      },
    ];
    component.arrUsers = [
      {
        id: '39f8430f-45ad-4d1c-a408-309bf99089bf',
        name: 'Người dùng 1',
        code: 'omt1',
        phone: '0349921357',
        email: 'dungdt@omt.vn',
        gradeIds: [],
      },
      {
        id: 'd32f791b-5f11-4c95-ab58-8f069a725795',
        name: 'Quản trị viên',
        code: 'nguoidung7',
        phone: '0979772497',
        email: 'user7@gmail.com',
        gradeIds: [],
      },
      {
        id: '27a3b565-1a88-4f04-9999-42263780e8e4',
        name: 'Long Thành 1',
        code: 'longthanh1',
        phone: '09555555555',
        email: 'longthanh1@gmail.com',
        gradeIds: [],
      },
      {
        id: 'd84e04e2-3dd5-48cc-9151-fe22543f645b',
        name: 'Nguyễn Hoàng Minh',
        code: 'ND565656',
        phone: '+14255550100',
        email: 'quintt@omt.com.vn',
        gradeIds: ['b36e983c-e02c-4a1b-b489-fde7a2e5c323'],
      },
    ];
  });

  it('should create', () => {
    component.isLoading = false;
    expect(component).toBeTruthy();
  });

  it('should map data', () => {
    component.isLoading = false;
    let output = [
      {
        userId: '39f8430f-45ad-4d1c-a408-309bf99089bf',
        userName: 'Người dùng 1',
        code: 'omt1',
        phone: '0349921357',
        email: 'dungdt@omt.vn',
        arrGrades: [
          {
            id: '2c64f5e9-625f-4bf2-87c7-60037b43cf11',
            tenantId: 'e98c5a2f-84d0-43fb-beeb-39f5f758b610',
            code: 'K5',
            name: 'Khối 5',
            educationalStages: 5,
            isActive: 1,
            indexOrder: null,
            isChecked: false,
          },
          {
            id: '8df52d8a-a9cf-4a74-9b4e-8dfa0af53f62',
            tenantId: 'e98c5a2f-84d0-43fb-beeb-39f5f758b610',
            code: 'K2',
            name: 'Khối 2',
            educationalStages: 5,
            isActive: 1,
            indexOrder: null,
            isChecked: false,
          },
        ],
      },
      {
        userId: 'd32f791b-5f11-4c95-ab58-8f069a725795',
        userName: 'Quản trị viên',
        code: 'nguoidung7',
        phone: '0979772497',
        email: 'user7@gmail.com',
        arrGrades: [
          {
            id: '2c64f5e9-625f-4bf2-87c7-60037b43cf11',
            tenantId: 'e98c5a2f-84d0-43fb-beeb-39f5f758b610',
            code: 'K5',
            name: 'Khối 5',
            educationalStages: 5,
            isActive: 1,
            indexOrder: null,
            isChecked: false,
          },
          {
            id: '8df52d8a-a9cf-4a74-9b4e-8dfa0af53f62',
            tenantId: 'e98c5a2f-84d0-43fb-beeb-39f5f758b610',
            code: 'K2',
            name: 'Khối 2',
            educationalStages: 5,
            isActive: 1,
            indexOrder: null,
            isChecked: false,
          },
        ],
      },
      {
        userId: '27a3b565-1a88-4f04-9999-42263780e8e4',
        userName: 'Long Thành 1',
        code: 'longthanh1',
        phone: '09555555555',
        email: 'longthanh1@gmail.com',
        arrGrades: [
          {
            id: '2c64f5e9-625f-4bf2-87c7-60037b43cf11',
            tenantId: 'e98c5a2f-84d0-43fb-beeb-39f5f758b610',
            code: 'K5',
            name: 'Khối 5',
            educationalStages: 5,
            isActive: 1,
            indexOrder: null,
            isChecked: false,
          },
          {
            id: '8df52d8a-a9cf-4a74-9b4e-8dfa0af53f62',
            tenantId: 'e98c5a2f-84d0-43fb-beeb-39f5f758b610',
            code: 'K2',
            name: 'Khối 2',
            educationalStages: 5,
            isActive: 1,
            indexOrder: null,
            isChecked: false,
          },
        ],
      },
      {
        userId: 'd84e04e2-3dd5-48cc-9151-fe22543f645b',
        userName: 'Nguyễn Hoàng Minh',
        code: 'ND565656',
        phone: '+14255550100',
        email: 'quintt@omt.com.vn',
        arrGrades: [
          {
            id: '2c64f5e9-625f-4bf2-87c7-60037b43cf11',
            tenantId: 'e98c5a2f-84d0-43fb-beeb-39f5f758b610',
            code: 'K5',
            name: 'Khối 5',
            educationalStages: 5,
            isActive: 1,
            indexOrder: null,
            isChecked: false,
          },
          {
            id: '8df52d8a-a9cf-4a74-9b4e-8dfa0af53f62',
            tenantId: 'e98c5a2f-84d0-43fb-beeb-39f5f758b610',
            code: 'K2',
            name: 'Khối 2',
            educationalStages: 5,
            isActive: 1,
            indexOrder: null,
            isChecked: false,
          },
        ],
      },
    ];
    expect(
      component.convertData(component.arrGrades, component.arrUsers)
    ).toEqual(output);
  });
});
