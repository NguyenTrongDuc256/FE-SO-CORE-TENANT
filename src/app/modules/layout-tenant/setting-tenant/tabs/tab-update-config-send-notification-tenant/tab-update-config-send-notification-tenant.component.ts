import {Component, OnInit} from '@angular/core';
import {
  MESSAGE_ERROR_CALL_API,
  NOTIFICATION_RECIPIENT_GROUP,
  SCOPE_NOTIFICATION,
  TIME_OUT_LISTEN_FIREBASE
} from "../../../../../_shared/utils/constant";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {ShowMessageService} from "../../../../../_services/show-message.service";
import {ListenFirebaseService} from "../../../../../_services/listen-firebase.service";
import {SettingTenantService} from "../../../../../_services/layout-tenant/setting/setting-tenant.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscriber} from "rxjs";
import {GeneralService} from "../../../../../_services/general.service";

@Component({
  selector: 'app-tab-update-config-send-notification-tenant',
  templateUrl: './tab-update-config-send-notification-tenant.component.html',
  styleUrls: ['./tab-update-config-send-notification-tenant.component.scss']
})
export class TabUpdateConfigSendNotificationTenantComponent implements OnInit {
  isLoading: boolean = false;
  isSubmitForm: boolean = false;
  dataConfigSendNotification: any;
  scopeNotification = SCOPE_NOTIFICATION;
  notificationRecipientGroup = NOTIFICATION_RECIPIENT_GROUP;
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private showMessageService: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private settingTenantService: SettingTenantService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private generalService: GeneralService,
  ) {
  }

  ngOnInit(): void {
    this.initForm()
    this.getConfigSendNotification();
  }

  getConfigSendNotification(): void {
    this.isLoading = true;
    this.settingTenantService.getConfigSendNotification().subscribe((res: any): void => {
        this.dataConfigSendNotification = res.data;
        if (this.dataConfigSendNotification && this.dataConfigSendNotification.length > 0) {
          this.dataConfigSendNotification.forEach(el => {
            this.addItemToData(el);
          });
        }
        this.isLoading = false;
      }, (err: any) => {
        this.generalService.showToastMessageError400(err);
        this.isLoading = false;
      }
    );
  }

  get data(): FormArray {
    return this.formGroup.get('data') as FormArray;
  }

  get recipientGroupConfigs(): FormArray {
    return this.formGroup.get('recipientGroupConfigs') as FormArray;
  }

  addItemToData(item: any): void {
    const itemForm = this.fb.group({
      scope: [item.scope],
      recipientGroupConfigs: this.fb.array(item.recipientGroupConfigs.map(r => this.fb.group(r))),
    })
    this.data.push(itemForm);
  }

  initForm() {
    this.formGroup = this.fb.group({
      data: this.fb.array([])
    });
  }

  getNameScope(value) {
    let scopeItem = this.scopeNotification.find(el => el.value == value);
    return scopeItem ? scopeItem.label : '';
  }

  cancelUpdateConfigSendNotification() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        isUpdateConfigNotification: 0
      },
      queryParamsHandling: 'merge'
    });
  }

  onSubmit(formValue) {
    this.isLoading = true
    let dataInput = {
      scopeConfigs: formValue.data
    };

    this.listenFireBase("update-config", "announcement");
    this.settingTenantService.updateConfigSendNotification(dataInput).subscribe((res: any) => {
      if (res.status == 0 && res.status != undefined) {
        this.isLoading = false;
        this.showMessageService.error(res.msg);
      }
    }, (_err: any) => {
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
        this.isLoading = false;
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {
            isUpdateConfigNotification: 0
          },
          queryParamsHandling: 'merge'
        });
      } else {
        this.isLoading = false;
        this.isSubmitForm = false;
      }
    });
  }

}
