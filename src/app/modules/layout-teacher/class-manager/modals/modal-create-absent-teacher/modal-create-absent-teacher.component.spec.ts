/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalCreateAbsentTeacherComponent } from './modal-create-absent-teacher.component';
import { CommonModule } from '@angular/common';
import { ClassManagerModule } from '../../class-manager.module';
import { environment } from 'src/environments/environment.firebase';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { getTranslocoModule } from 'src/app/transloco-testing.module';

describe('ModalCreateAbsentTeacherComponent', () => {
  let component: ModalCreateAbsentTeacherComponent;
  let fixture: ComponentFixture<ModalCreateAbsentTeacherComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ModalCreateAbsentTeacherComponent],
      imports: [
        CommonModule,
        ClassManagerModule,
        RouterModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        getTranslocoModule(),
      ],
      providers: [
        NgbActiveModal,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateAbsentTeacherComponent);
    component = fixture.componentInstance;
    component.dataModal = {
      dataFromParent: {},
    };
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateAbsentTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create a form with controls', () => {
    expect(component.formGroup.contains('fromDate')).toBeTruthy();
    expect(component.formGroup.contains('toDate')).toBeTruthy();
    expect(component.formGroup.contains('studentId')).toBeTruthy();
    expect(component.formGroup.contains('reason')).toBeTruthy();
    expect(component.formGroup.contains('dataAbsent')).toBeTruthy();
  });

  it('Should studentId invalid empty', () => {
    const control = component.formGroup.controls['studentId'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should form valid', () => {
    const form = component.formGroup;
    form.patchValue(
      {
        studentId: '5bc0a851-91d8-4b66-83a7-7e466fea12b9',
        fromDate: '1663901088',
        toDate: '1663901088',
        reason: 'Lý do xin nghỉ',
        attachedFile: 'Link file',
      }
    );
    expect(form.valid).toBeTrue();
  });

});
