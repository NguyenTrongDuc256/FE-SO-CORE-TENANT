import {Component, Input, OnInit} from '@angular/core';
import {
  BACKGROUND_LOGIN_DEFAULT,
  DATA_PERMISSION,
  FAVICON_DEFAULT,
  LOGO_DEFAULT
} from "../../../../../_shared/utils/constant";
import {ActivatedRoute, Router} from "@angular/router";
import {TenantInfo} from "../../../../../_models/layout-tenant/setting/setting-tenant.model";

@Component({
  selector: 'app-info-tenant',
  templateUrl: './info-tenant.component.html',
  styleUrls: ['./info-tenant.component.scss']
})
export class InfoTenantComponent implements OnInit {
  permission = DATA_PERMISSION;
  @Input() tenantInfo: TenantInfo;
  logoDefault: string = LOGO_DEFAULT;
  faviconDefault: string = FAVICON_DEFAULT;
  backgroundLoginDefault: string = BACKGROUND_LOGIN_DEFAULT;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

  }

  onChangeIsUpdateInfo(value: number): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        isUpdateTabInfo: value
      },
      queryParamsHandling: 'merge'
    });
  }
}
