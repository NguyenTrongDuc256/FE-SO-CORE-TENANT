import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NotificationList} from "../../../../../_models/layout-tenant/notification/notification.model";

@Component({
  selector: 'app-tab-notification-detail-sent-staff',
  templateUrl: './tab-notification-detail-sent-staff.component.html',
  styleUrls: ['./tab-notification-detail-sent-staff.component.scss']
})
export class TabNotificationDetailSentStaffComponent implements OnInit, OnChanges {

  @Input() data?: any;
  dataNotification?: Partial<NotificationList>;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataNotification = changes.data.currentValue;
  }

}
