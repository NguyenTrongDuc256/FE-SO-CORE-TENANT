import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormEditSchoolYearComponent } from './modal-form-edit-school-year.component';

describe('ModalFormEditSchoolYearComponent', () => {
  let component: ModalFormEditSchoolYearComponent;
  let fixture: ComponentFixture<ModalFormEditSchoolYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFormEditSchoolYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFormEditSchoolYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
