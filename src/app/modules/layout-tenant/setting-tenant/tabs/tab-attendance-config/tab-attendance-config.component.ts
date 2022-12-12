import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscriber} from 'rxjs';
import {DataAttendanceConfig} from 'src/app/_models/layout-tenant/setting/attendance-config.model';
import {
  SettingAttendanceTenantService
} from 'src/app/_services/layout-tenant/setting/setting-attendance-tenant.service';
import {ListenFirebaseService} from 'src/app/_services/listen-firebase.service';
import {ShowMessageService} from 'src/app/_services/show-message.service';
import {STATUS_ATTENDANCE, TIME_OUT_LISTEN_FIREBASE} from 'src/app/_shared/utils/constant';
import {GeneralService} from "../../../../../_services/general.service";

@Component({
  selector: 'app-tab-attendance-config',
  templateUrl: './tab-attendance-config.component.html',
  styleUrls: ['./tab-attendance-config.component.scss']
})
export class TabAttendanceConfigComponent implements OnInit {
  formGroup: FormGroup;
  isLoading: boolean = false;
  statusAttendance = STATUS_ATTENDANCE;
  validation_messages = {
    'timeAllowUpdateAttendance': [
      {type: 'required', message: "setting.attendanceConfig.timeAllowUpdateAttendanceRequired"}
    ]
  }

  constructor(
    private fb: FormBuilder,
    private showMessageService: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private settingAttendanceTenantService: SettingAttendanceTenantService,
    private generalService: GeneralService
  ) {
  }

  ngOnInit() {
    this.getInfomationConfigAttendance();
  }

  getInfomationConfigAttendance() {
    this.isLoading = true;
    this.settingAttendanceTenantService.getInfomationSettingAttendance().subscribe(
      (res: any) => {
        this.initForm(res.data);
        if (res.data && res.data.data && res.data.data.length > 0) {
          res.data.data.forEach(element => {
            const dataAttendanceConfig = this.formGroup.get('dataAttendanceConfig') as FormArray;
            dataAttendanceConfig.push(this.createDataAttendanceConfig(element));
          })
        }
        this.isLoading = false;
      },
      (err: any) => {
        this.generalService.showToastMessageError400(err);
        this.isLoading = false;
      }
    );
  }

  initForm(data = null) {
    this.formGroup = this.fb.group({
      timeAllowUpdateAttendance: [data ? data.timeAllowUpdateAttendance : 1, [Validators.required]],
      dataAttendanceConfig: new FormArray([])
    })
  }

  createDataAttendanceConfig(data = null) {
    return this.fb.group({
      code: data.code,
      isDefault: data ? data.isDefault == 1 ? true : false : false,
      isActive: data ? data.isActive == 1 ? true : false : false
    })
  }

  checkChangeIsDefault(item) {
    let attendanceConfigControl = this.formGroup.get('dataAttendanceConfig') as FormArray;
    attendanceConfigControl.controls.forEach((element) => {
      if (element.value.code != item.value.code) {
        (element as FormGroup).patchValue({isDefault: false});
      }
    });
  }

  getNameStatusAttendance(code: number) {
    return `statusAttendance.${this.statusAttendance.find(el => el.value == code).key}`;
  }

  saveFormSettingAttendance() {
    let dataConvert: DataAttendanceConfig[] = [];
    this.formGroup.value.dataAttendanceConfig.forEach(element => {
      dataConvert.push({
        code: element.code,
        isDefault: element.isDefault ? 1 : 0,
        isActive: element.isActive ? 1 : 0
      });
    })
    let dataInput = {
      timeAllowUpdateAttendance: Number(this.formGroup.value.timeAllowUpdateAttendance),
      data: dataConvert
    }
    this.listenFireBase('update', 'tenant-config/attendance');
    this.saveForm(dataInput);
  }

  saveForm(dataInput) {
    this.isLoading = true;
    this.settingAttendanceTenantService.updateInfomationSettingAttendance(dataInput).subscribe((res: any) => {
    }, (_err: any) => {
      this.isLoading = false;
    });
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
        this.getInfomationConfigAttendance();
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    });
  }
}
