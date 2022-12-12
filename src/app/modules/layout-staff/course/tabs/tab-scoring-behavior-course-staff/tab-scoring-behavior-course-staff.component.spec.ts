import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabScoringBehaviorCourseStaffComponent } from './tab-scoring-behavior-course-staff.component';

describe('TabScoringBehaviorCourseStaffComponent', () => {
  let component: TabScoringBehaviorCourseStaffComponent;
  let fixture: ComponentFixture<TabScoringBehaviorCourseStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabScoringBehaviorCourseStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabScoringBehaviorCourseStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
