import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateStatusComponent } from './modal-update-status.component';

describe('ModalUpdateStatusComponent', () => {
  let component: ModalUpdateStatusComponent;
  let fixture: ComponentFixture<ModalUpdateStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUpdateStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUpdateStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
