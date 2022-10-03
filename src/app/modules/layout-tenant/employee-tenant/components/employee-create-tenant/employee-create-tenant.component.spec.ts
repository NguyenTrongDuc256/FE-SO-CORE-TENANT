import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslateModule} from "@ngx-translate/core";
import {EmployeeCreateTenantComponent} from "./employee-create-tenant.component";
import {EmployeeTenantModule} from "../../employee-tenant.module";

describe('EmployeeCreateTenantComponent', () => {
  let component: EmployeeCreateTenantComponent;
  let fixture: ComponentFixture<EmployeeCreateTenantComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [EmployeeCreateTenantComponent],
      imports: [
        EmployeeTenantModule,
        TranslateModule.forRoot()
      ],
      providers: [

      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCreateTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
