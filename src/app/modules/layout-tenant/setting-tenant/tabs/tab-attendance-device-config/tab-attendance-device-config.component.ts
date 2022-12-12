import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { DataAttendanceDeviceConfig } from 'src/app/_models/layout-tenant/setting/attendance-config.model';
import { SettingAttendanceTenantService } from 'src/app/_services/layout-tenant/setting/setting-attendance-tenant.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { STATUS_ATTENDANCE, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-tab-attendance-device-config',
  templateUrl: './tab-attendance-device-config.component.html',
  styleUrls: ['./tab-attendance-device-config.component.scss']
})
export class TabAttendanceDeviceConfigComponent implements OnInit {
  formGroup: FormGroup;
  isLoading: boolean = false;
  statusAttendance = STATUS_ATTENDANCE;

  constructor(
    private fb: FormBuilder,
    private showMessageService: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private settingAttendanceTenantService: SettingAttendanceTenantService
  ) { }

  ngOnInit() {
    this.getDataAttendanceDeviceConfig();
  }

  getDataAttendanceDeviceConfig() {
    this.isLoading = true;
    this.settingAttendanceTenantService.getInfomationSettingAttendanceDevice().subscribe(
      (res: any) => {
        if (res.status == 0) {
          this.showMessageService.error(res.msg);
        }
        this.initForm(res.data);
        if (this.formGroup) {
          if (res.data && res.data.data && res.data.data.length > 0) {
            res.data.data.forEach(element => {
              const itemAttendanceDevice = this.formGroup.get('data') as FormArray;
              itemAttendanceDevice.push(this.createItemAttendanceConfig(element));
            });
          }
        }
        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
      }
    );
  }

  initForm(data = null) {
    this.formGroup = this.fb.group({
      isUseHanet: data ? data.data == 1 ? true : false : false,
      data: new FormArray([])
    })
  }

  createItemAttendanceConfig(data = null) {
    return this.fb.group({
      from: [data ? data.from : '', [Validators.required]],
      to: [data ? data.to : '', [Validators.required]],
      typeStatus: [data ? data.typeStatus : '', [Validators.required]],
      typeAttendance: [data ? data.typeAttendance : '', [Validators.required]]
    })
  }

  addItem() {
    const itemAttendanceDevice = this.formGroup.get('data') as FormArray;
    itemAttendanceDevice.push(this.createItemAttendanceConfig());
  }

  removeItem(i: number) {
    const itemAttendanceDevice = this.formGroup.get('data') as FormArray;
    itemAttendanceDevice.removeAt(i);
  }

  getNameStatusAttendance(value: number) {
    return `statusAttendance.${this.statusAttendance.find(el => el.value == value).key}`;
  }

  saveFormAttendanceDeviceConfig() {
    let dataConvert:DataAttendanceDeviceConfig[] = [];
    this.formGroup.value.data.forEach(element => {
      dataConvert.push({
        from: element.from,
        to: element.to,
        typeAttendance: Number(element.typeAttendance),
        typeStatus: Number(element.typeStatus)
      });
    })
    let dataInput = {
      isUseHanet: this.formGroup.value.isUseHanet ? 1 : 0,
      data: dataConvert
    }
    this.listenFireBase('update', 'tenant-config/attendance/device');
    this.saveForm(dataInput);
  }

  saveForm(dataInput) {
    this.isLoading = true;
    this.settingAttendanceTenantService.updateInfomationSettingAttendanceDevice(dataInput).subscribe((res: any) => {
      if (res.status == 0) {
        this.showMessageService.error(res.msg);
        this.isLoading = false;
      }
      else {
        this.isLoading = false;
      }
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
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    });
  }

}
