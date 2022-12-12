import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NotificationList} from "../../../../../_models/layout-tenant/notification/notification.model";

@Component({
  selector: 'app-tab-notification-detail-sent-tenant',
  templateUrl: './tab-notification-detail-sent-tenant.component.html',
  styleUrls: ['./tab-notification-detail-sent-tenant.component.scss']
})
export class TabNotificationDetailSentTenantComponent implements OnInit, OnChanges {

  @Input() data?: any;
  dataNotification?: Partial<NotificationList>;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataNotification = changes.data.currentValue;
  }


}
