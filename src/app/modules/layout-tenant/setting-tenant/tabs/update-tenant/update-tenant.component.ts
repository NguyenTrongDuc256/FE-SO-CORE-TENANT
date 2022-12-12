import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {
  BACKGROUND_LOGIN_DEFAULT,
  CURRENCY_UNIT,
  DATA_PERMISSION, FAVICON_DEFAULT,
  LANGUAGE,
  LOCATION, LOGO_DEFAULT,
  MAX_LENGTH_FULL_NAME,
  MESSAGE_ERROR_CALL_API, REGEX_EMAIL,
  REGEX_PHONE,
  TIME_OUT_LISTEN_FIREBASE,
  TIMEZONE
} from "../../../../../_shared/utils/constant";
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {
  InputUpdate,
  TenantInfo,
  ValidateUpdateTenant
} from "../../../../../_models/layout-tenant/setting/setting-tenant.model";
import {Observable, Subscriber} from "rxjs";
import * as moment from "moment";
import {ResizeImageService} from "../../../../../_services/resize-image.service";
import {GeneralService} from "../../../../../_services/general.service";
import {ShowMessageService} from "../../../../../_services/show-message.service";
import {translate} from "@ngneat/transloco";
import {ListenFirebaseService} from "../../../../../_services/listen-firebase.service";
import {SettingTenantService} from "../../../../../_services/layout-tenant/setting/setting-tenant.service";

@Component({
  selector: 'app-update-tenant',
  templateUrl: './update-tenant.component.html',
  styleUrls: ['./update-tenant.component.scss']
})
export class UpdateTenantComponent implements OnInit {
  permission = DATA_PERMISSION;
  isLoading: boolean = false;
  @Output() isSuccessUpdateEvent = new EventEmitter<boolean>();
  @Input() tenantInfo;
  formGroup: FormGroup;
  locationList: any = LOCATION;
  timeZoneList: any = TIMEZONE;
  languageList: any = LANGUAGE;
  currencyUnitList: any = CURRENCY_UNIT;
  logoDefault: string = LOGO_DEFAULT;
  faviconDefault: string = FAVICON_DEFAULT;
  backgroundLoginDefault: string = BACKGROUND_LOGIN_DEFAULT;

  @ViewChild('fileInputLogo') fileInputLogo: ElementRef;
  @ViewChild('fileInputFavicon') fileInputFavicon: ElementRef;
  @ViewChild('fileInputBackgroundLogin') fileInputBackgroundLogin: ElementRef;
  fileNameLogo: string = '';
  fileNameFavicon: string = '';
  fileNameBackgroundLogin: string = '';

  validationMessages: ValidateUpdateTenant = {
    name: [
      {
        type: "required",
        message: 'setting.validators.name.required',
      },
      {
        type: "maxlength",
        message: 'setting.validators.name.maxlength',
      }
    ],
    email: [
      {
        type: "pattern",
        message: 'setting.validators.email.pattern',
      }
    ],
    address: [
      {
        type: "address",
        message: 'setting.validators.address.maxlength',
      }
    ],
    phone: [
      {
        type: "pattern",
        message: 'setting.validators.phone.pattern',
      }
    ],
  };
  validationMessagesServer = {
    name: {},
    email: {},
    address: {},
    phone: {},
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private resizeImageService: ResizeImageService,
    private generalService: GeneralService,
    private showMessageService: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private settingTenantService: SettingTenantService
  ) {
  }

  ngOnInit(): void {
    if (this.tenantInfo) {
      this.fileNameLogo = this.tenantInfo.logo;
      this.fileNameFavicon = this.tenantInfo.favicon;
      this.fileNameBackgroundLogin = this.tenantInfo.backgroundLogin;
      this.initForm(this.tenantInfo);
    }
  }

  onChangeFileUpload(event: any, typeImg: 1 | 2 | 3): void { // 1: Logo, 2: Favicon, 3: Background login
    if (event.target.files.length > 0) {
      this.isLoading = true;
      const file = (event.target as HTMLInputElement).files[0];
      if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
        this.showMessageService.error(translate('msgCheckImg'));
        if (typeImg == 1) {
          this.fileInputLogo.nativeElement.value = '';
        } else if (typeImg == 2) {
          this.fileInputFavicon.nativeElement.value = '';
        } else {
          this.fileInputBackgroundLogin.nativeElement.value = '';
        }
        this.isLoading = false;
        return;
      }
      if (typeImg == 1) {
        this.fileNameLogo = file.name;
      } else if (typeImg == 2) {
        this.fileNameFavicon = file.name;
      } else {
        this.fileNameBackgroundLogin = file.name;
      }

      let dataReadFile = new Observable((subscriber: Subscriber<any>) => {
        this.resizeImageService.readFile(file, subscriber);
      })
      dataReadFile.subscribe((data) => {
        let dataInput = {
          base64Input: data,
          fileName: `${moment().format('x')}-${file.name}`
        }
        this.generalService.uploadFileBase64(dataInput).subscribe((res: any) => {
          if (typeImg == 1) {
            this.formGroup.controls["logo"].setValue(res.data);
          } else if (typeImg == 2) {
            this.formGroup.controls["favicon"].setValue(res.data);
          } else {
            this.formGroup.controls["backgroundLogin"].setValue(res.data);
          }
          this.isLoading = false;
        })
      })
    }
  }

  onDeleteFileUpload(typeImg: 1 | 2 | 3): void {
    if (typeImg == 1) {
      this.fileInputLogo.nativeElement.value = '';
      this.fileNameLogo = '';
      this.formGroup.controls["logo"].setValue(this.logoDefault);
    } else if (typeImg == 2) {
      this.fileInputFavicon.nativeElement.value = '';
      this.fileNameFavicon = '';
      this.formGroup.controls["favicon"].setValue(this.faviconDefault);
    } else {
      this.fileInputBackgroundLogin.nativeElement.value = '';
      this.fileNameBackgroundLogin = '';
      this.formGroup.controls["backgroundLogin"].setValue(this.backgroundLoginDefault);
    }
  }

  initForm(tenantInfo: TenantInfo): void {
    this.formGroup = this.fb.group({
      name: [tenantInfo.name, [Validators.required, Validators.maxLength(MAX_LENGTH_FULL_NAME)]],
      isActive: [!!tenantInfo.isActive],
      logo: [tenantInfo.logo || this.logoDefault],
      backgroundLogin: [tenantInfo.backgroundLogin || this.backgroundLoginDefault],
      favicon: [tenantInfo.favicon || this.faviconDefault],
      phone: [tenantInfo.phone, [Validators.pattern(REGEX_PHONE)]],
      email: [tenantInfo.email, [Validators.pattern(REGEX_EMAIL)]],
      address: [tenantInfo.address,[Validators.maxLength(MAX_LENGTH_FULL_NAME)]],
      areaCode: [tenantInfo.areaCode],
      timeZoneCode: [tenantInfo.timeZoneCode],
      languageCode: [tenantInfo.languageCode],
      monetaryUnitCode: [tenantInfo.monetaryUnitCode],
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

  onSubmit(dataForm: any): void {
    this.isLoading = true;
    if (this.formGroup.valid) {
      this.updateTenant(dataForm);
    } else {
      this.isLoading = false
      this.validateAllFormFields(this.formGroup);
    }
  }

  updateTenant(dataForm) {
    let dataInput: InputUpdate = {
      id: this.tenantInfo.id,
      name: dataForm.name,
      isActive: dataForm.isActive ? 1 : 0,
      logo: dataForm.logo,
      backgroundLogin: dataForm.backgroundLogin,
      favicon: dataForm.favicon,
      phone: dataForm.phone,
      email: dataForm.email,
      address: dataForm.address,
      areaCode: dataForm.areaCode,
      timeZoneCode: dataForm.timeZoneCode,
      languageCode: dataForm.languageCode,
      monetaryUnitCode: dataForm.monetaryUnitCode,
    }

    this.listenFireBase("update", "tenant-manager");
    this.settingTenantService.updateTenant(this.tenantInfo.id, dataInput).subscribe((res: any) => {
    }, (_err: any) => {
      this.validateAllFormFieldsErrorServer(_err.errors);
      this.isLoading = false;
    })
  }

  listenFireBase(action: string, module: string): void {
    setTimeout(() => {
      if (this.isLoading) {
        this.isLoading = false;
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>) => {
      this.listenFirebaseService.checkFireBase(action, module, subscriber);
    });

    listenFb.subscribe((ref) => {
      if (ref.status) {
        this.isLoading = false;
        this.isSuccessUpdateEvent.emit(true);
        this.router.navigate(['/tenant/setting']);
      }
       else {
        this.isLoading = false;
      }
    });
  }
}
