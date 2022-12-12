import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHistoryStudentInHomeroomClassStaffComponent } from './modal-history-student-in-homeroom-class-staff.component';

describe('ModalHistoryStudenInHomeroomClassStaffComponent', () => {
  let component: ModalHistoryStudentInHomeroomClassStaffComponent;
  let fixture: ComponentFixture<ModalHistoryStudentInHomeroomClassStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalHistoryStudentInHomeroomClassStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHistoryStudentInHomeroomClassStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
