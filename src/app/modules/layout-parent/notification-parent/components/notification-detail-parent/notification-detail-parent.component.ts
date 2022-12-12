import { Component, OnInit } from '@angular/core';
import {
  MESSAGE_ERROR_CALL_API,
  TIME_OUT_LISTEN_FIREBASE
} from "../../../../../_shared/utils/constant";
import {NotificationList} from "../../../../../_models/layout-parent/notification/notification.model";
import {ShowMessageService} from "../../../../../_services/show-message.service";
import {NotificationService} from "../../../../../_services/layout-parent/notifiction/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GeneralService} from "../../../../../_services/general.service";

@Component({
  selector: 'app-notification-detail-student',
  templateUrl: './notification-detail-parent.component.html',
  styleUrls: ['./notification-detail-parent.component.scss']
})
export class NotificationDetailParentComponent implements OnInit {
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
        this.router.navigate(['/parent/notification']);
      }
    });
    // this.initForm();
  }

  getDetailNotification(){
    this.isLoading = true;

    this.notificationService.show(this.notificationId).subscribe((res: any) => {
      this.dataNotification = res.data
      this.isLoading = false;

    }, (_err: any) => {
      this.router.navigate(['/parent/notification']);
      this.isLoading = false;
      this.generalService.showToastMessageError400(_err);
    });
  }

}
