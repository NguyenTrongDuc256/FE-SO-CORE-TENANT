import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ModalQuaTrinhCongTacComponent} from "./modal-qua-trinh-cong-tac.component";


describe('ModalQuaTrinhCongTacComponent', () => {
  let component: ModalQuaTrinhCongTacComponent;
  let fixture: ComponentFixture<ModalQuaTrinhCongTacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalQuaTrinhCongTacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalQuaTrinhCongTacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
