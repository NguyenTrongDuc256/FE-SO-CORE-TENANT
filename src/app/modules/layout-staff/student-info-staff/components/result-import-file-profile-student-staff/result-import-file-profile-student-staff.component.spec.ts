import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultImportFileProfileStudentStaffComponent } from './result-import-file-profile-student-staff.component';

describe('ResultImportFileProfileStudentStaffComponent', () => {
  let component: ResultImportFileProfileStudentStaffComponent;
  let fixture: ComponentFixture<ResultImportFileProfileStudentStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultImportFileProfileStudentStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultImportFileProfileStudentStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
