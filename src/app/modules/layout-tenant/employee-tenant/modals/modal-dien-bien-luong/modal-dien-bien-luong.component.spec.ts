import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDienBienLuongComponent } from './modal-dien-bien-luong.component';

describe('ModalDienBienLuongComponent', () => {
  let component: ModalDienBienLuongComponent;
  let fixture: ComponentFixture<ModalDienBienLuongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDienBienLuongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDienBienLuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
