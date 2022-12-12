import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DATA_PERMISSION} from "../../../../../_shared/utils/constant";

@Component({
  selector: 'app-tab-config-tenant',
  templateUrl: './tab-config-tenant.component.html',
  styleUrls: ['./tab-config-tenant.component.scss']
})
export class TabConfigTenantComponent implements OnInit {

  tabConfigActive: string = 'login';
  isUpdateSendNotification: number = 0;
  permission: any = DATA_PERMISSION;
  @Input() customerId:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(el => {
      if (el.tabConfig) {
        this.tabConfigActive = el.tabConfig;
        this.isUpdateSendNotification = el.isUpdateConfigNotification;
      }
    })
  }

  onChangeTabConfig(value: string) {
    this.tabConfigActive = value;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        tabConfig: value,
        isUpdateConfigNotification: value == 'sendNotification' ? 0 : null,
      },
      queryParamsHandling: 'merge'
    });
  }
}
