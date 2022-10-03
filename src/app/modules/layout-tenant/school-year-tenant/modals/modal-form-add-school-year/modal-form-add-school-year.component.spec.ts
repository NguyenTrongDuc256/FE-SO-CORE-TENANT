import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormAddSchoolYearComponent } from './modal-form-add-school-year.component';

describe('ModalFormAddSchoolYearComponent', () => {
  let component: ModalFormAddSchoolYearComponent;
  let fixture: ComponentFixture<ModalFormAddSchoolYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFormAddSchoolYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFormAddSchoolYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
