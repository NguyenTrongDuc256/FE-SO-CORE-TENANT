import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLockLoginComponent } from './modal-lock-login.component';

describe('ModalLockLoginComponent', () => {
  let component: ModalLockLoginComponent;
  let fixture: ComponentFixture<ModalLockLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLockLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLockLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
