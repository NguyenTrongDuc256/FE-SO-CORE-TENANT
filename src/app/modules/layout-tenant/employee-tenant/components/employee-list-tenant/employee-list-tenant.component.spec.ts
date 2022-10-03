
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {EmployeeListTenantComponent} from "./employee-list-tenant.component";


describe('EmployeeListTenantComponent', () => {
  let component: EmployeeListTenantComponent;
  let fixture: ComponentFixture<EmployeeListTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeListTenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
