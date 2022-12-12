import { Component, OnInit } from '@angular/core';
import {
  AVATAR_DEFAULT,
  DATA_PERMISSION, MESSAGE_ERROR_CALL_API,
  PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT, SCOPE_NOTIFICATION, STATUS_NOTIFICATION, TIME_OUT_LISTEN_FIREBASE
} from "../../../../../_shared/utils/constant";
import {
  CreatedByList,
  NotificationList,
} from "../../../../../_models/layout-parent/notification/notification.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ShowMessageService} from "../../../../../_services/show-message.service";
import {NotificationService} from "../../../../../_services/layout-parent/notifiction/notification.service";
import {GeneralService} from "../../../../../_services/general.service";


@Component({
  selector: 'app-notification-list-student',
  templateUrl: './notification-list-parent.component.html',
  styleUrls: ['./notification-list-parent.component.scss']
})
export class NotificationListParentComponent implements OnInit {
  permission = DATA_PERMISSION;
  collectionSize: number = 0;
  sizeOption: number[] = PAGE_SIZE_OPTIONS_DEFAULT;
  pageIndex: number = PAGE_INDEX_DEFAULT;
  pageSize: number = PAGE_SIZE_DEFAULT;
  keyWord: string = '';
  isLoading: boolean = false;
  valueCreatedBy: string = '';
  valueToTime: string = '';
  valueFromTime: string = '';
  dataSource?: Partial<NotificationList>[];
  dataCreatedBy?: Partial<CreatedByList>[];
  dataValueStatus = STATUS_NOTIFICATION;

  avatarDefault = AVATAR_DEFAULT;

  constructor(
    private modalService: NgbModal,
    private showMessageService: ShowMessageService,
    private notificationService: NotificationService,
    private generalService: GeneralService,
  ) {}

  ngOnInit(): void {
    this.getDataNotification();
    this.getDataGeneralList()
  }

  getDataGeneralList(){
    this.isLoading = true;
    this.notificationService.getObjectsCreatedList().subscribe((ref: any) => {
      this.dataCreatedBy = ref.data;
      this.isLoading = false;
    }, (_err: any) => {
      this.generalService.showToastMessageError400(_err);
      this.isLoading = false;
    });
  }

  getDataNotification() {
    this.isLoading = true;
    this.notificationService.getNotificationList(this.keyWord, this.valueCreatedBy, this.valueFromTime, this.valueToTime, this.pageIndex, this.pageSize).subscribe((res: any) => {
      this.collectionSize = res.data.totalItems;
      this.dataSource = res.data.data;
      this.dataSource.forEach(item => {
        item.sendingScopeName = this.getDataScope(item.sendingScope);
      })
      this.isLoading = false;
    }, (_err: any) => {
      this.generalService.showToastMessageError400(_err);
      this.isLoading = false;
    });
  }

  getDataScope(value: number){
    const data = SCOPE_NOTIFICATION;
    return data.find(item => item.value === value) ? data.find(item => item.value === value).label : '';
  }

  onChangeSelect() {
    this.getDataNotification()
  }

  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getDataNotification();
  }

  onClickSearch(valueSearch) {
    this.keyWord = valueSearch;
    this.getDataNotification();
  }

  onEventKeyupEnter(valueSearch) {
    this.keyWord = valueSearch;
    this.getDataNotification();
  }

  // lay data khi chon ngày xong
  onDataTimeOutput(event:any){
    this.valueFromTime = event.startDate;
    this.valueToTime = event.endDate;
    this.getDataNotification()
  }

}
