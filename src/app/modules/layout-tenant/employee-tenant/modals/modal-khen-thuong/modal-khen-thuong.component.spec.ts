import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ModalKhenThuongComponent} from "./modal-khen-thuong.component";


describe('ModalKhenThuongComponent', () => {
  let component: ModalKhenThuongComponent;
  let fixture: ComponentFixture<ModalKhenThuongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalKhenThuongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalKhenThuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
