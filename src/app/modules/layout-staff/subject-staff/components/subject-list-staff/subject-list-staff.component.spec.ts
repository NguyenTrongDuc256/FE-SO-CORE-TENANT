import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectListStaffComponent } from './subject-list-staff.component';

describe('SubjectListStaffComponent', () => {
  let component: SubjectListStaffComponent;
  let fixture: ComponentFixture<SubjectListStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectListStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectListStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
