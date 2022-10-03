import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ModalDiemNgoaiNguComponent} from "./modal-diem-ngoai-ngu.component";

describe('ModalDiemNgoaiNguComponent', () => {
  let component: ModalDiemNgoaiNguComponent;
  let fixture: ComponentFixture<ModalDiemNgoaiNguComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDiemNgoaiNguComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDiemNgoaiNguComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
