import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ModalQuaTrinhDaoTaoBoiDuongComponent} from "./modal-qua-trinh-dao-tao-boi-duong.component";


describe('ModalQuaTrinhDaoTaoBoiDuongComponent', () => {
  let component: ModalQuaTrinhDaoTaoBoiDuongComponent;
  let fixture: ComponentFixture<ModalQuaTrinhDaoTaoBoiDuongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalQuaTrinhDaoTaoBoiDuongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalQuaTrinhDaoTaoBoiDuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
