import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImportProfileStudentStaffComponent } from './modal-import-profile-student-staff.component';

describe('ModalImportProfileStudentStaffComponent', () => {
  let component: ModalImportProfileStudentStaffComponent;
  let fixture: ComponentFixture<ModalImportProfileStudentStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalImportProfileStudentStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalImportProfileStudentStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
