import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {RoleService} from "src/app/_services/layout-tenant/role/role.service";
import {ShowMessageService} from "src/app/_services/show-message.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {UserEditTenantComponent} from "./user-edit-tenant.component";


describe('UserEditTenantComponent', () => {
  let component: UserEditTenantComponent;
  let fixture: ComponentFixture<UserEditTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEditTenantComponent ],
      imports: [HttpClientTestingModule],
      providers: [RoleService, ShowMessageService, NzNotificationService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('init form', () => {
    console.log(component.formGroup.controls)
    expect(component.formGroup.controls.fullName).toBeTruthy();
    expect(component.formGroup.controls.code).toBeTruthy();
    expect(component.formGroup.controls.username).toBeTruthy();
    expect(component.formGroup.controls.password).toBeTruthy();
    expect(component.formGroup.controls.gender).toBeTruthy();
    expect(component.formGroup.controls.birthday).toBeTruthy();
    expect(component.formGroup.controls.email).toBeTruthy();
    expect(component.formGroup.controls.phone).toBeTruthy();
    expect(component.formGroup.controls.isActive).toBeTruthy();
    expect(component.formGroup.controls.roleId).toBeTruthy();
  });
});
// {provide: ActivatedRoute, useValue: { snapshot: {params: {id: '89fd04c2-af2f-4ea7-95d6-8644420737dc'}}}}
