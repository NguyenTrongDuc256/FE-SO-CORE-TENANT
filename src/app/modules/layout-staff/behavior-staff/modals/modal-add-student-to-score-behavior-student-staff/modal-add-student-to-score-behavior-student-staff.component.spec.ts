import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddStudentToScoreBehaviorStudentStaffComponent } from './modal-add-student-to-score-behavior-student-staff.component';

describe('ModalAddStudentToScoreBehaviorStudentStaffComponent', () => {
  let component: ModalAddStudentToScoreBehaviorStudentStaffComponent;
  let fixture: ComponentFixture<ModalAddStudentToScoreBehaviorStudentStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddStudentToScoreBehaviorStudentStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddStudentToScoreBehaviorStudentStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
