/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ClassManagerModule } from '../../class-manager.module';
import { environment } from 'src/environments/environment.firebase';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { ModalUpdateAbsentTeacherComponent } from './modal-update-absent-teacher.component';

describe('ModalUpdateAbsentTeacherComponent', () => {
  let component: ModalUpdateAbsentTeacherComponent;
  let fixture: ComponentFixture<ModalUpdateAbsentTeacherComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ModalUpdateAbsentTeacherComponent],
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
    fixture = TestBed.createComponent(ModalUpdateAbsentTeacherComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    const data1 = {
      id: '5bc0a851-91d8-4b66-83a7-7e466fea12b9',
      name: 'Đơn xin nghỉ học ngày hôm nay',
      studentId: '5bc0a851-91d8-4b66-83a7-7e466fea12b9',
      studentName: 'Nguyễn Văn A',
      sendBy: 'Nguyễn Công Minh',
      fromDate: '1663901088',
      toDate: '1663901088',
      attachedFile: 'Link file',
      reason: 'Lý do xin nghỉ',
      data: [
        {
          date: '1663901088',
          busId: '5bc0a851-91d8-4b66-83a7-7e466fea12b9',
          busName: 'Nghỉ chiều đi',
          period: [
            {
              periodId: '5bc0a851-91d8-4b66-83a7-7e466fea12b9',
              periodName: 'Tiết 1',
              periodTime: '07:15 - 08:00'
            }
          ],
          meal: [
            {
              mealId: '5bc0a851-91d8-4b66-83a7-7e466fea12b9',
              mealName: 'Nghỉ chiều đi',
            }
          ]
        }
      ]
    }

    component.dataModal = data1.data;
    component.ngOnInit();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUpdateAbsentTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('Should create a form with controls', () => {
  //   //component.checkedAll(1).
  //   expect(component.formGroup.contains('fromDate')).toBeTruthy();
  //   expect(component.formGroup.contains('toDate')).toBeTruthy();
  //   expect(component.formGroup.contains('studentId')).toBeTruthy();
  //   expect(component.formGroup.contains('reason')).toBeTruthy();
  //   expect(component.formGroup.contains('dataAbsent')).toBeTruthy();
  // });

  // it('Should studentId invalid empty', () => {
  //   const control = component.formGroup.controls['studentId'];
  //   control.setValue('');
  //   expect(control.invalid).toBeTruthy();
  // });

  // it('Should form valid', () => {
  //   const form = component.formGroup;
  //   form.patchValue(
  //     {
  //       studentId: '5bc0a851-91d8-4b66-83a7-7e466fea12b9',
  //       fromDate: '1663901088',
  //       toDate: '1663901088',
  //       reason: 'Lý do xin nghỉ',
  //       attachedFile: 'Link file',
  //     }
  //   );
  //   expect(form.valid).toBeTrue();
  // });
});
