import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationCreateTeacherComponent } from './notification-create-teacher.component';
import {CommonModule} from "@angular/common";
import {NotificationTeacherRoutingModule} from "../../notification-teacher-routing.module";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {CoreModule} from "../../../../../_core/core.module";
import {ReactiveFormsModule, Validators} from "@angular/forms";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzPopoverModule} from "ng-zorro-antd/popover";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzSelectModule} from "ng-zorro-antd/select";
import {TranslocoModule} from "@ngneat/transloco";
import {NzInputModule} from "ng-zorro-antd/input";
import {NgxPermissionsModule} from "ngx-permissions";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../../../../environments/environment.firebase";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('NotificationCreateTeacherComponent', () => {
  let component: NotificationCreateTeacherComponent;
  let fixture: ComponentFixture<NotificationCreateTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationCreateTeacherComponent ],
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
        NgxPermissionsModule.forChild(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        RouterModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationCreateTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create a form with controls', () => {
    component.dataSendingScope = [{value: 3}]
    component.dataRecipientGroup = [
      {value: 1, label: 'student', checked: true},
      {value: 2, label: 'parent', checked: true},
      {value: 3, label: 'homeroomTeacher', checked: true},
      {value: 4, label: 'subjectTeacher', checked: true}
    ];
    component.initForm();
    fixture.detectChanges();
    expect(component.formGroup.contains('avatar')).toBeTruthy();
    expect(component.formGroup.contains('title')).toBeTruthy();
    expect(component.formGroup.contains('description')).toBeTruthy();
    expect(component.formGroup.contains('content')).toBeTruthy();
    expect(component.formGroup.contains('scope')).toBeTruthy();
    expect(component.formGroup.contains('objectIds')).toBeTruthy();
    expect(component.formGroup.contains('recipientGroups')).toBeTruthy();
    expect(component.formGroup.contains('isAllowComment')).toBeTruthy();
    expect(component.formGroup.contains('sendNow')).toBeTruthy();
    expect(component.formGroup.contains('sendAt')).toBeTruthy();
    expect(component.formGroup.contains('files')).toBeTruthy();
  });


  it('Should form valid', () => {
    component.dataSendingScope = [{value: 3}]
    component.dataRecipientGroup = [
      {value: 1, label: 'student', checked: true},
      {value: 2, label: 'parent', checked: true},
      {value: 3, label: 'homeroomTeacher', checked: true},
      {value: 4, label: 'subjectTeacher', checked: true}
    ];
    component.initForm();
    fixture.detectChanges();
    const form = component.formGroup;
    form.patchValue({
      avatar: 'Điểm trường test',
      title: 'OMT01',
      description: 'Ba Đình, Hà Nội',
      content: '2001231sdf',
      scope: 200,
      objectIds: ['1', '3'],
      recipientGroups: ['1', '3'],
      isAllowComment: true,
      sendNow: '0349954675',
      sendAt: 'dungdt@omt.vn',
      files: [],
    });
    expect(form.valid).toBeTrue();
  });

  it('Should title invalid required', () => {
    component.dataSendingScope = [{value: 3}]
    component.dataRecipientGroup = [
      {value: 1, label: 'student', checked: true},
      {value: 2, label: 'parent', checked: true},
      {value: 3, label: 'homeroomTeacher', checked: true},
      {value: 4, label: 'subjectTeacher', checked: true}
    ];
    component.initForm();
    fixture.detectChanges();
    const control = component.formGroup.controls['title'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should description invalid lenght', () => {
    component.dataSendingScope = [{value: 3}]
    component.dataRecipientGroup = [
      {value: 1, label: 'student', checked: true},
      {value: 2, label: 'parent', checked: true},
      {value: 3, label: 'homeroomTeacher', checked: true},
      {value: 4, label: 'subjectTeacher', checked: true}
    ];
    component.initForm();
    fixture.detectChanges();
    const control = component.formGroup.controls['title'];
    control.setValue('While the Japanese video game industry has long been viewed as console-centric in the Western world, due to the worldwide success of Japanese consoles beginning with the NES, the country had in fact produced thousands of commercial PC games from the latest');
    expect(control.invalid).toBeTruthy();
  });

  it('Should content invalid required', () => {
    component.dataSendingScope = [{value: 3}]
    component.dataRecipientGroup = [
      {value: 1, label: 'student', checked: true},
      {value: 2, label: 'parent', checked: true},
      {value: 3, label: 'homeroomTeacher', checked: true},
      {value: 4, label: 'subjectTeacher', checked: true}
    ];
    component.initForm();
    fixture.detectChanges();
    const control = component.formGroup.controls['content'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should code invalid required', () => {
    component.dataSendingScope = [{value: 3}]
    component.dataRecipientGroup = [
      {value: 1, label: 'student', checked: true},
      {value: 2, label: 'parent', checked: true},
      {value: 3, label: 'homeroomTeacher', checked: true},
      {value: 4, label: 'subjectTeacher', checked: true}
    ];
    component.initForm();
    fixture.detectChanges();
    const scope = component.formGroup.controls['scope'];
    scope.setValue(1);
    component.formGroup.get('objectIds').setValidators([Validators.required])
    const object = component.formGroup.controls['objectIds'];
    object.setValue(null);
    expect(object.invalid).toBeTruthy();
  });
});
