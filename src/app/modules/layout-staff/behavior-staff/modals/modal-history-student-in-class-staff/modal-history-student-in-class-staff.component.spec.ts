import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHistoryStudentInClassStaffComponent } from './modal-history-student-in-class-staff.component';

describe('ModalHistoryStudentInClassStaffComponent', () => {
  let component: ModalHistoryStudentInClassStaffComponent;
  let fixture: ComponentFixture<ModalHistoryStudentInClassStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalHistoryStudentInClassStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHistoryStudentInClassStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
