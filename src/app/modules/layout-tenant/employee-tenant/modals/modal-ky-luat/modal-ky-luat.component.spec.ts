import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ModalKyLuatComponent} from "./modal-ky-luat.component";


describe('ModalKyLuatComponent', () => {
  let component: ModalKyLuatComponent;
  let fixture: ComponentFixture<ModalKyLuatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalKyLuatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalKyLuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
