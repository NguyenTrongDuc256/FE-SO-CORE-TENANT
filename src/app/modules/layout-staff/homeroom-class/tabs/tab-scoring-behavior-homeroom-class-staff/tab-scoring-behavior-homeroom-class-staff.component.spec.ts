import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabScoringBehaviorHomeroomClassStaffComponent } from './tab-scoring-behavior-homeroom-class-staff.component';

describe('TabScoringBehaviorHomeroomClassStaffComponent', () => {
  let component: TabScoringBehaviorHomeroomClassStaffComponent;
  let fixture: ComponentFixture<TabScoringBehaviorHomeroomClassStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabScoringBehaviorHomeroomClassStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabScoringBehaviorHomeroomClassStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
