import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreManyStudentInHomeroomClassStaffComponent } from './score-many-student-in-homeroom-class-staff.component';

describe('ScoreManyStudentInHomeroomClassStaffComponent', () => {
  let component: ScoreManyStudentInHomeroomClassStaffComponent;
  let fixture: ComponentFixture<ScoreManyStudentInHomeroomClassStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreManyStudentInHomeroomClassStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreManyStudentInHomeroomClassStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
