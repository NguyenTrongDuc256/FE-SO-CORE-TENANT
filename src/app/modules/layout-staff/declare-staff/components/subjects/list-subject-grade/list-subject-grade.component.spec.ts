import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import {
  NgxPermissionsConfigurationStore,
  NgxPermissionsService,
  NgxPermissionsStore,
  NgxRolesStore,
} from 'ngx-permissions';
import { of } from 'rxjs';
import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { CoreModule } from 'src/app/_core/core.module';
import { SubjectGradeStaffService } from 'src/app/_services/layout-staff/declare/subject-grade-staff.service';

import { ListSubjectGradeComponent } from './list-subject-grade.component';

describe('ListSubjectGradeComponent', () => {
  let component: ListSubjectGradeComponent;
  let fixture: ComponentFixture<ListSubjectGradeComponent>;

  let subjectGradeServiceSpy = jasmine.createSpyObj(
    'SubjectGradeStaffService',
    ['getList', 'getListReportType']
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListSubjectGradeComponent],
      imports: [
        RouterTestingModule,
        CoreModule,
        getTranslocoModule(),
        ReactiveFormsModule,
        NzCheckboxModule,
        NzInputModule,
      ],
      providers: [
        NgxPermissionsService,
        NgxPermissionsStore,
        NgxPermissionsConfigurationStore,
        NgxRolesStore,
        { provide: TRANSLOCO_SCOPE, useValue: 'declare' },
        { provide: SubjectGradeStaffService, useValue: subjectGradeServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSubjectGradeComponent);
    component = fixture.componentInstance;
    component.arrGrades = [
      {
        id: '51f7c9b6-5834-4ab8-a23a-27b941753cz3',
        educationalStages: 1,
        code: 'K3',
        isActive: 1,
        name: 'Khối 3',
        tenantId: 'e98c5a2f-84d0-43fb-beeb-39f5f758b610',
      },
      {
        id: '37978dd1-63f8-4d05-a40e-c389de4b0ez4"',
        educationalStages: 1,
        code: 'K4',
        isActive: 1,
        name: 'Khối 4',
        tenantId: 'e98c5a2f-84d0-43fb-beeb-39f5f758b610',
      },
    ];
    subjectGradeServiceSpy.getList.and.returnValue(of());
    subjectGradeServiceSpy.getListReportType.and.returnValue(of());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should map true name status 1', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component.mapNameStatus(1)).toEqual('activated');
  });

  it('should map true name status 0', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component.mapNameStatus(0)).toEqual('locked');
  });

  it('should map false name status', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component.mapNameStatus(3)).toEqual('--');
  });
});
