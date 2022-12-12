import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryScoreStudentInHomeroomClassStaffComponent } from './history-score-student-in-homeroom-class-staff.component';

describe('HistoryScoreStudentInHomeroomClassStaffComponent', () => {
  let component: HistoryScoreStudentInHomeroomClassStaffComponent;
  let fixture: ComponentFixture<HistoryScoreStudentInHomeroomClassStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryScoreStudentInHomeroomClassStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryScoreStudentInHomeroomClassStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
