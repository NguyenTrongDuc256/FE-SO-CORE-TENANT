import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { Observable, Subscriber } from 'rxjs';
import { SubjectGradeStaffService } from 'src/app/_services/layout-staff/declare/subject-grade-staff.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ValidatorNotNull } from 'src/app/_services/validator-custom.service';
import { GRADING_TYPE, PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-modal-update-subject-grade',
  templateUrl: './modal-update-subject-grade.component.html',
  styleUrls: ['./modal-update-subject-grade.component.scss', '../../helper.scss']
})
export class ModalUpdateSubjectGradeComponent implements OnInit {

  @Input() dataModal: any;
  dataFromParent: any;
  isLoading = false;
  formSubmit: FormGroup;
  pageIndexDefault = PAGE_INDEX_DEFAULT;
  pageSizeDefault = PAGE_SIZE_DEFAULT;
  arrGradingType = GRADING_TYPE;
  arrReportTypes: any = [];
  arrListSubject = [];
  gradeId = '';
  arrConvertMethod = [];
  arrSubjectMOET = [];
  validationMessagesServer = {
    OtherName: {},
    GradebookType: {},
    ReportTypeId: {},
    ReportTypeFormulaCode: {},
    MoetSubjectCode: {}
  }

  constructor(
    public activeModal: NgbActiveModal,
    private showMessageService: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private fb: FormBuilder,
    private subjectGradeStaffService: SubjectGradeStaffService,
  ) { }

  ngOnInit(): void {
    this.dataFromParent = this.dataModal.dataFromParent;
    this.gradeId = this.dataFromParent.gradeId;
    this.arrReportTypes = this.dataFromParent.arrReportTypes;
    this.arrListSubject = this.dataFromParent.arrListSubject;
    this.arrSubjectMOET = this.dataFromParent.arrSubjectMOET;
    let currentReportType = this.arrReportTypes.find(item => item.id == this.dataFromParent.subject.ReportTypeId);
    this.arrConvertMethod = currentReportType?.ConvertMethod || [];
    this.initForm(this.dataFromParent.subject);
  }

  initForm(dataForm) {
    this.formSubmit = this.fb.group({
      SubjectId: dataForm?.id || '',
      Name: dataForm?.SubjectName || '',
      Code: dataForm?.SubjectCode || '',
      OtherName: [dataForm?.OtherName || '', [Validators.maxLength(255), Validators.required, ValidatorNotNull]],
      GradebookType: [dataForm?.GradebookType || 1, [Validators.required, ValidatorNotNull]],
      IsPrivateGradebook: dataForm?.IsPrivateGradebook || false,
      ReportTypeId: [dataForm?.ReportTypeId || ''],
      IsSyncMoet: dataForm?.IsSyncMoet || false,
      ConvertMethod: this.fb.array([]),
      IsActive: Boolean(dataForm?.IsActive)
    });
    dataForm.ConvertMethod.forEach(element => {
      this.create(element)
    });
  }

  get getFormArray() {
    return this.formSubmit.get('ConvertMethod') as FormArray;
  }

  getFormGroupOfFormArray(index: number) {
    return this.getFormArray.controls[index] as FormGroup;
  }

  remove(index: number) {
    let length = this.getFormArray.controls.length;
    if (length > 1) {
      this.getFormArray.removeAt(index);
    } else {
      return this.showMessageService.warning(translate('declare.warmingDelConvertMethod'));
    }
  }

  create(dataForm: any) {
    this.getFormArray.push(this.initFormGroupConvertMethod(dataForm));
  }

  initFormGroupConvertMethod(dataForm): FormGroup {
    return this.fb.group({
      CanDelete: true,
      ReportTypeFormulaCode: [dataForm?.ReportTypeFormulaCode || '', [Validators.required, ValidatorNotNull]],
      MoetSubjectCode: [dataForm?.MoetSubjectCode || '', [Validators.required, ValidatorNotNull]],
    });
  }

  changeGradingType() {
    if (
      this.formSubmit.controls['GradebookType'].value ==
      this.arrGradingType[1].value ||
      this.formSubmit.controls['GradebookType'].value == ''
    ) {
      this.formSubmit.controls[
        'IsPrivateGradebook'
      ].setValue(false);
    }
  }

  changePrivateGradebook(event: boolean) {
    if (event) {
      this.formSubmit.controls[
        'ReportTypeId'
      ].setValidators([Validators.required, ValidatorNotNull]);
    } else {
      this.formSubmit.controls[
        'ReportTypeId'
      ].clearValidators();
      this.formSubmit.controls[
        'ReportTypeId'
      ].setValue('');
      this.formSubmit.controls['IsSyncMoet'].setValue(
        false
      );
    }
  }

  changeReportType() {
    this.formSubmit.controls[
      'IsSyncMoet'
    ].setValue(false);
    this.getFormArray.clear();
    let currentReportType = this.arrReportTypes.find(item => item.id == this.formSubmit.get('ReportTypeId').value);
    this.arrConvertMethod = currentReportType.ConvertMethod;
  }

  changeSyncMoet(
    event: boolean
  ) {
    this.getFormArray.clear();
    if (event) {
      this.create(null);
      this.formSubmit.controls[
        'ReportTypeId'
      ].setValidators([Validators.required, ValidatorNotNull]);
    } else {
      this.formSubmit.controls[
        'ReportTypeId'
      ].clearValidators();
    }
  }

  submit(valueForm: any) {
    this.isLoading = true;
    if (this.formSubmit.valid) {
      this.saveForm(valueForm);
    } else {
      this.isLoading = false;
      this.validateAllFormFields(this.formSubmit);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach((item: FormGroup) => {
          this.validateAllFormFields(item);
        })
      }
    });
  }

  saveForm(valueForm: any) {
    let dataInput = {
      OtherName: valueForm.OtherName.trim(),
      SubjectId: valueForm.SubjectId,
      GradebookType: +valueForm.GradebookType,
      IsPrivateGradebook: +valueForm.IsPrivateGradebook,
      ReportTypeId: valueForm.ReportTypeId,
      IsSyncMoet: +valueForm.IsSyncMoet,
      ConvertMethod: valueForm.ConvertMethod.map(
        ({ CanDelete, ...rest }) => ({ ...rest })
      ),
      IsActive: valueForm.IsActive
    }
    this.listenFireBase('update', 'subject-grade');
    this.subjectGradeStaffService.update(this.dataFromParent.id, dataInput, this.gradeId).subscribe((res: any) => {
      if (res.status == 0) {
        this.isLoading = false;
        this.showMessageService.error(res.msg);
      }
    }, err => {
      this.isLoading = false;
    })
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  listenFireBase(action: string, module: string) {
    const timeId = setTimeout(() => {
      this.isLoading = false;
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>) => {
      this.listenFirebaseService.checkFireBase(action, module, subscriber);
    });
    listenFb.subscribe((ref) => {
      if (ref.status === true) {
        clearTimeout(timeId);
        this.isLoading = false;
        this.activeModal.close(true);
      } else {
        this.isLoading = false;
      }
    });
  }

  mapErrorData(findIndex, error: any) {
    let parentIndex = [];
    Object.keys(error).forEach((key, index) => {
      let arrKey = String(key).split('.');
      parentIndex.push(arrKey[0]);
    });
    if (parentIndex.length > 0) {
      parentIndex = this.unique(parentIndex);
      this.validateAllFormFieldsErrorServer(findIndex, parentIndex, error);
    }
  }

  unique(arr) {
    return Array.from(new Set(arr));
  }

  validateAllFormFieldsErrorServer(findIndex, parentIndex, error: any) {
    Object.keys(error).forEach((key) => {
      let arrKey = String(key).split('.');
      let indexKey = '';
      if (arrKey.length == 1) {
        this.validationMessagesServer[arrKey[0]] = {
          message: error[key]
        }
      } else {
        arrKey.forEach((itemKey: any, indexChild) => {
          if (!isNaN(itemKey)) {
            if (indexChild == 0) {
              parentIndex.forEach((el, index) => {
                if (itemKey == el) {
                  indexKey += `${findIndex[index]}`;
                }
              });
            } else {
              indexKey += `${itemKey}`;
            }
          }
          Object.keys(this.validationMessagesServer).forEach(itemMessage => {
            if (itemMessage == arrKey[arrKey.length - 1]) {
              if (indexKey) {
                this.validationMessagesServer[itemMessage][indexKey] = {
                  message: error[key]
                }
              }
            }
          });
        })
      }
    });
  }

  getMessageServerLv1(key, i) {
    let indexKey = `${i}`;
    return this.validationMessagesServer[key][indexKey];
  }

  getMessageServer(key, i, j) {
    let indexKey = `${i}${j}`;
    return this.validationMessagesServer[key][indexKey];
  }

}
