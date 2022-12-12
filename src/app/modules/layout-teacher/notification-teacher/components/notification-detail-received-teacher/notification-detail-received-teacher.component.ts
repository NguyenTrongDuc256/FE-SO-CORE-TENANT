import { Component, OnInit } from '@angular/core';
import {
  MESSAGE_ERROR_CALL_API,
  TIME_OUT_LISTEN_FIREBASE
} from "../../../../../_shared/utils/constant";
import {NotificationList} from "../../../../../_models/layout-teacher/notification/notification.model";
import {ShowMessageService} from "../../../../../_services/show-message.service";
import {NotificationService} from "../../../../../_services/layout-teacher/notifiction/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GeneralService} from "../../../../../_services/general.service";

@Component({
  selector: 'app-notification-detail-teacher',
  templateUrl: './notification-detail-received-teacher.component.html',
  styleUrls: ['./notification-detail-received-teacher.component.scss']
})
export class NotificationDetailReceivedTeacherComponent implements OnInit {
  tabActive = 0;
  isLoading: boolean = false;
  dataNotification?: Partial<NotificationList>;
  timePicker:boolean = false; // có hiển thị giờ phút hay không
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
        this.router.navigate(['/teacher/notification/received']);
      }
    });
    // this.initForm();
  }

  getDetailNotification(){
    this.isLoading = true;

    this.notificationService.showReceived(this.notificationId).subscribe((res: any) => {
      this.dataNotification = res.data
      this.isLoading = false;

    }, (_err: any) => {
      this.router.navigate(['/teacher/notification/received']);
      this.isLoading = false;
      this.generalService.showToastMessageError400(_err);
      this.showMessageService.error(_err);
    });
  }

}
