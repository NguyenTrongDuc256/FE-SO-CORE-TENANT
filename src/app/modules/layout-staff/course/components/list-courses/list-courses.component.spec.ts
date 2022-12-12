import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { NzInputModule } from 'ng-zorro-antd/input';
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
import { TrainingService } from 'src/app/_services/layout-staff/training/training.service';

import { ListCoursesStaffComponent } from './list-courses.component';

describe('ListHomeroomClassesComponent', () => {
  let component: ListCoursesStaffComponent;
  let fixture: ComponentFixture<ListCoursesStaffComponent>;

  let trainingServiceSpy = jasmine.createSpyObj('TrainingService', [
    'getListCourses',
    'getListHomeroomClasses',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCoursesStaffComponent],
      imports: [
        CoreModule,
        CommonModule,
        RouterTestingModule,
        NzInputModule,
        NzSelectModule,
        getTranslocoModule(),
      ],
      providers: [
        { provide: TRANSLOCO_SCOPE, useValue: 'declare' },
        { provide: TrainingService, useValue: trainingServiceSpy },
        NgxPermissionsService,
        NgxPermissionsStore,
        NgxPermissionsConfigurationStore,
        NgxRolesStore,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCoursesStaffComponent);
    component = fixture.componentInstance;
    trainingServiceSpy.getListCourses.and.returnValue(of());
    trainingServiceSpy.getListHomeroomClasses.and.returnValue(of());
    component.arrGrades = [
      {
        id: '51f7c9b6-5834-4ab8-a23a-27b941753cz3',
        tenantId: 'e98c5a2f-84d0-43fb-beeb-39f5f758b610',
        code: 'K3',
        name: 'Khối 3',
        educationalStages: 1,
        isActive: 1,
      },
      {
        id: '37978dd1-63f8-4d05-a40e-c389de4b0ez4',
        tenantId: 'e98c5a2f-84d0-43fb-beeb-39f5f758b610',
        code: 'K4',
        name: 'Khối 4',
        educationalStages: 1,
        isActive: 1,
      },
      {
        id: '5c423c65-2655-4da4-ba06-dd0f77a9b1z5',
        tenantId: 'e98c5a2f-84d0-43fb-beeb-39f5f758b610',
        code: 'K5',
        name: 'Khối 5',
        educationalStages: 1,
        isActive: 1,
      },
    ];
    component.arrSubject = [
      {
        id: 'a0e0b62c-8efb-49fe-b9db-0e25231ef04f',
        tenantId: 'e98c5a2f-84d0-43fb-beeb-39f5f758b610',
        code: 'MH12345',
        name: 'Toán học',
        indexOrder: 0,
        subjectType: 1,
        educationalStages: [3],
        isActive: 1,
      },
      {
        id: '1248f7e2-f8c0-4fce-9697-025ad813f99d',
        tenantId: '00000000-0000-0000-0000-000000000000',
        code: 'TO',
        name: 'Môn Lịch sử 10',
        indexOrder: 0,
        subjectType: 1,
        educationalStages: [5, 3],
        isActive: 0,
      },
      {
        id: 'f723b64a-fa20-42f1-b771-7e158c5839d3',
        tenantId: '00000000-0000-0000-0000-000000000000',
        code: 'MH928',
        name: 'Môn Lịch sử 10',
        indexOrder: 0,
        subjectType: 1,
        educationalStages: [5, 3],
        isActive: 1,
      },
    ];
    component.isLoading = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.isLoading = false;
    expect(component).toBeTruthy();
  });

  it('should map name status course', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component.mapStatus(1, component.arrStatus)).toEqual(
      'underConstruction'
    );
  });

  it('should map name grade', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(
      component.mapName(
        '51f7c9b6-5834-4ab8-a23a-27b941753cz3',
        component.arrGrades
      )
    ).toEqual('Khối 3');
  });

  it('should map name subject', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(
      component.mapName(
        'a0e0b62c-8efb-49fe-b9db-0e25231ef04f',
        component.arrSubject
      )
    ).toEqual('Toán học');
  });
});
