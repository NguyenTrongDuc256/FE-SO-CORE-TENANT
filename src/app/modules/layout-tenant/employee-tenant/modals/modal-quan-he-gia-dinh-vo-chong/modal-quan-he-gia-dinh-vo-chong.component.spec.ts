import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ModalQuanHeGiaDinhVoChongComponent} from "./modal-quan-he-gia-dinh-vo-chong.component";


describe('ModalQuanHeGiaDinhVoChongComponent', () => {
  let component: ModalQuanHeGiaDinhVoChongComponent;
  let fixture: ComponentFixture<ModalQuanHeGiaDinhVoChongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalQuanHeGiaDinhVoChongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalQuanHeGiaDinhVoChongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
