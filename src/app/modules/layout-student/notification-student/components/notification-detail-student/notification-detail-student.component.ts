import { Component, OnInit } from '@angular/core';
import {NotificationList} from "../../../../../_models/layout-student/notification/notification.model";
import {NotificationService} from "../../../../../_services/layout-student/notifiction/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GeneralService} from "../../../../../_services/general.service";

@Component({
  selector: 'app-notification-detail-student',
  templateUrl: './notification-detail-student.component.html',
  styleUrls: ['./notification-detail-student.component.scss']
})
export class NotificationDetailStudentComponent implements OnInit {
  tabActive = 0;
  isLoading: boolean = false;
  dataNotification?: Partial<NotificationList>;
  timePicker:boolean = false; // có hiển thị giờ phút hay không
  notificationId: string;
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
        this.router.navigate(['/student/notification']);
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
      this.router.navigate(['/student/notification']);
      this.isLoading = false;
      this.generalService.showToastMessageError400(_err);
    });
  }

}
