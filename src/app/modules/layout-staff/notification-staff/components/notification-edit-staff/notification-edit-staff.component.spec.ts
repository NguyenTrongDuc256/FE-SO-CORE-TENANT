import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationEditStaffComponent } from './notification-edit-staff.component';
import {CommonModule} from "@angular/common";
import {NotificationStaffRoutingModule} from "../../notification-staff-routing.module";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {CoreModule} from "../../../../../_core/core.module";
import {ReactiveFormsModule, Validators} from "@angular/forms";
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
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../../../../environments/environment.firebase";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {BehaviorSubject} from "rxjs";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('NotificationEditStaffComponent', () => {
  let component: NotificationEditStaffComponent;
  let fixture: ComponentFixture<NotificationEditStaffComponent>;
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
        title: 'OMT01',
        description: 'Ba Đình, Hà Nội',
        content: '2001231sdf',
        scope: 200,
        objects: [
          {id: "8f06a474-5abb-4ad2-bbac-0c5d563f5d2c", name: "Trường Tiểu học Trung Hoà (không được xoá)"}],
        isAllowComment: true,
        sendNow: '0349954675',
        sendAt: 'dungdt@omt.vn',
        files: [],
      }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationEditStaffComponent ],
      imports: [
        CommonModule,
        NotificationStaffRoutingModule,
        CKEditorModule,
        CoreModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
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
      ],
      providers: [
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
    fixture = TestBed.createComponent(NotificationEditStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create a form with controls', () => {
    component.isLoading = false;
    component.dataRecipientGroup = [
      {value: 1, label: 'student', checked: true},
      {value: 2, label: 'parent', checked: true},
      {value: 3, label: 'homeroomTeacher', checked: true},
      {value: 4, label: 'subjectTeacher', checked: true}
    ];
    fixture.detectChanges();
    component.initForm(info)
    expect(component.formGroup.contains('avatar')).toBeTruthy();
    expect(component.formGroup.contains('title')).toBeTruthy();
    expect(component.formGroup.contains('description')).toBeTruthy();
    expect(component.formGroup.contains('content')).toBeTruthy();
    expect(component.formGroup.contains('scope')).toBeTruthy();
    expect(component.formGroup.contains('objectIds')).toBeTruthy();
    expect(component.formGroup.contains('isAllowComment')).toBeTruthy();
    expect(component.formGroup.contains('sendNow')).toBeTruthy();
    expect(component.formGroup.contains('sendAt')).toBeTruthy();
    expect(component.formGroup.contains('files')).toBeTruthy();
  });
  //
  //
  it('Should form valid', () => {
    component.isLoading = false;
    component.dataRecipientGroup = [
      {value: 1, label: 'student', checked: true},
      {value: 2, label: 'parent', checked: true},
      {value: 3, label: 'homeroomTeacher', checked: true},
      {value: 4, label: 'subjectTeacher', checked: true}
    ];
    fixture.detectChanges();
    component.initForm(info)
    const form = component.formGroup;
    form.patchValue({
      avatar: 'Điểm trường test',
      title: 'OMT01',
      description: 'Ba Đình, Hà Nội',
      content: '2001231sdf',
      scope: 200,
      objectIds: ['1', '3'],
      isAllowComment: true,
      sendNow: '0349954675',
      sendAt: 'dungdt@omt.vn',
      files: [],
    });
    expect(form.valid).toBeTrue();
  });

  it('Should title invalid required', () => {
    component.isLoading = false;
    component.dataRecipientGroup = [
      {value: 1, label: 'student', checked: true},
      {value: 2, label: 'parent', checked: true},
      {value: 3, label: 'homeroomTeacher', checked: true},
      {value: 4, label: 'subjectTeacher', checked: true}
    ];
    fixture.detectChanges();
    component.initForm(info)
    const control = component.formGroup.controls['title'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should description invalid lenght', () => {
    component.isLoading = false;
    component.dataRecipientGroup = [
      {value: 1, label: 'student', checked: true},
      {value: 2, label: 'parent', checked: true},
      {value: 3, label: 'homeroomTeacher', checked: true},
      {value: 4, label: 'subjectTeacher', checked: true}
    ];
    fixture.detectChanges();
    component.initForm(info)
    const control = component.formGroup.controls['title'];
    control.setValue('While the Japanese video game industry has long been viewed as console-centric in the Western world, due to the worldwide success of Japanese consoles beginning with the NES, the country had in fact produced thousands of commercial PC games from the latest');
    expect(control.invalid).toBeTruthy();
  });

  it('Should content invalid required', () => {
    component.isLoading = false;
    component.dataRecipientGroup = [
      {value: 1, label: 'student', checked: true},
      {value: 2, label: 'parent', checked: true},
      {value: 3, label: 'homeroomTeacher', checked: true},
      {value: 4, label: 'subjectTeacher', checked: true}
    ];
    fixture.detectChanges();
    component.initForm(info)
    const control = component.formGroup.controls['content'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should code invalid required', () => {
    component.isLoading = false;
    component.dataRecipientGroup = [
      {value: 1, label: 'student', checked: true},
      {value: 2, label: 'parent', checked: true},
      {value: 3, label: 'homeroomTeacher', checked: true},
      {value: 4, label: 'subjectTeacher', checked: true}
    ];
    fixture.detectChanges();
    component.initForm(info)
    const scope = component.formGroup.controls['scope'];
    scope.setValue(1);
    component.formGroup.get('objectIds').setValidators([Validators.required])
    const object = component.formGroup.controls['objectIds'];
    object.setValue(null);
    expect(object.invalid).toBeTruthy();
  });
});
