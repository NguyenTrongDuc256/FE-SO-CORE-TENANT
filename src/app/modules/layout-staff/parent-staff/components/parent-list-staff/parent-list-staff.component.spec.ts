import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentListStaffComponent } from './parent-list-staff.component';

describe('ParentListStaffComponent', () => {
  let component: ParentListStaffComponent;
  let fixture: ComponentFixture<ParentListStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentListStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentListStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
