import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UpdateTenantComponent} from "./update-tenant.component";
import {BehaviorSubject} from "rxjs";
import {CommonModule} from "@angular/common";
import {RouterTestingModule} from "@angular/router/testing";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../../../../environments/environment.firebase";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {TRANSLOCO_SCOPE, TranslocoModule} from "@ngneat/transloco";
import {getTranslocoModule} from "../../../../../transloco-testing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {SettingTenantModule} from "../../setting-tenant.module";
import {SettingTenantRoutingModule} from "../../setting-tenant-routing.module";

describe('UpdateTenantComponent', () => {
  let component: UpdateTenantComponent;
  let fixture: ComponentFixture<UpdateTenantComponent>;
  const paramsSubject = new BehaviorSubject({});
  const fakeActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => 1,
      },
    },
    queryParams: {tab: 'info'},
    params: paramsSubject,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTenantComponent ],
      imports: [
        SettingTenantModule,
        CommonModule,
        SettingTenantRoutingModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        TranslocoModule,
        getTranslocoModule(),
        BrowserAnimationsModule,
        RouterModule,
      ],
      providers: [
        {provide: TRANSLOCO_SCOPE, useValue: 'setting'},
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTenantComponent);
    component = fixture.componentInstance;
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
    let tenantInfo = {
      id: "e98c5a2f-84d0-43fb-beeb-39f5f758b610",
      name: "Công ty giáo dục Bris",
      isActive: 1,
      createdDate: 1658471344,
      logo: "",
      backgroundLogin: "",
      favicon: "",
      code: "bris",
      domain: "bris.k8s-dev.omt.vn",
      phone: "0855888999",
      email: "bris@gmail.com",
      address: "Thanh Xuân này ở Hà Nội",
      areaCode: "vi",
      timeZoneCode: "UTC +07:00",
      languageCode: "jp",
      monetaryUnitCode: "VND"
    }
    component.initForm(tenantInfo);
    expect(component.formGroup.contains('name')).toBeTruthy();
    expect(component.formGroup.contains('isActive')).toBeTruthy();
    expect(component.formGroup.contains('logo')).toBeTruthy();
    expect(component.formGroup.contains('backgroundLogin')).toBeTruthy();
    expect(component.formGroup.contains('favicon')).toBeTruthy();
    expect(component.formGroup.contains('phone')).toBeTruthy();
    expect(component.formGroup.contains('email')).toBeTruthy();
    expect(component.formGroup.contains('address')).toBeTruthy();
    expect(component.formGroup.contains('areaCode')).toBeTruthy();
    expect(component.formGroup.contains('timeZoneCode')).toBeTruthy();
    expect(component.formGroup.contains('languageCode')).toBeTruthy();
    expect(component.formGroup.contains('monetaryUnitCode')).toBeTruthy();
  });

  it('Should form valid', () => {
    component.isLoading = false;
    fixture.detectChanges();
    let tenantInfo = {
      id: "e98c5a2f-84d0-43fb-beeb-39f5f758b610",
      name: "Công ty giáo dục Bris",
      isActive: 1,
      createdDate: 1658471344,
      logo: "",
      backgroundLogin: "",
      favicon: "",
      code: "bris",
      domain: "bris.k8s-dev.omt.vn",
      phone: "0855888999",
      email: "bris@gmail.com",
      address: "Thanh Xuân này ở Hà Nội",
      areaCode: "vi",
      timeZoneCode: "UTC +07:00",
      languageCode: "jp",
      monetaryUnitCode: "VND"
    }
    component.initForm(tenantInfo);

    const formGroup = component.formGroup;
    formGroup.patchValue({
      name: 'https://schoolonline-rebuild-dev.s3-ap-southeast-1.amazonaws.com/SO/2022/07/25/files/uploads/1658721291_1658721299786-Group 1000003688.png',
      isActive: true,
      logo: '',
      backgroundLogin: '',
      favicon: '',
      phone: '',
      email: '',
      address: '',
      areaCode: '',
      timeZoneCode: '',
      languageCode: '',
      monetaryUnitCode: '',
    });
    expect(formGroup.valid).toBeTrue();
  });

  it('Should name invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    let tenantInfo = {
      id: "e98c5a2f-84d0-43fb-beeb-39f5f758b610",
      name: "Công ty giáo dục Bris",
      isActive: 1,
      createdDate: 1658471344,
      logo: "",
      backgroundLogin: "",
      favicon: "",
      code: "bris",
      domain: "bris.k8s-dev.omt.vn",
      phone: "0855888999",
      email: "bris@gmail.com",
      address: "Thanh Xuân này ở Hà Nội",
      areaCode: "vi",
      timeZoneCode: "UTC +07:00",
      languageCode: "jp",
      monetaryUnitCode: "VND"
    }
    component.initForm(tenantInfo);

    const control = component.formGroup.controls['name'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should name invalid maxLength', () => {
    component.isLoading = false;
    fixture.detectChanges();
    let tenantInfo = {
      id: "e98c5a2f-84d0-43fb-beeb-39f5f758b610",
      name: "Công ty giáo dục Bris",
      isActive: 1,
      createdDate: 1658471344,
      logo: "",
      backgroundLogin: "",
      favicon: "",
      code: "bris",
      domain: "bris.k8s-dev.omt.vn",
      phone: "0855888999",
      email: "bris@gmail.com",
      address: "Thanh Xuân này ở Hà Nội",
      areaCode: "vi",
      timeZoneCode: "UTC +07:00",
      languageCode: "jp",
      monetaryUnitCode: "VND"
    }
    component.initForm(tenantInfo);

    const control = component.formGroup.controls['name'];
    control.setValue('Tên của tui đâyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy maxlength là 255 ký tự nhé, text này 256 ký tự đó heheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    expect(control.invalid).toBeTruthy();
  });
});
