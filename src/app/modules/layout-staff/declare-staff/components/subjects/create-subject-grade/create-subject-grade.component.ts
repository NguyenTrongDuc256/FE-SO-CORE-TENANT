import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { translate } from '@ngneat/transloco';
import { Observable, Subscriber } from 'rxjs';
import { GeneralService } from 'src/app/_services/general.service';
import { SubjectGradeStaffService } from 'src/app/_services/layout-staff/declare/subject-grade-staff.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import {
  ValidatorNotNull
} from 'src/app/_services/validator-custom.service';
import {
  GRADING_TYPE, MESSAGE_ERROR_CALL_API, OBJ_TYPE_OF_SUBJECT, PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT, TIME_OUT_LISTEN_FIREBASE
} from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-create-subject-grade',
  templateUrl: './create-subject-grade.component.html',
  styleUrls: ['./create-subject-grade.component.scss', '../../../helper.scss'],
})
export class CreateSubjectGradeComponent implements OnInit {
  isLoading = false;
  arrGrades = localStorage.getItem('dataConfigSystem') ? JSON.parse(localStorage.getItem('dataConfigSystem')).grades : [];
  gradeId = '';
  formSubmit: FormGroup;
  arrList = [];
  arrSubjectMOET = [];
  isCheckAll = false;
  pageIndexDefault = PAGE_INDEX_DEFAULT;
  pageSizeDefault = PAGE_SIZE_DEFAULT;
  arrGradingType = GRADING_TYPE;
  arrReportTypes = [];
  OBJ_TYPE_OF_SUBJECT = OBJ_TYPE_OF_SUBJECT;
  isContinueCreate = false;
  educationalStage = localStorage.getItem('currentUnit') ? JSON.parse(localStorage.getItem('currentUnit')).educationalStages : null;
  validationMessagesServer = {
    OtherName: {},
    GradebookType: {},
    ReportTypeId: {},
    ReportTypeFormulaCode: {},
    MoetSubjectCode: {}
  }

  constructor(
    private fb: FormBuilder,
    private listenFirebaseService: ListenFirebaseService,
    private showMessageService: ShowMessageService,
    private subjectGradeStaffService: SubjectGradeStaffService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {
    this.arrGrades = this.arrGrades.filter(item => item.isActive == 1 && item.educationalStages == this.educationalStage);
    let queryParam = this.activatedRoute.snapshot.queryParams.gradeId;
    if (queryParam) {
      this.gradeId = queryParam;
    } else this.gradeId = this.arrGrades[0]?.id;
    this.initForm();
    this.getListSubject();
    this.getListReportType();
  }

  getListSubject() {
    this.isLoading = true;
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.subjectGradeStaffService
      .getListSubjectToCreate(
        this.pageSizeDefault,
        this.pageIndexDefault,
        this.gradeId, ''
      )
      .subscribe((res: any) => {
        this.arrList = res.data;
        this.isLoading = false;
        for (let val of this.arrList) {
          this.createFormGroup(val);
        }
        this.arrSubjectMOET = this.arrList.filter(it => it.SubjectType == this.OBJ_TYPE_OF_SUBJECT.SUBJECT_MOET)
      }, (_err: any) => {
        clearTimeout(timeoutCallAPI);
        this.generalService.showToastMessageError400(_err);
        this.isLoading = false;
      });
  }

  getListReportType() {
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.subjectGradeStaffService.getListReportType().subscribe((res: any) => {
      this.arrReportTypes = res.data;
      this.isLoading = false;
    }, (_err: any) => {
      clearTimeout(timeoutCallAPI);
      this.generalService.showToastMessageError400(_err);
      this.isLoading = false;
    });
  }

  initForm() {
    this.formSubmit = this.fb.group({
      subjectGroup: this.fb.array([]),
    });
  }

  get getFormArray() {
    return this.formSubmit.get('subjectGroup') as FormArray;
  }

  getFormGroupOfFormArray(index: number) {
    return this.getFormArray.controls[index] as FormGroup;
  }

  createFormGroup(dataForm: any) {
    this.getFormArray.push(this.initFormGroupSubjectItem(dataForm));
  }

  // init form group 1 subject
  initFormGroupSubjectItem(dataForm: any): FormGroup {
    return this.fb.group({
      IsCheck: false,
      SubjectId: dataForm?.id,
      Name: dataForm?.Name,
      Code: dataForm?.Code,
      SubjectType: dataForm.SubjectType || '',
      OtherName: ['', [Validators.maxLength(255)]],
      GradebookType: [1, [Validators.required, ValidatorNotNull]],
      IsPrivateGradebook: false,
      ReportTypeId: [''],
      IsSyncMoet: false,
      ConvertMethod: this.fb.array([]),
    });
  }

  // init form group 1 method
  initFormGroupConvertMethod(dataForm, arrConvertMethod): FormGroup {
    return this.fb.group({
      arrConvertMethod: arrConvertMethod ? [arrConvertMethod] : [[]],
      ReportTypeFormulaCode: ['', [Validators.required, ValidatorNotNull]],
      MoetSubjectCode: ['', [Validators.required, ValidatorNotNull]],
    });
  }

  getFormArrayConvertMethod(index: number) {
    return this.getFormGroupOfFormArray(index).controls[
      'ConvertMethod'
    ] as FormArray;
  }

  getFormGroupOfFormArrayConvertMethod(index1: number, index2: number) {
    return this.getFormArrayConvertMethod(index1).at(index2) as FormGroup;
  }

  createArrConvertMethod(dataForm: any, index: number, arrConvertMethod) {
    this.getFormArrayConvertMethod(index).push(
      this.initFormGroupConvertMethod(dataForm, arrConvertMethod)
    );
  }

  createConvertMethod(index1: number) {
    let reportTypeId =
      this.getFormGroupOfFormArray(index1).controls['ReportTypeId'].value;
    let arrMethod = this.arrReportTypes.find(
      (item) => item.id == reportTypeId
    )?.ConvertMethod;
    this.createArrConvertMethod(arrMethod, index1, arrMethod);
  }

  removeControlOfArr(index1: number, index2: number) {
    let length = this.getFormArrayConvertMethod(index1).controls.length;
    if (length > 1) {
      this.getFormArrayConvertMethod(index1).removeAt(index2);
    } else {
      return this.showMessageService.warning(translate('declare.warmingDelConvertMethod'));
    }
  }

  resetForm() {
    this.getFormArray.clear();
    this.isCheckAll = false;
    this.getListSubject();
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
    let dataInput = [];
    let findIndex = [];
    valueForm.subjectGroup.forEach((element, index) => {
      if (element.IsCheck) {
        findIndex.push(index);
      }
    });
    let result = valueForm.subjectGroup.filter((item) => item.IsCheck);
    if (result.length == 0) {
      this.isLoading = false;
      return this.showMessageService.warning(translate('declare.requiredSubject'))
    }
    result.forEach((element) => {
      dataInput.push({
        OtherName: element.OtherName.trim(),
        SubjectId: element.SubjectId,
        GradebookType: +element.GradebookType,
        IsPrivateGradebook: +element.IsPrivateGradebook,
        ReportTypeId: element.ReportTypeId,
        IsSyncMoet: +element.IsSyncMoet,
        ConvertMethod: element.ConvertMethod.map(
          ({ arrConvertMethod, ...rest }) => ({ ...rest })
        ),
      });
    });
    this.isLoading = true;
    this.listenFireBase('create', 'subject-grade', this.isContinueCreate);
    this.subjectGradeStaffService
      .create(dataInput, this.gradeId)
      .subscribe((res: any) => {
        this.isLoading = false;
      }, (_err) => {
        this.isLoading = false;
        this.mapErrorData(findIndex, _err.errors);
      });
  }

  checkedAll(event: boolean) {
    let arr = this.getFormArray.controls;
    arr.forEach(item => {
      item.get('IsCheck').setValue(event);
    })
    this.isCheckAll = arr.every(item => item.get('IsCheck').value)
  }

  checked(event: boolean, index: any) {
    if (!event) {
      // reset value form control
      let fb = this.getFormGroupOfFormArray(index).controls;
      (fb['ConvertMethod'] as FormArray).clear();
      fb['GradebookType'].setValue('');
      fb['IsPrivateGradebook'].setValue(false);
      fb['IsSyncMoet'].setValue(false);
      fb['ReportTypeId'].setValue('');
      fb['GradebookType'].setValue(1);
      fb['OtherName'].setValue('');
    }
    this.isCheckAll = this.getFormArray.controls.every(item => item.get('IsCheck').value);
  }

  changeGradingType(index: number) {
    if (
      this.getFormGroupOfFormArray(index).controls['GradebookType'].value ==
      this.arrGradingType[1].value ||
      this.getFormGroupOfFormArray(index).controls['GradebookType'].value == ''
    ) {
      this.getFormGroupOfFormArray(index).controls[
        'IsPrivateGradebook'
      ].setValue(false);
    }
  }

  changePrivateGradebook(event: boolean, valueChecked: any, index: number) {
    if (event) {
      this.getFormGroupOfFormArray(index).controls[
        'ReportTypeId'
      ].setValidators([Validators.required, ValidatorNotNull]);
    } else {
      this.getFormGroupOfFormArray(index).controls[
        'ReportTypeId'
      ].clearValidators();
      this.getFormGroupOfFormArray(index).controls[
        'ReportTypeId'
      ].setValue('');
      this.getFormGroupOfFormArray(index).controls['IsSyncMoet'].setValue(
        false
      );
    }
  }

  changeReportType(index: number) {
    this.getFormGroupOfFormArray(index).controls[
      'IsSyncMoet'
    ].setValue(false);
    this.getFormArrayConvertMethod(index).clear();
  }

  changeSyncMoet(
    event: boolean,
    index1: number,
  ) {
    let reportTypeId =
      this.getFormGroupOfFormArray(index1).controls['ReportTypeId'].value;
    let arrMethod = this.arrReportTypes.find(
      (item) => item.id == reportTypeId
    )?.ConvertMethod;
    if (event) {
      this.createArrConvertMethod(arrMethod, index1, arrMethod);
      this.getFormGroupOfFormArray(index1).controls[
        'ReportTypeId'
      ].setValidators([Validators.required, ValidatorNotNull]);
    } else {
      this.getFormArrayConvertMethod(index1).clear();
      this.getFormGroupOfFormArray(index1).controls[
        'ReportTypeId'
      ].clearValidators();
    }
  }

  filter() {
    this.resetForm();
    this.getListSubject();
  }

  cancel() {
    this.router.navigate(['staff/declare/subject/subject-grade']);
  }

  listenFireBase(action: string, module: string, isContinueCreate: boolean) {
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
        if (!isContinueCreate) {
          this.router.navigate(['staff/declare/subject/subject-grade']);
        } else {
          this.isContinueCreate = false;
          this.resetForm();
        }
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
