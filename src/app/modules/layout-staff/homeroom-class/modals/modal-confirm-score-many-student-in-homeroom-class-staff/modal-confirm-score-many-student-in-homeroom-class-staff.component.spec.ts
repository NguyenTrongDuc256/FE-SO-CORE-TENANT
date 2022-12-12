import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmScoreManyStudentInHomeroomClassStaffComponent } from './modal-confirm-score-many-student-in-homeroom-class-staff.component';

describe('ModalConfirmScoreManyStudentInHomeroomClassStaffComponent', () => {
  let component: ModalConfirmScoreManyStudentInHomeroomClassStaffComponent;
  let fixture: ComponentFixture<ModalConfirmScoreManyStudentInHomeroomClassStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConfirmScoreManyStudentInHomeroomClassStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmScoreManyStudentInHomeroomClassStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
