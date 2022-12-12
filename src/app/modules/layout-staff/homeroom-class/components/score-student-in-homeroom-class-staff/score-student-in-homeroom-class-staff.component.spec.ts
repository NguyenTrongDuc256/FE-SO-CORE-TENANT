import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreStudentInHomeroomClassStaffComponent } from './score-student-in-homeroom-class-staff.component';

describe('ScoreStudentInHomeroomClassStaffComponent', () => {
  let component: ScoreStudentInHomeroomClassStaffComponent;
  let fixture: ComponentFixture<ScoreStudentInHomeroomClassStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreStudentInHomeroomClassStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreStudentInHomeroomClassStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
