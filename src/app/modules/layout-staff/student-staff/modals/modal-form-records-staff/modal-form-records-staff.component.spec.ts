import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { CoreModule } from 'src/app/_core/core.module';
import { environment } from 'src/environments/environment.firebase';

import { ModalFormRecordsStaffComponent } from './modal-form-records-staff.component';
import { FormArray, FormGroup } from '@angular/forms';

describe('ModalFormRecordsStaffComponent', () => {
  let component: ModalFormRecordsStaffComponent;
  let fixture: ComponentFixture<ModalFormRecordsStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFormRecordsStaffComponent],
      imports: [
        CommonModule,
        CoreModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        BrowserAnimationsModule,
        getTranslocoModule()
      ],
      providers: [
        NgbActiveModal,
        { provide: TRANSLOCO_SCOPE, useValue: 'student-records' },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFormRecordsStaffComponent);
    component = fixture.componentInstance;
    component.dataModal = {
      dataFromParent: {
        keyFirebaseAction: 'update',
        keyFirebaseModule: 'file-user',
        userId: '886A74F2-2656-43EA-B378-B4442B47AD57',
        nameForm: 'update',
        arrCate: [
          {
            id: '4c8c9c4b-8149-4d06-b049-8319506c4133',
            code: 'danhmuchoctap3',
            name: 'Danh mục học tập 3',
            type: 2,
            isImperative: 1,
            note: 'Ghi chú',
            indexOrder: 1,
            isUsed: 1,
          },
          {
            id: 'b72e1537-2656-4dd6-a6b5-12978f6b32ca',
            code: 'danhmuchoctap2',
            name: 'Danh mục học tập 2',
            type: 2,
            isImperative: 1,
            note: 'Ghi chú',
            indexOrder: 1,
            isUsed: 1,
          },
        ],
        valueUpdate: {
          id: '1d92dce2-41aa-4702-a3cf-db9e54ef3c3e',
          name: 'Hồ sơ của tao',
          fileCategoryId: 'b72e1537-2656-4dd6-a6b5-12978f6b32ca',
          fileCategoryName: 'Danh mục học tập 2',
          createdAt: 1663927087,
          createByName: 'nhân viên nhà trường',
          approveStatus: 1,
          isImportant: 0,
          fileAttachs: [
            {
              fileType: 3,
              name: 'Đơn xin nghỉ làm',
              url: 'https://schoolonline-rebuild-dev.s3-ap-southeast-1.amazonaws.com/SO/2022/09/23/files/uploads/1663922313_bai-test-thuc-tap.docx',
            },
            {
              fileType: 1,
              name: 'CV',
              url: 'https://schoolonline-rebuild-dev.s3-ap-southeast-1.amazonaws.com/SO/2022/09/23/files/uploads/1663922313_bai-test-thuc-tap.docx',
            },
          ],
          approveStatusName: 'approved',
        },
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create a form with controls', () => {
    expect(component.formSubmit.contains('name')).toBeTruthy();
    expect(component.formSubmit.contains('categoryId')).toBeTruthy();
    expect(component.formSubmit.contains('isSendNoti')).toBeTruthy();
    expect(component.formSubmit.contains('fileAttachs')).toBeTruthy();
  });

  it('Should form valid', () => {
    const form = component.formSubmit;
    form.patchValue({
      name: 'Tên',
      categoryId: 'b72e1537-2656-4dd6-a6b5-12978f6b32ca',
      isSendNoti: 1,
      fileAttachs: [{
        fileType: 3,
        name: 'Đơn xin nghỉ làm',
        url: 'https://schoolonline-rebuild-dev.s3-ap-southeast-1.amazonaws.com/SO/2022/09/23/files/uploads/1663922313_bai-test-thuc-tap.docx',
      },
      {
        fileType: 1,
        name: 'CV',
        url: 'https://schoolonline-rebuild-dev.s3-ap-southeast-1.amazonaws.com/SO/2022/09/23/files/uploads/1663922313_bai-test-thuc-tap.docx',
      },]
    });
    expect(form.valid).toBeTrue();
  });

  it('Should name invalid max length', () => {
    const control = component.formSubmit.controls['name'];
    control.setValue(
      'When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided'
    );
    expect(control.invalid).toBeTruthy();
  });

  it('Should name invalid required', () => {
    const control = component.formSubmit.controls['name'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should name invalid empty', () => {
    const control = component.formSubmit.controls['name'];
    control.setValue('    ');
    expect(control.invalid).toBeTruthy();
  });

  it('Should category required', () => {
    const control = component.formSubmit.controls['categoryId'];
    let input = null || 'null';
    control.setValue(input);
    expect(control.invalid).toBeTruthy();
  });

  it('Should name file required', () => {
    const control = ((component.formSubmit.controls['fileAttachs'] as FormArray).controls[0] as FormGroup).controls['url'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should name file empty', () => {
    const control = ((component.formSubmit.controls['fileAttachs'] as FormArray).controls[0] as FormGroup).controls['url'];
    control.setValue('   ');
    expect(control.invalid).toBeTruthy();
  });

  it('Should name file not is url', () => {
    const control = ((component.formSubmit.controls['fileAttachs'] as FormArray).controls[0] as FormGroup).controls['url'];
    control.setValue('abc@@');
    expect(control.invalid).toBeTruthy();
  });
});