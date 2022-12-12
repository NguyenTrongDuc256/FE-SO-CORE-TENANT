import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ShowMessageService} from "../../../../../_services/show-message.service";
import {ListenFirebaseService} from "../../../../../_services/listen-firebase.service";
import {SettingTenantService} from "../../../../../_services/layout-tenant/setting/setting-tenant.service";
import {NOTIFICATION_RECIPIENT_GROUP, SCOPE_NOTIFICATION} from "../../../../../_shared/utils/constant";
import {ActivatedRoute, Router} from "@angular/router";
import {GeneralService} from "../../../../../_services/general.service";

@Component({
  selector: 'app-tab-config-notification-send-tenant',
  templateUrl: './tab-config-notification-send-tenant.component.html',
  styleUrls: ['./tab-config-notification-send-tenant.component.scss']
})
export class TabConfigNotificationSendTenantComponent implements OnInit {
  isLoading: boolean = false;
  dataConfigSendNotification: any;
  scopeNotification = SCOPE_NOTIFICATION;
  notificationRecipientGroup = NOTIFICATION_RECIPIENT_GROUP;

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
    this.getConfigSendNotification();
  }

  getConfigSendNotification(): void {
    this.isLoading = true;
    this.settingTenantService.getConfigSendNotification().subscribe((res: any): void => {
        this.dataConfigSendNotification = res.data;
        this.isLoading = false;
      }, (err: any) => {
        this.generalService.showToastMessageError400(err);
        this.isLoading = false;
      }
    );
  }

  getNameScope(value) {
    let scopeItem = this.scopeNotification.find(el => el.value == value);
    return scopeItem ? scopeItem.label : '';
  }

  onOpenTabSendNotification(value: number): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        isUpdateConfigNotification: 1
      },
      queryParamsHandling: 'merge'
    });
  }
}
