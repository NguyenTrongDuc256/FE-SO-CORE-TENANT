import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  NgxPermissionsConfigurationStore,
  NgxPermissionsStore,
  NgxRolesStore
} from 'ngx-permissions';
import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { AuthModule } from '../../auth.module';

import { SelectLayoutUnitComponent } from './select-layout-unit.component';

describe('SelectLayoutUnitComponent', () => {
  let component: SelectLayoutUnitComponent;
  let fixture: ComponentFixture<SelectLayoutUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectLayoutUnitComponent],
      imports: [RouterTestingModule, getTranslocoModule(), AuthModule],
      providers: [
        NgxPermissionsStore,
        NgxPermissionsConfigurationStore,
        NgxRolesStore,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectLayoutUnitComponent);
    component = fixture.componentInstance;
    component.dataLogin = {
      User: {
        Id: 'd32f791b-5f11-4c95-ab58-8f069a725795',
        Code: 'nguoidung7',
        Username: 'admin',
        FullName: 'Quản trị viên',
        ForeignName: null,
        Email: 'user7@gmail.com',
        Phone: '0979772497',
        Avatar: '',
      },
      Tenant: {
        Id: 'e98c5a2f-84d0-43fb-beeb-39f5f758b610',
        Code: 'bris',
        Name: 'Công ty giáo dục Bris (không được xoá)',
      },
      Layouts: ['student', 'tenant', 'teacher', 'staff'],
      OmtLayout: null,
      DepartmentLayout: [
        {
          DepartmentCode: 'hn',
          DepartmentName: 'Sở Hà Nội',
          Permissions: ['manager_access', 'student_manager', 'bus_manager'],
        },
        {
          DepartmentCode: 'hp',
          DepartmentName: 'Sở Hải Phòng',
          Permissions: ['manager_access', 'student_manager', 'bus_manager'],
        },
      ],
      DivisionLayout: [
        {
          DivisionCode: 'hn',
          DivisionName: 'Phòng Hà Nội',
          Permissions: ['manager_access', 'student_manager', 'bus_manager'],
        },
        {
          DivisionCode: 'hp',
          DivisionName: 'Phòng Hải Phòng',
          Permissions: ['manager_access', 'student_manager', 'bus_manager'],
        },
      ],
      SchoolLayout: [
        {
          SchoolCode: 'hn',
          SchoolName: 'Trường Hà Nội',
          Permissions: ['manager_access', 'student_manager', 'bus_manager'],
        },
        {
          SchoolCode: 'hp',
          SchoolName: 'Trường Hải Phòng',
          Permissions: ['manager_access', 'student_manager', 'bus_manager'],
        },
      ],
      TenantLayout: {
        Permissions: [
          'school_year_access',
          'school_year_manager',
          'school_access',
          'school_manager',
          'student_view',
          'student_modify',
          'student_sync',
          ,
        ],
      },
      CampusLayout: [
        {
          CampusId: 'hn',
          CampusName: 'Campus Hà Nội',
          Permissions: ['manager_access', 'student_manager', 'bus_manager'],
        },
        {
          CampusId: 'hp',
          CampusName: 'Campus Hải Phòng',
          Permissions: ['manager_access', 'student_manager', 'bus_manager'],
        },
      ],
      StaffLayout: [
        {
          SchoolId: 'a7e3a37d-c9a8-4534-94b1-ce9b7283aecf',
          SchoolName: 'Trường Tiểu học Ba Đình (không được xoá)',
          Permissions: [
            'student_view',
            'student_modify',
            'parent_view',
            'parent_modify',
            'subject_grade_access',
            'subject_grade_manager',
          ],
        },
      ],
      TeacherLayout: [
        {
          SchoolId: 'a7e3a37d-c9a8-4534-94b1-ce9b7283aecf',
          SchoolName: 'Trường Tiểu học Ba Đình (không được xoá)',
          Permissions: [
            'module_view',
            'module_modify',
            'view_list_module',
            'view_list_students',
          ],
        },
      ],
      ParentLayout: {
        Students: [
          {
            Id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            FullName: 'abc',
            SchoolId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          },
          {
            Id: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
            FullName: 'def',
            SchoolId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          },
        ],
        Permissions: ['manager_access', 'student_manager', 'bus_manager'],
      },
      StudentLayout: {
        SchoolYearSchools: [
          {
            SchoolId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            SchoolYearId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          }
        ],
        Permissions: ['student_view', 'student_modify'],
      },
      AppType: 0,
      AppVersion: null,
      DeviceType: 2,
      DeviceId: null,
      DeviceName: null,
      DeviceOs: null,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should map layout out omt', () => {
    component.layoutCode = 'omt';
    let output = [];
    expect(
      component.mapDataLayout(component.layoutCode, component.dataLogin)
    ).toEqual(output);
  });

  it('should map layout out tenant', () => {
    component.layoutCode = 'tenant';
    let output = [];
    expect(
      component.mapDataLayout(component.layoutCode, component.dataLogin)
    ).toEqual(output);
  });

  it('should map layout out department', () => {
    component.layoutCode = 'department';
    let output = [
      {
        id: 'hn',
        name: 'Sở Hà Nội',
        permissions: ['manager_access', 'student_manager', 'bus_manager'],
      },
      {
        id: 'hp',
        name: 'Sở Hải Phòng',
        permissions: ['manager_access', 'student_manager', 'bus_manager'],
      },
    ];
    expect(
      component.mapDataLayout(component.layoutCode, component.dataLogin)
    ).toEqual(output);
  });

  it('should map layout out division', () => {
    component.layoutCode = 'division';
    let output = [
      {
        id: 'hn',
        name: 'Phòng Hà Nội',
        permissions: ['manager_access', 'student_manager', 'bus_manager'],
      },
      {
        id: 'hp',
        name: 'Phòng Hải Phòng',
        permissions: ['manager_access', 'student_manager', 'bus_manager'],
      },
    ];
    expect(
      component.mapDataLayout(component.layoutCode, component.dataLogin)
    ).toEqual(output);
  });

  it('should map layout out school', () => {
    component.layoutCode = 'school';
    let output = [
      {
        id: 'hn',
        name: 'Trường Hà Nội',
        permissions: ['manager_access', 'student_manager', 'bus_manager'],
      },
      {
        id: 'hp',
        name: 'Trường Hải Phòng',
        permissions: ['manager_access', 'student_manager', 'bus_manager'],
      },
    ];
    expect(
      component.mapDataLayout(component.layoutCode, component.dataLogin)
    ).toEqual(output);
  });

  it('should map layout out campus', () => {
    component.layoutCode = 'campus';
    let output = [
      {
        id: 'hn',
        name: 'Campus Hà Nội',
        permissions: ['manager_access', 'student_manager', 'bus_manager'],
      },
      {
        id: 'hp',
        name: 'Campus Hải Phòng',
        permissions: ['manager_access', 'student_manager', 'bus_manager'],
      },
    ];
    expect(
      component.mapDataLayout(component.layoutCode, component.dataLogin)
    ).toEqual(output);
  });

  it('should map layout out teacher', () => {
    component.layoutCode = 'teacher';
    let output = [
      {
        id: 'a7e3a37d-c9a8-4534-94b1-ce9b7283aecf',
        name: 'Trường Tiểu học Ba Đình (không được xoá)',
        permissions: [
          'module_view',
          'module_modify',
          'view_list_module',
          'view_list_students',
        ],
      },
    ];
    expect(
      component.mapDataLayout(component.layoutCode, component.dataLogin)
    ).toEqual(output);
  });

  it('should map layout out staff', () => {
    component.layoutCode = 'staff';
    let output = [
      {
        id: 'a7e3a37d-c9a8-4534-94b1-ce9b7283aecf',
        name: 'Trường Tiểu học Ba Đình (không được xoá)',
        permissions: [
          'student_view',
          'student_modify',
          'parent_view',
          'parent_modify',
          'subject_grade_access',
          'subject_grade_manager',
        ],
      },
    ];
    expect(
      component.mapDataLayout(component.layoutCode, component.dataLogin)
    ).toEqual(output);
  });

  it('should map layout out student', () => {
    component.layoutCode = 'student';
    let output = [];
    expect(
      component.mapDataLayout(component.layoutCode, component.dataLogin)
    ).toEqual(output);
  });

  it('should map layout out parent', () => {
    component.layoutCode = 'parent';
    let output = [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'abc',
        schoolId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        permissions: ['manager_access', 'student_manager', 'bus_manager'],
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
        name: 'def',
        schoolId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        permissions: ['manager_access', 'student_manager', 'bus_manager'],
      },
    ];
    expect(
      component.mapDataLayout(component.layoutCode, component.dataLogin)
    ).toEqual(output);
  });
});
