import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { Observable, Subscriber } from 'rxjs';
import { GeneralService } from 'src/app/_services/general.service';
import { BehaviorConfigStaffService } from 'src/app/_services/layout-staff/behavior-staff/behavior-config-staff.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { MESSAGE_ERROR_CALL_API, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-modal-form-behavior-staff',
  templateUrl: './modal-form-behavior-staff.component.html',
  styleUrls: ['./modal-form-behavior-staff.component.scss']
})
export class ModalFormBehaviorStaffComponent implements OnInit {
  @Input() dataModal: any;
  isLoading: boolean = false;
  formGroup!: FormGroup;
  checkFormUpdate: boolean = false;
  behaviorCategorySimpleList: Array<any>;
  isApplyTimeNumber: boolean;
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private listenFirebaseService: ListenFirebaseService,
    private showMessageService: ShowMessageService,
    private behaviorConfigStaffService: BehaviorConfigStaffService,
    private generalService: GeneralService,

  ) { }

  ngOnInit(): void {
    this.getIsApplyTimeNumber();
    this.behaviorCategorySimpleList = this.dataModal?.behaviorCategorySimpleList;
  }

  getIsApplyTimeNumber() {
    this.isLoading = true;
    this.behaviorConfigStaffService.getIsApplyTimeNumber().subscribe((res: any) => {
      this.isApplyTimeNumber = res.data == 0 ? false : true;
      this.initForm();
      this.changeIsApplyTimeNumber();
      this.isLoading = false;
    }, (err: any) => {
      this.isLoading = false;
      this.generalService.showToastMessageError400(err);
    })
  }

  initForm() {
    this.formGroup = this.fb.group({
      categoryId: [this.dataModal.nameForm == 'create' ? this.dataModal.categoryId : this.dataModal.dataFromParent.behaviorDetail.categoryId, [Validators.required]],
      code: this.dataModal.nameForm == 'create' ? this.dataModal.dataFromParent.codeBehavior : this.dataModal.dataFromParent.behaviorDetail.code,
      name: [this.dataModal.nameForm == 'create' ? '' : this.dataModal.dataFromParent.behaviorDetail.name, [Validators.required, Validators.maxLength(255)]],
      description: [this.dataModal.nameForm == 'create' ? '' : this.dataModal.dataFromParent.behaviorDetail.description],
      isApplyStudent: this.dataModal.nameForm == 'create' ? false : (this.dataModal.dataFromParent.behaviorDetail.isApplyStudent == 1 ? true : false),
      isApplyTeacher: this.dataModal.nameForm == 'create' ? false : (this.dataModal.dataFromParent.behaviorDetail.isApplyTeacher == 1 ? true : false),
      isApplyHomeroomClass: this.dataModal.nameForm == 'create' ? false : (this.dataModal.dataFromParent.behaviorDetail.isApplyHomeroomClass == 1 ? true : false),
      // isApplyTimeNumber: this.dataModal.nameForm == 'create' ? false : (this.dataModal.dataFromParent.behaviorDetail.isApplyTimeNumber == 1 ? true : false),
      point: [this.dataModal.nameForm == 'create' ? '' : this.dataModal.dataFromParent.behaviorDetail.point],
      pointByTimeNumbers: this.fb.array([]),
    });

    if (this.dataModal.nameForm == 'update') {
      if (this.isApplyTimeNumber) {
        if (this.dataModal.dataFromParent.behaviorDetail.pointByTimeNumbers.length > 0) {
          this.dataModal.dataFromParent.behaviorDetail.pointByTimeNumbers.forEach((el, i) => {
            if (this.dataModal.type == 1) {
              this.pointByTimeNumbers.push(this.fb.group({
                timeNumber: el.timeNumber,
                point: [el.point, [Validators.required, Validators.pattern('[0-9]*$')]],
              }));
            } else {
              this.pointByTimeNumbers.push(this.fb.group({
                timeNumber: el.timeNumber,
                point: [el.point, [Validators.required, Validators.pattern('^(?:-[0-9]+)?$')]],
              }));
            }
          });
        }
      }
    } else {
      this.addPoint();
      if (this.dataModal.type == 1) {
        this.formGroup.get('point').setValidators([Validators.required, Validators.pattern('[0-9]*$')]);
      } else {
        this.formGroup.get('point').setValidators([Validators.required, Validators.pattern('^(?:-[0-9]+)?$')]);
      }
      this.formGroup.get('point').updateValueAndValidity();
    }
  }

  get pointByTimeNumbers(): FormArray {
    return this.formGroup.get("pointByTimeNumbers") as FormArray
  }

  getFormGroupOfFormArray(index: number) {
    return this.pointByTimeNumbers.controls[index] as FormGroup;
  }

  newPointByTimeNumbers(): FormGroup {
    if (this.dataModal.type == 1) {
      return this.fb.group({
        timeNumber: null,
        point: [null, [Validators.required, Validators.pattern('[0-9]*$')]],
      })
    } else {
      return this.fb.group({
        timeNumber: null,
        point: [null, [Validators.required, Validators.pattern('^(?:-[0-9]+)?$')]],
      })
    }

  }

  addPoint() {
    this.pointByTimeNumbers.push(this.newPointByTimeNumbers());
  }

  clearPoint() {
    this.pointByTimeNumbers.clear();
  }

  removePoint(i: number) {
    this.pointByTimeNumbers.removeAt(i);
  }

  changeIsApplyTimeNumber() {
    if (!this.isApplyTimeNumber) {
      this.pointByTimeNumbers.clear();
      this.formGroup.get('point').setValidators(Validators.required);
      if (this.dataModal.type == 1) {
        this.formGroup.get('point').setValidators([Validators.required, Validators.pattern('[0-9]*$')]);
      } else {
        this.formGroup.get('point').setValidators([Validators.required, Validators.pattern('^(?:-[0-9]+)?$')]);
      }
      this.formGroup.get('point').updateValueAndValidity();
    } else {
      this.formGroup.get('point').clearValidators();
      this.formGroup.get('point').updateValueAndValidity();
      this.formGroup.controls["point"].setValue('');
      // this.addPoint();
    }
  }

  createBehavior() {
    if (this.isApplyTimeNumber) {
      for (let i = 0; i < this.pointByTimeNumbers.length; i++) {
        (this.pointByTimeNumbers.at(i)).get('timeNumber').patchValue(i + 1);
      }
    }

    let dataRequest = {
      categoryId: this.formGroup.value.categoryId,
      code: this.formGroup.value.code,
      name: this.formGroup.value.name,
      description: this.formGroup.value.description ? this.formGroup.value.description : null,
      type: this.dataModal.type,// điểm cộng, điểm trừ
      isApplyStudent: this.formGroup.value.isApplyStudent ? 1 : 0,
      isApplyTeacher: this.formGroup.value.isApplyTeacher ? 1 : 0,
      isApplyHomeroomClass: this.formGroup.value.isApplyHomeroomClass ? 1 : 0,
      // isApplyTimeNumber: this.formGroup.value.isApplyTimeNumber ? 1 : 0,//checkbox áp dụng chấm điểm theo lần
      isApplyTimeNumber: this.isApplyTimeNumber ? 1 : 0,
      point: this.formGroup.value.point ? this.formGroup.value.point : null,                   //ko tích checkbox thì bắt buộc nhập point
      pointByTimeNumbers: this.formGroup.value.pointByTimeNumbers       //tích checkbox thì bắt buộc ít nhất 1 ptu,
    }
    this.listenFireBase('create', 'behavior');
    this.behaviorConfigStaffService.createBehavior(dataRequest).subscribe((res: any) => {
      this.isLoading = false;
    }, (err: any) => {
      this.isLoading = false;
      this.validateAllFormFieldsErrorServer(err.errors);

    });
  }

  updateBehavior() {
    if (this.isApplyTimeNumber) {
      for (let i = 0; i < this.pointByTimeNumbers.length; i++) {
        (this.pointByTimeNumbers.at(i)).get('timeNumber').patchValue(i + 1);
      }
    }

    let dataRequest = {
      id: this.dataModal.dataFromParent.behaviorDetail.id,
      categoryId: this.formGroup.value.categoryId,
      code: this.formGroup.value.code,
      name: this.formGroup.value.name,
      description: this.formGroup.value.description ? this.formGroup.value.description : null,
      type: this.dataModal.type,// điểm cộng, điểm trừ
      isApplyStudent: this.formGroup.value.isApplyStudent ? 1 : 0,
      isApplyTeacher: this.formGroup.value.isApplyTeacher ? 1 : 0,
      isApplyHomeroomClass: this.formGroup.value.isApplyHomeroomClass ? 1 : 0,
      // isApplyTimeNumber: this.formGroup.value.isApplyTimeNumber ? 1 : 0,//checkbox áp dụng chấm điểm theo lần
      isApplyTimeNumber: this.isApplyTimeNumber ? 1 : 0,
      point: this.formGroup.value.point ? this.formGroup.value.point : null,                   //ko tích checkbox thì bắt buộc nhập point
      pointByTimeNumbers: this.formGroup.value.pointByTimeNumbers ? this.formGroup.value.pointByTimeNumbers : null        //tích checkbox thì bắt buộc ít nhất 1 ptu,
    }
    this.listenFireBase('update', 'behavior');
    this.behaviorConfigStaffService.updateBehavior(dataRequest).subscribe((res: any) => {
      this.isLoading = false;

    }, (err: any) => {
      this.isLoading = false;
      this.validateAllFormFieldsErrorServer(err.errors);

    });
  }

  submit() {
    this.isLoading = true;
    if (this.formGroup.valid) {
      if (this.dataModal.nameForm == 'create') {
        this.createBehavior();
      } else {
        this.updateBehavior();
      }
    } else {
      this.validateAllFormFields(this.formGroup);
    }
  }

  getMessageServer(key, i) {
    let indexKey = `${i}`;
    return this.validationMessagesServer[key][indexKey];
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
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

  validateAllFormFieldsErrorServer(error: any) {
    Object.keys(error).forEach(key => {
      let arrKey = String(key).split('.');
      let indexKey = '';
      if (arrKey.length == 1) {
        this.validationMessagesServer[arrKey[0]] = {
          message: error[key]
        }
      } else {
        arrKey.forEach((itemKey: any) => {
          if (!isNaN(itemKey)) {
            indexKey += `${itemKey}`;
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

  listenFireBase(action: string, module: string) {
    const timeId = setTimeout(() => {
      this.isLoading = false;
      this.showMessageService.error(MESSAGE_ERROR_CALL_API);
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

  validationMessages = {
    name: [
      {
        type: "required",
        message: 'behavior.requiredName'
      },
      {
        type: "maxlength",
        message: 'behavior.maxlengthName'
      }
    ],
    categoryId: [
      {
        type: "required",
        message: 'behavior.validators.behaviorCategories.required'
      }
    ],
    point: [
      {
        type: "required",
        message: 'behavior.requiredpoint'
      },
      {
        type: "pattern",
        message: 'behavior.patternPoint'
      }
    ]
  };

  validationMessagesServer = {
    name: {},
    categoryId: {},
    point: {}
  }



}