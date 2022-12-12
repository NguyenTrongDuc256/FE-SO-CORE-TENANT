import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabScoringBehaviorIndexStaffComponent } from './tab-scoring-behavior-index-staff.component';

describe('TabScoringBehaviorIndexStaffComponent', () => {
  let component: TabScoringBehaviorIndexStaffComponent;
  let fixture: ComponentFixture<TabScoringBehaviorIndexStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabScoringBehaviorIndexStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabScoringBehaviorIndexStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
