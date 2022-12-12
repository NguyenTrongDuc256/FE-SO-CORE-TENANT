import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDetailSentStaffComponent } from './notification-detail-sent-staff.component';
import {CommonModule} from "@angular/common";
import {NotificationStaffRoutingModule} from "../../notification-staff-routing.module";
import {CoreModule} from "../../../../../_core/core.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzPopoverModule} from "ng-zorro-antd/popover";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzSelectModule} from "ng-zorro-antd/select";
import {TranslocoModule} from "@ngneat/transloco";
import {NzInputModule} from "ng-zorro-antd/input";
import {
  NgxPermissionsConfigurationStore,
  NgxPermissionsModule,
  NgxPermissionsStore,
  NgxRolesStore
} from "ngx-permissions";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {BehaviorSubject} from "rxjs";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('NotificationDetailSentStaffComponent', () => {
  let component: NotificationDetailSentStaffComponent;
  let fixture: ComponentFixture<NotificationDetailSentStaffComponent>;
  const paramsSubject = new BehaviorSubject({id: 12123});
  const fakeActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => 1,
      },
    },
    params: paramsSubject,
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationDetailSentStaffComponent ],
      imports: [
        CommonModule,
        NotificationStaffRoutingModule,
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
        BrowserAnimationsModule
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
    fixture = TestBed.createComponent(NotificationDetailSentStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test function getDataScope', () => {
    const data = component.getDataScope(null)
    expect(data).toEqual('');
  });


  it('test function getDataRecipientGroup', () => {
    const data = component.getDataRecipientGroup([10, 2]);
    expect(data).toEqual(['parent']);
  });

  it('test function getStatusName', () => {
    const status = 1;
    const statusName = component.getStatusName(status);
    expect(statusName).toBe('sent');
  });
});
