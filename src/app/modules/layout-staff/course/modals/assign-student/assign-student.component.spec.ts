import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
import { TrainingService } from 'src/app/_services/layout-staff/training/training.service';
import { environment } from 'src/environments/environment.firebase';
import { CourseModule } from '../../course.module';

import { AssignStudentCourseComponent } from './assign-student.component';

describe('AssignStudentCourseComponent', () => {
  let component: AssignStudentCourseComponent;
  let fixture: ComponentFixture<AssignStudentCourseComponent>;
  let trainingServiceSpy = jasmine.createSpyObj('TrainingService', [
    'getListHomeroomClasses',
    'getListStudentToAssignCourse',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignStudentCourseComponent],
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        getTranslocoModule(),
        CommonModule,
        NzCheckboxModule,
        CoreModule,
        NzInputModule,
        CourseModule,
      ],
      providers: [
        { provide: TRANSLOCO_SCOPE, useValue: 'declare' },
        NgbActiveModal,
        { provide: TrainingService, useValue: trainingServiceSpy },
        NgxPermissionsService,
        NgxPermissionsStore,
        NgxPermissionsConfigurationStore,
        NgxRolesStore,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignStudentCourseComponent);
    component = fixture.componentInstance;
    component.dataModal = {
      dataFromParent: {
        listUsers: [
          {
            id: 'a0ab91f5-6f0c-49c8-8a73-d740cb3a8efc',
            fullname: 'Học sinh 1',
            code: 'hs1',
            username: 'hs001',
            gender: 1,
            birthday: 1430956800,
          },
          {
            id: '184d3cf1-a319-4f07-b419-f76c9eda4fa6',
            fullname: 'Hoàng Duy Phong',
            code: 'HDP',
            username: 'HDPhong',
            gender: 1,
            birthday: 767664000,
          },
        ],
        collectionSize: 0,
        schoolYear: '',
        infoClass: {
          id: '0ddd6c8e-7602-46f3-a061-b6f9c81dbdc7',
          name: 'Lớp toan 4a4979',
          code: 'OMT912344',
          gradeName: 'Khối 1',
        },
        service: trainingServiceSpy,
        keyFirebaseAction: 'student',
        keyFirebaseModule: 'course/enroll',
        nameForm: 'create',
      },
    };
    trainingServiceSpy.getListHomeroomClasses.and.returnValue(of());
    component.isLoading = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
