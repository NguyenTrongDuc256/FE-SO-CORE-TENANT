import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmScoreStudentInHomeroomClassStaffComponent } from './modal-confirm-score-student-in-homeroom-class-staff.component';

describe('ModalConfirmScoreStudentInHomeroomClassStaffComponent', () => {
  let component: ModalConfirmScoreStudentInHomeroomClassStaffComponent;
  let fixture: ComponentFixture<ModalConfirmScoreStudentInHomeroomClassStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConfirmScoreStudentInHomeroomClassStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmScoreStudentInHomeroomClassStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
