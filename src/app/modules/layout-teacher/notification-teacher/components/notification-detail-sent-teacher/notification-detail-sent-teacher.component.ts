import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {
  NotificationList
} from "../../../../../_models/layout-teacher/notification/notification.model";
import { NotificationService } from "../../../../../_services/layout-teacher/notifiction/notification.service";
import { ShowMessageService } from "../../../../../_services/show-message.service";
import {
  MESSAGE_ERROR_CALL_API, NOTIFICATION_RECIPIENT_GROUP,
  SCOPE_NOTIFICATION, TIME_OUT_LISTEN_FIREBASE
} from "../../../../../_shared/utils/constant";
import {GeneralService} from "../../../../../_services/general.service";

@Component({
  selector: 'app-notification-detail-sent-teacher',
  templateUrl: './notification-detail-sent-teacher.component.html',
  styleUrls: ['./notification-detail-sent-teacher.component.scss']
})
export class NotificationDetailSentTeacherComponent implements OnInit {
  tabActive = 'tab-detail' || 'tab-receiver';
  isLoading: boolean = false;
  dataNotification?: Partial<NotificationList>;
  notificationId: string;

  constructor(
    private showMessageService: ShowMessageService,
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
        this.router.navigate(['/teacher/notification/sent']);
      }
    });
    this.activeRouter.queryParams.subscribe(qu => {
      this.tabActive = qu.tab || 'tab-detail';
    })
  }

  getDetailNotification(){
    this.isLoading = true;
    this.notificationService.showSent(this.notificationId).subscribe((res: any) => {
      this.dataNotification = res.data
      this.dataNotification.sendingScopeName = this.getDataScope(this.dataNotification.sendingScope);
      this.dataNotification.recipientGroupsLabel = this.getDataRecipientGroup(this.dataNotification.recipientGroups);
      this.dataNotification.statusLabel = this.getStatusName(this.dataNotification.status)
      this.isLoading = false;
    }, (_err: any) => {
      this.router.navigate(['/teacher/notification/sent']);
      this.isLoading = false;
      this.generalService.showToastMessageError400(_err);
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
