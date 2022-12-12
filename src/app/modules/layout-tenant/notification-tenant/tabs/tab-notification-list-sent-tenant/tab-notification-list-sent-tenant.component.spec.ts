import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabNotificationListSentTenantComponent } from './tab-notification-list-sent-tenant.component';
import {CommonModule} from "@angular/common";
import {CoreModule} from "../../../../../_core/core.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzPopoverModule} from "ng-zorro-antd/popover";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzSelectModule} from "ng-zorro-antd/select";
import {TranslocoModule, TranslocoTestingModule} from "@ngneat/transloco";
import {NzInputModule} from "ng-zorro-antd/input";
import {
  NgxPermissionsConfigurationStore,
  NgxPermissionsModule,
  NgxPermissionsStore,
  NgxRolesStore
} from "ngx-permissions";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BehaviorSubject} from "rxjs";
import {NotificationTenantRoutingModule} from "../../notification-tenant-routing.module";
import {getTranslocoModule} from "../../../../../transloco-testing.module";

describe('TabNotificationListReceivedStaffComponent', () => {
  let component: TabNotificationListSentTenantComponent;
  let fixture: ComponentFixture<TabNotificationListSentTenantComponent>;
  const paramsSubject = new BehaviorSubject({id: "c8862267-c507-4050-be66-a7b31d96499c"});
  const queryParamsSubject = new BehaviorSubject({tab: 12123});
  const fakeActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => "c8862267-c507-4050-be66-a7b31d96499c",
      },
    },
    params: paramsSubject,
    queryParams: queryParamsSubject,
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabNotificationListSentTenantComponent ],
      imports: [
        CommonModule,
        NotificationTenantRoutingModule,
        CoreModule,
        ReactiveFormsModule,
        NzCheckboxModule,
        NzPopoverModule,
        NzRadioModule,
        NzDropDownModule,
        NzSelectModule,
        TranslocoModule,
        NzInputModule,
        NgxPermissionsModule.forChild(),
        NzTabsModule,
        RouterModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        getTranslocoModule(),
      ],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        NgxPermissionsStore,
        NgxPermissionsConfigurationStore,
        NgxRolesStore,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabNotificationListSentTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('test function getStatusName', () => {
    const status = 1;
    const statusName = component.getStatusName(status);
    expect(statusName).toBe('sent');
  });
});
