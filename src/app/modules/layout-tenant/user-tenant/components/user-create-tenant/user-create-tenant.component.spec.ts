import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UserCreateTenantComponent} from './user-create-tenant.component';
import {RoleService} from "src/app/_services/layout-tenant/role/role.service";
import {UserTenantModule} from "../../user-tenant.module";
import {ListenFirebaseService} from "../../../../../_services/listen-firebase.service";
import {Router} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {translate, TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {getTranslocoModule} from "../../../../../transloco-testing.module";
describe('UserCreateTenantComponent', () => {
  let component: UserCreateTenantComponent;
  let fixture: ComponentFixture<UserCreateTenantComponent>;

  beforeEach(async () => {
    const mockRoleService = jasmine.createSpyObj('RoleService', ['getList']);
    const mockListenFirebaseService = jasmine.createSpyObj('ListenFirebaseService', ['checkFireBase']);
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [UserCreateTenantComponent],
      imports: [
        UserTenantModule,
        HttpClientTestingModule,
        RouterTestingModule,
        getTranslocoModule(),
      ],
      providers: [
        {provide: RoleService, useValue: mockRoleService},
        {provide: ListenFirebaseService, useValue: mockListenFirebaseService},
        {provide: Router, useValue: mockRouter},
        {provide: TRANSLOCO_SCOPE, useValue: { scope: 'user' },
        },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('init form', () => {
    expect(component.formGroup.contains('fullName')).toBeTruthy();
    expect(component.formGroup.contains('code')).toBeTruthy();
    expect(component.formGroup.contains('username')).toBeTruthy();
    expect(component.formGroup.contains('password')).toBeTruthy();
    expect(component.formGroup.contains('gender')).toBeTruthy();
    expect(component.formGroup.contains('birthday')).toBeTruthy();
    expect(component.formGroup.contains('email')).toBeTruthy();
    expect(component.formGroup.contains('phone')).toBeTruthy();
    expect(component.formGroup.contains('isActive')).toBeTruthy();
    expect(component.formGroup.contains('roleId')).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.formGroup.valid).toBeFalsy();
  });
  it('fullName field validity', () => {
    let fullName = component.formGroup.controls['fullName'];
    expect(fullName.valid).toBeFalsy();
  });
  it('code field validity', () => {
    let code = component.formGroup.controls['code'];
    expect(code.valid).toBeFalsy();
  });
  it('username field validity', () => {
    let username = component.formGroup.controls['username'];
    expect(username.valid).toBeFalsy();
  });
  it('password field validity', () => {
    let password = component.formGroup.controls['password'];
    expect(password.valid).toBeFalsy();
  });
});
