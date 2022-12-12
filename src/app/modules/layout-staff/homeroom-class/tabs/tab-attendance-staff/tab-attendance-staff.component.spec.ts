import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAttendanceStaffComponent } from './tab-attendance-staff.component';

describe('TabAttendanceStaffComponent', () => {
  let component: TabAttendanceStaffComponent;
  let fixture: ComponentFixture<TabAttendanceStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabAttendanceStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAttendanceStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
