import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { CoreModule } from 'src/app/_core/core.module';
import { environment } from 'src/environments/environment.firebase';

import { AssignTeacherCourseComponent } from './assign-teacher.component';

describe('AssignTeacherCourseComponent', () => {
  let component: AssignTeacherCourseComponent;
  let fixture: ComponentFixture<AssignTeacherCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignTeacherCourseComponent],
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        getTranslocoModule(),
        CommonModule,
        NzCheckboxModule,
        CoreModule,
        NzInputModule,
      ],
      providers: [
        { provide: TRANSLOCO_SCOPE, useValue: 'declare' },
        NgbActiveModal,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTeacherCourseComponent);
    component = fixture.componentInstance;
    component.dataModal = {
      dataFromParent: {
        listUsers: [
          {
            id: '27a3b565-1a88-4f04-9999-42263780e8e4',
            fullname: 'Long Thành 1',
            code: 'longthanh1',
            username: 'longthanh1',
            gender: 3,
            birthday: 1664730000,
          },
          {
            id: '39f8430f-45ad-4d1c-a408-309bf99089bf',
            fullname: 'Đỗ Thùy Dung 123',
            code: 'omt1',
            username: 'dungdt',
            gender: 2,
            birthday: 1662310800,
          },
          {
            id: '82beed72-0432-492d-9d2a-abbf0cd908c0',
            fullname: 'Trịnh Tuấn Anh',
            code: 'ND_01010',
            username: 'gv01',
            gender: 1,
            birthday: null,
          },
          {
            id: 'd84e04e2-3dd5-48cc-9151-fe22543f645b',
            fullname: 'Nguyễn Hoàng Minh',
            code: 'ND565656',
            username: 'Minh_01',
            gender: 1,
            birthday: 1664643600,
          },
          {
            id: 'c7d32685-bfbd-414b-a680-d0c56c3a7102',
            fullname: 'Lê Văn Thiện',
            code: 'thienlv',
            username: 'thienlv',
            gender: 1,
            birthday: 1664816400,
          },
          {
            id: '57ccf7dc-ce7b-4779-83f5-146844d80506',
            fullname: 'Nguyễn Thị Hải Vân',
            code: 'ND_03873',
            username: 'Van_01',
            gender: 1,
            birthday: null,
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
        keyFirebaseAction: 'teacher',
        keyFirebaseModule: 'course/enroll',
        nameForm: 'create',
      },
    };
    component.isLoading = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
