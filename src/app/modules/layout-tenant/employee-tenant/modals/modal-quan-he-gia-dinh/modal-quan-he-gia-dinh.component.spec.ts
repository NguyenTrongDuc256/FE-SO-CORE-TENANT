import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ModalQuanHeGiaDinhComponent} from "./modal-quan-he-gia-dinh.component";


describe('ModalQuanHeGiaDinhComponent', () => {
  let component: ModalQuanHeGiaDinhComponent;
  let fixture: ComponentFixture<ModalQuanHeGiaDinhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalQuanHeGiaDinhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalQuanHeGiaDinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
