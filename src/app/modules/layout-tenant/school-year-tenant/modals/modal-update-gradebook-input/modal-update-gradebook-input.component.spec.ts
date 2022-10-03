import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateGradebookInputComponent } from './modal-update-gradebook-input.component';

describe('ModalUpdateGradebookInputComponent', () => {
  let component: ModalUpdateGradebookInputComponent;
  let fixture: ComponentFixture<ModalUpdateGradebookInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUpdateGradebookInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUpdateGradebookInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
