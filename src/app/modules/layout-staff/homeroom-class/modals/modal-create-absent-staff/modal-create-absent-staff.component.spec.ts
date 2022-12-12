/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment.firebase';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { ModalCreateAbsentStaffComponent } from './modal-create-absent-staff.component';
import { HomeroomClassModule } from '../../homeroom-class.module';

describe('ModalCreateAbsentStaffComponent', () => {
  let component: ModalCreateAbsentStaffComponent;
  let fixture: ComponentFixture<ModalCreateAbsentStaffComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ModalCreateAbsentStaffComponent],
      imports: [
        CommonModule,
        HomeroomClassModule,
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
    fixture = TestBed.createComponent(ModalCreateAbsentStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create a form with controls', () => {
    //component.checkedAll(1).
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
