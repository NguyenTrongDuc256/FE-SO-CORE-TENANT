import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ModalDanhGiaChuanNgheNghiepComponent} from "./modal-danh-gia-chuan-nghe-nghiep.component";


describe('ModalDanhGiaChuanNgheNghiepComponent', () => {
  let component: ModalDanhGiaChuanNgheNghiepComponent;
  let fixture: ComponentFixture<ModalDanhGiaChuanNgheNghiepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDanhGiaChuanNgheNghiepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDanhGiaChuanNgheNghiepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
