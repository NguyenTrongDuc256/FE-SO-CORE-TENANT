import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentEditStaffComponent } from './parent-edit-staff.component';

describe('ParentEditStaffComponent', () => {
  let component: ParentEditStaffComponent;
  let fixture: ComponentFixture<ParentEditStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentEditStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentEditStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
