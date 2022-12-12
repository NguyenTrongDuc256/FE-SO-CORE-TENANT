import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {ShowMessageService} from "../../../../../_services/show-message.service";
import {ListenFirebaseService} from "../../../../../_services/listen-firebase.service";
import {SettingTenantService} from "../../../../../_services/layout-tenant/setting/setting-tenant.service";
import {MESSAGE_ERROR_CALL_API, TIME_OUT_LISTEN_FIREBASE} from "../../../../../_shared/utils/constant";
import {Observable, Subscriber} from "rxjs";
import {GeneralService} from "../../../../../_services/general.service";

@Component({
  selector: 'app-tab-config-study-time-tenant',
  templateUrl: './tab-config-study-time-tenant.component.html',
  styleUrls: ['./tab-config-study-time-tenant.component.scss']
})
export class TabConfigStudyTimeTenantComponent implements OnInit {
  isLoading: boolean = false;
  formGroup: FormGroup;
  allConfigSaturdayChecked: boolean = true;
  allConfigSundayChecked: boolean = false;
  allCheckedSat: boolean = false;
  allCheckedSun: boolean = false;

  constructor(
    private fb: FormBuilder,
    private showMessageService: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private settingTenantService: SettingTenantService,
    private generalService: GeneralService
  ) {
  }

  ngOnInit(): void {
    this.getConfigStudyTime();
  }

  getConfigStudyTime(): void {
    this.isLoading = true;
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading == true) {
        this.isLoading = false;
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.settingTenantService.getConfigStudyTime().subscribe(
      (res: any): void => {
        clearTimeout(timeoutCallAPI);
        this.initForm();
        if (res.data.configSaturday.length > 0) {
          res.data.configSaturday.forEach(item => {
            this.addConfigSaturday(item);
          });
          this.allCheckedSat = res.data.configSaturday.every(el => el.isConfig == 1);
        }
        if (res.data.configSunday.length > 0) {
          res.data.configSunday.forEach(item => {
            this.addConfigSunday(item);
          });
          this.allCheckedSun = res.data.configSunday.every(el => el.isConfig == 1);
        }
        this.isLoading = false;
      }, (err: any) => {
        clearTimeout(timeoutCallAPI);
        this.generalService.showToastMessageError400(err);
        this.isLoading = false;
      }
    );
  }

  get configSaturday(): FormArray {
    return this.formGroup.get('configSaturday') as FormArray;
  }

  get configSunday(): FormArray {
    return this.formGroup.get('configSunday') as FormArray;
  }

  addConfigSaturday(dataConfigSunday: any): void {
    const itemForm = this.fb.group({
      id: [dataConfigSunday.id],
      name: [dataConfigSunday.name],
      isConfig: [!!dataConfigSunday.isConfig],
    })
    this.configSaturday.push(itemForm);
  }

  addConfigSunday(dataConfigSunday: any): void {
    const itemForm = this.fb.group({
      id: [dataConfigSunday.id],
      name: [dataConfigSunday.name],
      isConfig: [!!dataConfigSunday.isConfig],
    })
    this.configSunday.push(itemForm);
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      configSaturday: this.fb.array([]),
      configSunday: this.fb.array([]),
    });
  }

  onSubmit(formValue): void {
    this.isLoading = true;

    let dataConfigSaturday = [];
    let dataConfigSunday = [];

    if (formValue.configSaturday.length > 0) {
      formValue.configSaturday.forEach(el => {
        dataConfigSaturday.push({
          name: el.name,
          isConfig: el.isConfig ? 1 : 0,
        })
      })
    }

    if (formValue.configSunday.length > 0) {
      formValue.configSunday.forEach(el => {
        dataConfigSunday.push({
          name: el.name,
          isConfig: el.isConfig ? 1 : 0,
        })
      })
    }
    let dataInput = {
      configSaturday: dataConfigSaturday,
      configSunday: dataConfigSunday,
    }

    this.listenFireBase("update", "tenant-config/study-time");
    this.settingTenantService.updateConfigStudyTime(dataInput).subscribe((res: any) => {
    }, (_err: any) => {
      this.isLoading = false;
    })
  }

  listenFireBase(action: string, module: string): void {
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading == true) {
        this.isLoading = false;
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>) => {
      this.listenFirebaseService.checkFireBase(action, module, subscriber);
    });
    listenFb.subscribe((ref) => {
      clearTimeout(timeoutCallAPI);
      if (ref.status) {
        this.getConfigStudyTime();
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    });
  }

  onChangeCheckAll(event, type: 'sat' | 'sun'): void {
    if (type == 'sat') {
      this.configSaturday.controls.forEach(item => {
        item.get('isConfig').patchValue(event);
      })
      this.allCheckedSat = this.configSaturday.controls.every(item => item.get('isConfig').value)
    }
    if (type == 'sun') {
      this.configSunday.controls.forEach(item => {
        item.get('isConfig').patchValue(event);
      })
      this.allCheckedSun = this.configSunday.controls.every(item => item.get('isConfig').value)
    }
  }

  updateSingleChecked(event: boolean, index: number, type: 'sat' | 'sun'): void {
    if (type == 'sat') {
      this.allCheckedSat = this.configSaturday.controls.every(item => item.get('isConfig').value);
    }
    if (type == 'sun') {
      this.allCheckedSun = this.configSunday.controls.every(item => item.get('isConfig').value);
    }
  }
}
