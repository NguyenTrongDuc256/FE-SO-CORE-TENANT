import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalSwitchEmployeeEditComponent } from './modal-switch-employee-edit.component';


describe('ModalKyLuatComponent', () => {
  let component: ModalSwitchEmployeeEditComponent;
  let fixture: ComponentFixture<ModalSwitchEmployeeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSwitchEmployeeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSwitchEmployeeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
