import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RoleService} from "src/app/_services/layout-tenant/role/role.service";
import {UserEditTenantComponent} from "./user-edit-tenant.component";
import {BehaviorSubject, of} from "rxjs";
import {UserTenantModule} from "../../user-tenant.module";
import {UserTenantRoutingModule} from "../../user-tenant-routing.module";
import {CommonModule} from "@angular/common";
import {RouterTestingModule} from "@angular/router/testing";
import {getTranslocoModule} from "../../../../../transloco-testing.module";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../../../../environments/environment.firebase";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {NgxDaterangepickerMd} from "ngx-daterangepicker-material";
import {TRANSLOCO_SCOPE, TranslocoModule} from "@ngneat/transloco";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ActivatedRoute, RouterModule} from "@angular/router";

describe('UserEditTenantComponent', () => {
  let component: UserEditTenantComponent;
  let fixture: ComponentFixture<UserEditTenantComponent>;

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
  const userInfo = {
    id: "39f8430f-45ad-4d1c-a408-309bf99089bf",
    avatar: "https://schoolonline-rebuild-dev.s3-ap-southeast-1.amazonaws.com/SO/2022/07/25/files/uploads/1658721291_1658721299786-Group 1000003688.png",
    fullname: "Đỗ Thùy Dung 123",
    code: "omt1",
    username: "dungdt",
    gender: 2,
    email: "dungdt@omt.vn",
    phone: "0349921357",
    birthday: 1662310800,
    isActive: 1,
    isAccessApp: 0
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEditTenantComponent ],
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
    fixture = TestBed.createComponent(UserEditTenantComponent);
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
    component.initForm(userInfo);

    expect(component.formGroup.contains('avatar')).toBeTruthy();
    expect(component.formGroup.contains('fullName')).toBeTruthy();
    expect(component.formGroup.contains('code')).toBeTruthy();
    expect(component.formGroup.contains('username')).toBeTruthy();
    expect(component.formGroup.contains('gender')).toBeTruthy();
    expect(component.formGroup.contains('birthday')).toBeTruthy();
    expect(component.formGroup.contains('email')).toBeTruthy();
    expect(component.formGroup.contains('phone')).toBeTruthy();
    expect(component.formGroup.contains('isActive')).toBeTruthy();
    expect(component.formGroup.contains('isAccessApp')).toBeTruthy();
  });

  it('Should form valid', () => {
    component.isLoading = false;
    fixture.detectChanges();
    component.initForm(userInfo);

    const formGroup = component.formGroup;
    formGroup.patchValue({
      avatar: 'https://schoolonline-rebuild-dev.s3-ap-southeast-1.amazonaws.com/SO/2022/07/25/files/uploads/1658721291_1658721299786-Group 1000003688.png',
      fullName: 'Tên của bạn',
      code: 'OMTCode',
      gender: 1,
      birthday: 1662742800,
      email: '',
      phone: '',
      isActive: true,
      isAccessApp: true,
    });
    expect(formGroup.valid).toBeTrue();
  });

  it('Should fullName invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    component.initForm(userInfo);

    const control = component.formGroup.controls['fullName'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should fullName invalid maxLength', () => {
    component.isLoading = false;
    fixture.detectChanges();
    component.initForm(userInfo);

    const control = component.formGroup.controls['fullName'];
    control.setValue('Tên của tui đâyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy maxlength là 255 ký tự nhé, text này 256 ký tự đó heheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    expect(control.invalid).toBeTruthy();
  });

  it('Should email invalid email', () => {
    component.isLoading = false;
    fixture.detectChanges();
    component.initForm(userInfo);

    const control = component.formGroup.controls['email'];
    control.setValue('124234');
    expect(control.invalid).toBeTruthy();
  });

  it('Should phone invalid pattern', () => {
    component.isLoading = false;
    fixture.detectChanges();
    component.initForm(userInfo);

    const control = component.formGroup.controls['phone'];
    control.setValue('124234a');
    expect(control.invalid).toBeTruthy();
  });
});

