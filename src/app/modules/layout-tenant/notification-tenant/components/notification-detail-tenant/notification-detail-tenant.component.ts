import { Component, OnInit } from '@angular/core';
import {
  NOTIFICATION_RECIPIENT_GROUP,
  SCOPE_NOTIFICATION,
  STATUS_NOTIFICATION,
} from "../../../../../_shared/utils/constant";
import {NotificationList, SendingScopeList} from "../../../../../_models/layout-tenant/notification/notification.model";
import {NotificationService} from "../../../../../_services/layout-tenant/notifiction/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GeneralService} from "../../../../../_services/general.service";

@Component({
  selector: 'app-notification-detail-staff',
  templateUrl: './notification-detail-tenant.component.html',
  styleUrls: ['./notification-detail-tenant.component.scss']
})
export class NotificationDetailTenantComponent implements OnInit {
  tabActive = 'tab-detail';
  isLoading: boolean = false;
  dataValueStatus = STATUS_NOTIFICATION;
  dataNotification?: Partial<NotificationList>;
  timePicker:boolean = false; // có hiển thị giờ phút hay không
  notificationId: string;
  dataSendingScope?: Partial<SendingScopeList>[] = SCOPE_NOTIFICATION;
  constructor(
    private notificationService: NotificationService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private generalService: GeneralService,
  ) {}

  ngOnInit() {
    this.activeRouter.params.subscribe((res: any) => {
      if (res.id) {
        this.notificationId = res.id;
        this.getDetailNotification();
      }
      else {
        this.router.navigate(['./tenant/notification']);
      }
    });
    this.activeRouter.queryParams.subscribe(qu => {
      this.tabActive = qu.tab || 'tab-detail';
    })
  }

  getDetailNotification(){
    this.isLoading = true;
    this.notificationService.show(this.notificationId).subscribe((res: any) => {
        this.dataNotification = res.data
        this.dataNotification.sendingScopeName = this.getDataScope(this.dataNotification.sendingScope);
        this.dataNotification.recipientGroupsLabel = this.getDataRecipientGroup(this.dataNotification.recipientGroups);
        this.dataNotification.statusLabel = this.getStatusName(this.dataNotification.status)
        this.isLoading = false;
    }, (_err: any) => {
      this.generalService.showToastMessageError400(_err)
      this.router.navigate(['./tenant/notification']);
      this.isLoading = false;
    });
  }

  getDataScope(value: number){
    const data = SCOPE_NOTIFICATION;
    return data.find(item => item.value === value) ? data.find(item => item.value === value).label : '';
  }

  getDataRecipientGroup(value: number[]){
    const data = NOTIFICATION_RECIPIENT_GROUP;
    let dataText = [];
    value.forEach((item, index) => {
      if (data.find(i => i.value == item)){
        dataText.push(data.find(i => i.value == item).label)
      }
    });
    return dataText;
  }

  getStatusName(value: number): string {
    if (value === 1)
      return 'sent';
    else
      return 'unsent';
  }

  activeTab(value:string){
    this.tabActive = value;
    this.router.navigate([], {
      relativeTo: this.activeRouter,
      queryParams: {
        tab: value
      },
      queryParamsHandling: 'merge'
    });
  }

}
