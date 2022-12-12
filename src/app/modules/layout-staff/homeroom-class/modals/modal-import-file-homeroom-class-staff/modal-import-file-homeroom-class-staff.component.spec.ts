import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImportFileHomeroomClassStaffComponent } from './modal-import-file-homeroom-class-staff.component';

describe('ModalImportFileHomeroomClassStaffComponent', () => {
  let component: ModalImportFileHomeroomClassStaffComponent;
  let fixture: ComponentFixture<ModalImportFileHomeroomClassStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalImportFileHomeroomClassStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalImportFileHomeroomClassStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
