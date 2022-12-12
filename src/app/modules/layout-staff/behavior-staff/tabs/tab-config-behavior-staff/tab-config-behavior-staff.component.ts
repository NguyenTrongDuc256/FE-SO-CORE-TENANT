import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { GradingConfig } from 'src/app/_models/layout-staff/behavior/grading-config.model';
import { GeneralService } from 'src/app/_services/general.service';
import { BehaviorConfigStaffService } from 'src/app/_services/layout-staff/behavior-staff/behavior-config-staff.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { DATA_PERMISSION, MESSAGE_ERROR_CALL_API, RESET_TIME_NUNBER_TYPE, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-tab-config-behavior-staff',
  templateUrl: './tab-config-behavior-staff.component.html',
  styleUrls: ['./tab-config-behavior-staff.component.scss']
})
export class TabConfigBehaviorStaffComponent implements OnInit {
  formGroup: FormGroup;
  timeNumberType = RESET_TIME_NUNBER_TYPE;
  behaviorConfigData: GradingConfig;
  isLoading: boolean = false;
  permission = DATA_PERMISSION;
  constructor(
    private fb: FormBuilder,
    private showMessageService: ShowMessageService,
    private behaviorConfigStaffService: BehaviorConfigStaffService,
    private listenFirebaseService: ListenFirebaseService,
    private generalService: GeneralService,

  ) { }

  ngOnInit() {
    this.behaviorConfigInfo();
  }

  initForm() {
    this.formGroup = this.fb.group({
      gradingBackdate: [this.behaviorConfigData?.gradingBackdate ? this.behaviorConfigData?.gradingBackdate : '', [Validators.required, Validators.pattern('^[0-9][0-9]*$')]],
      cancellingBackdate: [this.behaviorConfigData?.cancellingBackdate ? this.behaviorConfigData?.cancellingBackdate : '', [Validators.required, Validators.pattern('^[0-9][0-9]*$')]],
      resetTimeNumberType: [this.behaviorConfigData?.resetTimeNumberType ? this.behaviorConfigData?.resetTimeNumberType : 0],
      warningPoint: [this.behaviorConfigData?.warningPoint ? this.behaviorConfigData?.warningPoint : ''],
      isApplyTimeNumber: this.behaviorConfigData?.isApplyTimeNumber ? this.behaviorConfigData?.isApplyTimeNumber : false
    });
  }

  behaviorConfigInfo() {
    this.isLoading = true;
    this.behaviorConfigStaffService.behaviorConfigInfo().subscribe((res: any) => {
      this.isLoading = false;
      this.behaviorConfigData = res.data;
      this.initForm();

    }, (err: any) => {
      this.isLoading = false;
      this.generalService.showToastMessageError400(err);
    })
  }

  updateBehaviorConfig() {
    this.isLoading = true;
    if (this.formGroup.valid) { }
    else {
      this.validateAllFormFields(this.formGroup);
    }

    let dataRequest: GradingConfig = {
      gradingBackdate: this.formGroup.value.gradingBackdate,
      cancellingBackdate: this.formGroup.value.cancellingBackdate,
      resetTimeNumberType: this.formGroup.value.resetTimeNumberType,
      warningPoint: this.formGroup.value.warningPoint ? this.formGroup.value.warningPoint : null,
      isApplyTimeNumber: this.formGroup.value.isApplyTimeNumber ? 1 : 0
    }
    this.listenFireBase("update-grading-config", "behavior-config");
    this.behaviorConfigStaffService.updateBehaviorConfig(dataRequest).subscribe((res: any) => {
      this.isLoading = false;
    }, (_err: any) => {
      this.isLoading = false;
      this.validateAllFormFieldsErrorServer(_err.errors);
    })
  }

  listenFireBase(action: string, module: string) {
    setTimeout(() => {
      if (this.isLoading == true) {
        this.isLoading = false;
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>) => {
      this.listenFirebaseService.checkFireBase(action, module, subscriber);
    });
    listenFb.subscribe((ref) => {
      this.isLoading = false;
    });
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

  validationMessages = {
    gradingBackdate: [
      {
        type: "required",
        message: 'Bạn chưa nhập thời gian có thể sửa kết quả'
      },
      {
        type: "pattern",
        message: 'Chỉ chứa các kí tự từ 0-9'
      }
    ],
    cancellingBackdate: [
      {
        type: "required",
        message: 'Bạn chưa nhập thời gian có thể xóa kết quả'
      },
      {
        type: "pattern",
        message: 'Chỉ chứa các kí tự từ 0-9'
      }
    ],
    resetTimeNumberType: [
      {
        type: "required",
        message: ''
      },

    ],
    warningPoint: [
      {
        type: "required",
        message: 'Bạn chưa nhập cấu hình điểm cảnh báo'
      }
    ]
  };
  validationMessagesServer = {
    gradingBackdate: {},
    cancellingBackdate: {},
    resetTimeNumberType: {},
    warningPoint: {},
  }

}
