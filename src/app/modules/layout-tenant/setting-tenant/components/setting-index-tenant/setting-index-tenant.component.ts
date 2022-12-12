import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DATA_PERMISSION, MESSAGE_ERROR_CALL_API, TIME_OUT_LISTEN_FIREBASE} from "../../../../../_shared/utils/constant";
import {ShowMessageService} from "../../../../../_services/show-message.service";
import {SettingTenantService} from "../../../../../_services/layout-tenant/setting/setting-tenant.service";
import {TenantInfo} from "../../../../../_models/layout-tenant/setting/setting-tenant.model";
import {GeneralService} from "../../../../../_services/general.service";

@Component({
  selector: 'app-setting-index-tenant',
  templateUrl: './setting-index-tenant.component.html',
  styleUrls: ['./setting-index-tenant.component.scss']
})
export class SettingIndexTenantComponent implements OnInit {
  tabActive: string = 'info';
  isUpdateTabInfo: number = 0;
  isLoading: boolean = false;
  tenantInfoLocalStorage: { Id: string, Code: string, Name: string } | null =
    localStorage.getItem('Tenant') ? JSON.parse(localStorage.getItem('Tenant')) : null;
  tenantInfo: TenantInfo;
  permission = DATA_PERMISSION;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private showMessageService: ShowMessageService,
    private settingTenantService: SettingTenantService,
    private generalService: GeneralService
  ) {
  }

  ngOnInit(): void {
    this.getTenantInfoById(this.tenantInfoLocalStorage.Id);
    this.activatedRoute.queryParams.subscribe(el => {
      if (el.tab) {
        this.tabActive = el.tab;
        if (el.isUpdateTabInfo != undefined) {
          this.isUpdateTabInfo = el.isUpdateTabInfo;
        }
      } else {
        this.tabActive = 'info';
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {
            tab: 'info',
            isUpdateTabInfo: 0
          },
          queryParamsHandling: 'merge'
        });
      }
    })
  }

  changeTab(value: string): void {
    this.tabActive = value;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        tab: value,
        isUpdateTabInfo: value == 'info' ? 0 : null,
        tabConfig: null,
        isUpdateConfigNotification: null,
      },
      queryParamsHandling: 'merge'
    });

  }

  getTenantInfoById(tenantId: string): void {
    this.isLoading = true;
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);

    this.settingTenantService.getTenantInfoById(tenantId).subscribe((res: any) => {
      clearTimeout(timeoutCallAPI);
      this.tenantInfo = res.data;
      this.isLoading = false;
    }, (_err: any) => {
      clearTimeout(timeoutCallAPI);
      this.generalService.showToastMessageError400(_err)
      this.isLoading = false;
    });
  }

  checkSuccessUpdateEvent(isSuccessUpdateEvent: boolean): void {
    if (isSuccessUpdateEvent) this.getTenantInfoById(this.tenantInfoLocalStorage.Id);
  }
}
