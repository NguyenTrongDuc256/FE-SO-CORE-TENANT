import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MESSAGE_ERROR_CALL_API, REGEX_LINK, TIME_OUT_LISTEN_FIREBASE} from "../../../../../_shared/utils/constant";
import {DetailConfigLogin, UpdateConfigLogin} from "../../../../../_models/layout-tenant/setting/setting-tenant.model";
import {Observable, Subscriber} from "rxjs";
import {ShowMessageService} from "../../../../../_services/show-message.service";
import {ListenFirebaseService} from "../../../../../_services/listen-firebase.service";
import {SettingTenantService} from "../../../../../_services/layout-tenant/setting/setting-tenant.service";
import {GeneralService} from "../../../../../_services/general.service";

@Component({
  selector: 'app-tab-config-login-tenant',
  templateUrl: './tab-config-login-tenant.component.html',
  styleUrls: ['./tab-config-login-tenant.component.scss']
})
export class TabConfigLoginTenantComponent implements OnInit {
  isLoading: boolean = false;
  formGroup: FormGroup;
  tenantInfoLocalStorage: { Id: string, Code: string, Name: string } | null =
    localStorage.getItem('Tenant') ? JSON.parse(localStorage.getItem('Tenant')) : null;
  validationMessages = {
    linkAndroid: [
      {
        type: "pattern",
        message: 'setting.validators.linkUrl.pattern',
      },
    ],
    linkIOS: [
      {
        type: "pattern",
        message: 'setting.validators.linkUrl.pattern',
      }
    ],
  };

  validationMessagesServer = {
    linkAndroid: {},
    linkIOS: {},
  }

  constructor(
    private fb: FormBuilder,
    private showMessageService: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private settingTenantService: SettingTenantService,
    private generalService: GeneralService
  ) {
  }

  ngOnInit(): void {
    this.getConfigLogin();
  }

  getConfigLogin(): void {
    this.isLoading = true;
    this.settingTenantService.getConfigLogin().subscribe((res: any): void => {
        this.initForm(res.data);
        this.isLoading = false;
      }, (err: any) => {
        this.generalService.showToastMessageError400(err);
        this.isLoading = false;
      }
    );
  }

  initForm(data: DetailConfigLogin): void {
    this.formGroup = this.fb.group({
      isContainsAtLeastOneNumeric: [!!data.isContainsAtLeastOneNumeric],
      isContainsAtLeastOneSpecial: [!!data.isContainsAtLeastOneSpecial],
      isContainsAtLeastOneUppercase: [!!data.isContainsAtLeastOneUppercase],
      linkAndroid: [data ? data.linkAndroid : '', [Validators.pattern(REGEX_LINK)]],
      linkIOS: [data ? data.linkIOS : '', [Validators.pattern(REGEX_LINK)]],
    });
  }

  onSubmit(dataForm: any): void {
    this.isLoading = true;
    if (this.formGroup.valid) {
      this.updateConfigLogin(dataForm);
    } else {
      this.validateAllFormFields(this.formGroup);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
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


  updateConfigLogin(formValue): void {
    let dataInput: UpdateConfigLogin = {
      isContainsAtLeastOneNumeric: !!formValue.isContainsAtLeastOneNumeric,
      isContainsAtLeastOneSpecial: !!formValue.isContainsAtLeastOneSpecial,
      isContainsAtLeastOneUppercase: !!formValue.isContainsAtLeastOneUppercase,
      linkAndroid: formValue.linkAndroid || null,
      linkIOS: formValue.linkIOS || null,
    };

    this.listenFireBase("update-login-config", "tenant-config");
    this.settingTenantService.updateConfigLogin(dataInput).subscribe((res: any) => {
    }, (_err: any) => {
      this.validateAllFormFieldsErrorServer(_err.errors);
      this.isLoading = false;
    })
  }

  listenFireBase(action: string, module: string): void {
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
      if (ref.status) {
        this.getConfigLogin();
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    });
  }
}
