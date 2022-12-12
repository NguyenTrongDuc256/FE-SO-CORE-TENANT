import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UserCreateTenantComponent} from './user-create-tenant.component';
import {RoleService} from "src/app/_services/layout-tenant/role/role.service";
import {UserTenantModule} from "../../user-tenant.module";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {TRANSLOCO_SCOPE, TranslocoModule} from '@ngneat/transloco';
import {getTranslocoModule} from "../../../../../transloco-testing.module";
import {UserTenantRoutingModule} from "../../user-tenant-routing.module";
import {CommonModule} from "@angular/common";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../../../../environments/environment.firebase";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {NgxDaterangepickerMd} from "ngx-daterangepicker-material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BehaviorSubject, of} from "rxjs";

describe('UserCreateTenantComponent', () => {
  let component: UserCreateTenantComponent;
  let fixture: ComponentFixture<UserCreateTenantComponent>;
  const paramsSubject = new BehaviorSubject({});
  const fakeActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => 1,
      },
    },
    queryParams: {id: 'testABC'},
    params: paramsSubject,
  };

  const roleServiceSpy = jasmine.createSpyObj('RoleService', ['getList']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserCreateTenantComponent],
      imports: [
        UserTenantModule,
        UserTenantRoutingModule,
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        getTranslocoModule(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        NgxDaterangepickerMd.forRoot(),
        TranslocoModule,
        BrowserAnimationsModule,
        RouterModule,
      ],
      providers: [
        {provide: TRANSLOCO_SCOPE, useValue: 'user'},
        {provide: RoleService, useValue: roleServiceSpy},
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateTenantComponent);
    component = fixture.componentInstance;
    roleServiceSpy.getList.and.returnValue(of());
    fixture.detectChanges();
  });

  it('should create', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('Should create a form with controls', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component.formGroup.contains('avatar')).toBeTruthy();
    expect(component.formGroup.contains('fullName')).toBeTruthy();
    expect(component.formGroup.contains('code')).toBeTruthy();
    expect(component.formGroup.contains('username')).toBeTruthy();
    expect(component.formGroup.contains('password')).toBeTruthy();
    expect(component.formGroup.contains('gender')).toBeTruthy();
    expect(component.formGroup.contains('birthday')).toBeTruthy();
    expect(component.formGroup.contains('email')).toBeTruthy();
    expect(component.formGroup.contains('phone')).toBeTruthy();
    expect(component.formGroup.contains('isActive')).toBeTruthy();
    expect(component.formGroup.contains('isAccessApp')).toBeTruthy();
    expect(component.formGroup.contains('roleId')).toBeTruthy();
    expect(component.formGroup.contains('campusId')).toBeTruthy();
    expect(component.formGroup.contains('schoolId')).toBeTruthy();
  });

  it('Should form valid', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const formGroup = component.formGroup;
    formGroup.patchValue({
      avatar: 'https://schoolonline-rebuild-dev.s3-ap-southeast-1.amazonaws.com/SO/2022/07/25/files/uploads/1658721291_1658721299786-Group 1000003688.png',
      fullName: 'Tên của bạn',
      code: 'OMTCode',
      username: 'username',
      password: '123456',
      gender: 1,
      birthday: 1662742800,
      email: '',
      phone: '',
      isActive: true,
      isAccessApp: true,
      roleId: 'd32f791b-5f11-4c95-ab58-8f069a725798',
      campusId: 'd32f791b-5f11-4c95-ab58-8f069a725798',
      schoolId: 'd32f791b-5f11-4c95-ab58-8f069a725798',

    });
    expect(formGroup.valid).toBeTrue();
  });

  it('Should fullName invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['fullName'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should fullName invalid maxLength', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['fullName'];
    control.setValue('Tên của tui đâyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy maxlength là 255 ký tự nhé, text này 256 ký tự đó heheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    expect(control.invalid).toBeTruthy();
  });

  it('Should code invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['code'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should code invalid maxLength', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['code'];
    control.setValue('textnay56kytunheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    expect(control.invalid).toBeTruthy();
  });

  it('Should code invalid pattern', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['code'];
    control.setValue('code co khoang trang nay');
    expect(control.invalid).toBeTruthy();
  });

  it('Should username invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['username'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should username invalid maxLength', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['username'];
    control.setValue('textnay56kytunheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    expect(control.invalid).toBeTruthy();
  });

  it('Should username invalid pattern', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['username'];
    control.setValue('username co khoang trang nay');
    expect(control.invalid).toBeTruthy();
  });

  it('Should password invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['password'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should password invalid minLength', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['password'];
    control.setValue('text5');
    expect(control.invalid).toBeTruthy();
  });

  it('Should password invalid pattern', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['password'];
    control.setValue('password co khoang trang nay');
    expect(control.invalid).toBeTruthy();
  });

  it('Should password invalid maxLength', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['password'];
    control.setValue('textnay56kytunheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    expect(control.invalid).toBeTruthy();
  });

  it('Should email invalid email', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['email'];
    control.setValue('124234');
    expect(control.invalid).toBeTruthy();
  });

  it('Should phone invalid pattern', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['phone'];
    control.setValue('124234a');
    expect(control.invalid).toBeTruthy();
  });
});
