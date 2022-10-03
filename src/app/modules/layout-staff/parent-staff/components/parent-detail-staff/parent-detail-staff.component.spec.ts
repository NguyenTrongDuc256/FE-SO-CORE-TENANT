import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentDetailStaffComponent } from './parent-detail-staff.component';

describe('ParentDetailStaffComponent', () => {
  let component: ParentDetailStaffComponent;
  let fixture: ComponentFixture<ParentDetailStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentDetailStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentDetailStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
