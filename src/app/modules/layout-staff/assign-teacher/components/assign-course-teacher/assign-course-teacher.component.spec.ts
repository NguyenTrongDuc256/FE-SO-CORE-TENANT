import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { RouterTestingModule } from '@angular/router/testing';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgxPermissionsConfigurationStore, NgxPermissionsService, NgxPermissionsStore, NgxRolesStore } from 'ngx-permissions';
import { of } from 'rxjs';
import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { CoreModule } from 'src/app/_core/core.module';
import { AssignTeacherService } from 'src/app/_services/layout-staff/assign-teacher/assign-teacher.service';
import { environment } from 'src/environments/environment.firebase';

import { AssignCourseTeacherComponent } from './assign-course-teacher.component';

describe('AssignCourseTeacherComponent', () => {
  let component: AssignCourseTeacherComponent;
  let fixture: ComponentFixture<AssignCourseTeacherComponent>;
  let assignTeacherServiceSpy = jasmine.createSpyObj('AssignTeacherService', [
    'getListCourseToAssign', 'getListCourseTeachersToAssign'
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignCourseTeacherComponent ],
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
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignCourseTeacherComponent);
    component = fixture.componentInstance;
    assignTeacherServiceSpy.getListCourseToAssign.and.returnValue(
      of()
    );
    assignTeacherServiceSpy.getListCourseTeachersToAssign.and.returnValue(
      of()
    );
    component.isLoading = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
