import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationListSentTeacherComponent } from './notification-list-sent-teacher.component';
import {CommonModule} from "@angular/common";
import {NotificationTeacherRoutingModule} from "../../notification-teacher-routing.module";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {CoreModule} from "../../../../../_core/core.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzPopoverModule} from "ng-zorro-antd/popover";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzSelectModule} from "ng-zorro-antd/select";
import {TranslocoModule} from "@ngneat/transloco";
import {NzInputModule} from "ng-zorro-antd/input";
import {NgxPermissionsModule} from "ngx-permissions";

describe('NotificationListSentTeacherComponent', () => {
  let component: NotificationListSentTeacherComponent;
  let fixture: ComponentFixture<NotificationListSentTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationListSentTeacherComponent ],
      imports: [
        CommonModule,
        NotificationTeacherRoutingModule,
        CKEditorModule,
        CoreModule,
        ReactiveFormsModule,
        NzCheckboxModule,
        NzPopoverModule,
        NzRadioModule,
        NzDropDownModule,
        NzSelectModule,
        TranslocoModule,
        NzInputModule,
        NgxPermissionsModule.forChild()
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationListSentTeacherComponent);
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
