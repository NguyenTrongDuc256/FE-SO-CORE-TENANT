import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TabConfigStudyTimeTenantComponent} from './tab-config-study-time-tenant.component';
import {CommonModule} from "@angular/common";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {getTranslocoModule} from "../../../../../transloco-testing.module";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../../../../environments/environment.firebase";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {NgxDaterangepickerMd} from "ngx-daterangepicker-material";
import {TRANSLOCO_SCOPE, TranslocoModule} from "@ngneat/transloco";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {SettingTenantModule} from "../../setting-tenant.module";
import {SettingTenantRoutingModule} from "../../setting-tenant-routing.module";
import {NgxPermissionsModule} from "ngx-permissions";

describe('TabConfigStudyTimeTenantComponent', () => {
  let component: TabConfigStudyTimeTenantComponent;
  let fixture: ComponentFixture<TabConfigStudyTimeTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabConfigStudyTimeTenantComponent ],
      imports: [
        SettingTenantModule,
        SettingTenantRoutingModule,
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
        NgxPermissionsModule.forChild()
      ],
      providers: [
        {provide: TRANSLOCO_SCOPE, useValue: 'setting'},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabConfigStudyTimeTenantComponent);
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
    component.initForm();
    expect(component.formGroup.contains('allConfigSaturdayChecked')).toBeTruthy();
    expect(component.formGroup.contains('allConfigSundayChecked')).toBeTruthy();
    expect(component.formGroup.contains('configSaturday')).toBeTruthy();
    expect(component.formGroup.contains('configSunday')).toBeTruthy();
  });

  it('Should form valid', () => {
    component.isLoading = false;
    fixture.detectChanges();
    component.initForm();
    const formGroup = component.formGroup;
    formGroup.patchValue({
      allConfigSaturdayChecked: true,
      allConfigSundayChecked: true,
      configSaturday: [],
      configSunday: [],
    });
    expect(formGroup.valid).toBeTrue();
  });
});
