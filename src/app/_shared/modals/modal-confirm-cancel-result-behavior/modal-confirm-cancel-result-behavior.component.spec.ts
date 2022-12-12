import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ModalConfirmCancelResultBehaviorComponent} from "./modal-confirm-cancel-result-behavior.component";


describe('ModalConfirmCancelResultBehaviorComponent', () => {
  let component: ModalConfirmCancelResultBehaviorComponent;
  let fixture: ComponentFixture<ModalConfirmCancelResultBehaviorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConfirmCancelResultBehaviorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmCancelResultBehaviorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
