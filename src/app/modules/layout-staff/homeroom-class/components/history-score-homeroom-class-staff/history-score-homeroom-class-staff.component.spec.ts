import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryScoreHomeroomClassStaffComponent } from './history-score-homeroom-class-staff.component';

describe('HistoryScoreHomeroomClassStaffComponent', () => {
  let component: HistoryScoreHomeroomClassStaffComponent;
  let fixture: ComponentFixture<HistoryScoreHomeroomClassStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryScoreHomeroomClassStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryScoreHomeroomClassStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
