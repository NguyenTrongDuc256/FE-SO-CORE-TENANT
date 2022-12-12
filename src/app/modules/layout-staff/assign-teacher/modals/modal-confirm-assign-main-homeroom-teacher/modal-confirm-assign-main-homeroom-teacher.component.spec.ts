import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { CoreModule } from 'src/app/_core/core.module';
import { environment } from 'src/environments/environment.firebase';

import { ModalConfirmAssignMainHomeroomTeacherComponent } from './modal-confirm-assign-main-homeroom-teacher.component';

describe('ModalConfirmAssignMainHomeroomTeacherComponent', () => {
  let component: ModalConfirmAssignMainHomeroomTeacherComponent;
  let fixture: ComponentFixture<ModalConfirmAssignMainHomeroomTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConfirmAssignMainHomeroomTeacherComponent ],
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        getTranslocoModule(),
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        CoreModule,
        NzRadioModule
      ],
      providers: [
        { provide: TRANSLOCO_SCOPE, useValue: 'assign-teacher' },
        NgbActiveModal,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmAssignMainHomeroomTeacherComponent);
    component = fixture.componentInstance;
    component.dataModal = {
      dataFromParent: {
        classInfo: {
          id: 2,
          name: 'Lớp 2',
          code: 'omt2',
          gradeId: '2c64f5e9-625f-4bf2-87c7-60037b43cf11',
          gradeName: 'Khối 2',
          homeroomTeacherId: 1,
          oldTeacherId: 2
        },
        dataInput: {
          classId: 2,
          moveOut: 0,
          teacherId: 1
        },
        userInfo: {
          code: 'gv01',
          id: 1,
          name: 'giao vien 1'
        }
      },
    };
    component.isLoading = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
