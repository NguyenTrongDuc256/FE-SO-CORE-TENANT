import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgxPermissionsConfigurationStore, NgxPermissionsService, NgxPermissionsStore, NgxRolesStore } from 'ngx-permissions';
import { of } from 'rxjs';
import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { CoreModule } from 'src/app/_core/core.module';
import { AssignTeacherService } from 'src/app/_services/layout-staff/assign-teacher/assign-teacher.service';
import { environment } from 'src/environments/environment.firebase';

import { AssignMainHomeroomTeacherComponent } from './assign-main-homeroom-teacher.component';

describe('AssignMainHomeroomTeacherComponent', () => {
  let component: AssignMainHomeroomTeacherComponent;
  let fixture: ComponentFixture<AssignMainHomeroomTeacherComponent>;
  let assignTeacherServiceSpy = jasmine.createSpyObj('AssignTeacherService', [
    'getListMainHomeroomTeachers',
    'getListHomeroomClassesToAssignMainTeacher',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignMainHomeroomTeacherComponent ],
      imports: [
        CoreModule,
        CommonModule,
        RouterTestingModule,
        getTranslocoModule(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        NzSelectModule,
        BrowserAnimationsModule,
        NzRadioModule
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
    fixture = TestBed.createComponent(AssignMainHomeroomTeacherComponent);
    component = fixture.componentInstance;
    assignTeacherServiceSpy.getListMainHomeroomTeachers.and.returnValue(
      of()
    );
    assignTeacherServiceSpy.getListHomeroomClassesToAssignMainTeacher.and.returnValue(
      of()
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
