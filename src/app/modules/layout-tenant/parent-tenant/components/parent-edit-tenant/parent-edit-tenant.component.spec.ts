import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentEditTenantComponent } from './parent-edit-tenant.component';
import {CommonModule} from "@angular/common";
import {ParentTenantRoutingModule} from "../../parent-tenant-routing.module";
import {CoreModule} from "../../../../../_core/core.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzPopoverModule} from "ng-zorro-antd/popover";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzSelectModule} from "ng-zorro-antd/select";
import {TRANSLOCO_SCOPE, TranslocoModule} from "@ngneat/transloco";
import {NzInputModule} from "ng-zorro-antd/input";
import {
  NgxPermissionsConfigurationStore,
  NgxPermissionsModule,
  NgxPermissionsStore,
  NgxRolesStore
} from "ngx-permissions";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../../../../environments/environment.firebase";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BehaviorSubject} from "rxjs";
import {LocaleService, NgxDaterangepickerMd} from "ngx-daterangepicker-material";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ParentEditTenantComponent', () => {
  let component: ParentEditTenantComponent;
  let fixture: ComponentFixture<ParentEditTenantComponent>;
  const paramsSubject = new BehaviorSubject({id: 12123});
  const fakeActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => 1,
      },
    },
    params: paramsSubject,
  };
  const info = {
    avatar: 'Điểm trường test',
    fullName: 'OMT01',
    gender: 'Ba Đình, Hà Nội',
    code: '2001231sdf',
    birthday: 200,
    isAccessApp: 1,
    isActive: 1,
    password: '0349954675',
    Email: 'dungdt@omt.vn',
    phone: 'Ba Đình',
    childrens: [],
    username: '2001231sdf',
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentEditTenantComponent ],
      imports: [
        CommonModule,
        ParentTenantRoutingModule,
        CoreModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        NzCheckboxModule,
        NzPopoverModule,
        NzRadioModule,
        NzDropDownModule,
        NzSelectModule,
        TranslocoModule,
        NzInputModule,
        NgxPermissionsModule.forChild(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        BrowserAnimationsModule,
        NgxDaterangepickerMd.forRoot(),
        RouterModule,
      ],
      providers:[
        {provide: TRANSLOCO_SCOPE, useValue: 'parent'},
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        NgxPermissionsStore,
        NgxPermissionsConfigurationStore,
        NgxRolesStore,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentEditTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create a form with controls', () => {
    component.isLoading = false;
    fixture.detectChanges();
    component.initForm(info)
    expect(component.infoForm.contains('avatar')).toBeTruthy();
    expect(component.infoForm.contains('fullName')).toBeTruthy();
    expect(component.infoForm.contains('gender')).toBeTruthy();
    expect(component.infoForm.contains('code')).toBeTruthy();
    expect(component.infoForm.contains('birthday')).toBeTruthy();
    expect(component.infoForm.contains('isAccessApp')).toBeTruthy();
    expect(component.infoForm.contains('isActive')).toBeTruthy();
    expect(component.infoForm.contains('username')).toBeTruthy();
    expect(component.infoForm.contains('email')).toBeTruthy();
    expect(component.infoForm.contains('phone')).toBeTruthy();
    expect(component.infoForm.contains('childrens')).toBeTruthy();
  });


  it('Should form valid', () => {
    component.isLoading = false;
    fixture.detectChanges();
    component.initForm(info)
    const form = component.infoForm;
    form.patchValue({
      avatar: 'Điểm trường test',
      fullName: 'OMT01',
      gender: 'Ba Đình, Hà Nội',
      code: '2001231sdf',
      birthday: 200,
      isAccessApp: 1,
      isActive: 1,
      password: '0349954675',
      Email: 'dungdt@omt.vn',
      phone: '09149023354',
      childrens: ['d','d'],
      username: '2001231sdf',
    });
    expect(form.valid).toBeTrue();
  });

  it('Should name invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    component.initForm(info)
    const control = component.infoForm.controls['fullName'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should name invalid pattern', () => {
    component.isLoading = false;
    fixture.detectChanges();
    component.initForm(info)
    const control = component.infoForm.controls['fullName'];
    control.setValue('');
    expect(control.invalid).toBeTrue();
  });

  it('Should code invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    component.initForm(info)
    const control = component.infoForm.controls['code'];
    control.setValue('');
    expect(control.invalid).toBeTrue();
  });

  it('Should code invalid pattern', () => {
    component.isLoading = false;
    fixture.detectChanges();
    component.initForm(info)
    const control = component.infoForm.controls['code'];
    control.setValue('@ạ sdk_-');
    expect(control.invalid).toBeTrue();
  });

  it('Should phone invalid pattern', () => {
    component.isLoading = false;
    fixture.detectChanges();
    component.initForm(info)
    const control = component.infoForm.controls['phone'];
    control.setValue('0124956970');
    expect(control.valid).toBeTrue();
  });

  it('Should email invalid pattern', () => {
    component.isLoading = false;
    fixture.detectChanges();
    component.initForm(info)
    const control = component.infoForm.controls['email'];
    control.setValue('omt.com.vn');
    expect(control.invalid).toBeTrue();
  });
});
