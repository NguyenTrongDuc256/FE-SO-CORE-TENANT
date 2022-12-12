import { AVATAR_DEFAULT, STATUS_NOTIFICATION_ENUM } from 'src/app/_shared/utils/constant';
import { Component, OnInit } from '@angular/core';
import {
  DATA_PERMISSION,
  MESSAGE_ERROR_CALL_API, NOTIFICATION_RECIPIENT_GROUP,
  PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT,
  SCOPE_NOTIFICATION,
  STATUS_NOTIFICATION,
  TIME_OUT_LISTEN_FIREBASE
} from "../../../../../_shared/utils/constant";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ShowMessageService} from "../../../../../_services/show-message.service";
import {translate} from "@ngneat/transloco";
import {ModalDeleteComponent} from "../../../../../_shared/modals/modal-delete/modal-delete.component";
import {
  NotificationList,
  RecipientGroupList,
  SendingScopeList
} from "../../../../../_models/layout-staff/notification/notification.model";
import {NotificationService} from "../../../../../_services/layout-staff/notifiction/notification.service";
import {GeneralService} from "../../../../../_services/general.service";
@Component({
  selector: 'app-notification-list-sent-teacher',
  templateUrl: './notification-list-sent-staff.component.html',
  styleUrls: ['./notification-list-sent-staff.component.scss', '../../helper.scss']
})
export class NotificationListSentStaffComponent implements OnInit {
  permission = DATA_PERMISSION;
  collectionSize: number = 0;
  sizeOption: number[] = PAGE_SIZE_OPTIONS_DEFAULT;
  pageIndex: number = PAGE_INDEX_DEFAULT;
  pageSize: number = PAGE_SIZE_DEFAULT;
  keyWord: string = '';
  isLoading: boolean = false;
  valueSendingScope: number | '' = '';
  valueRecipientGroup: number | '' = '';
  valueStatus: number | '' = '';
  valueToTime: string = '';
  valueFromTime: string = '';
  dataSource?: Partial<NotificationList>[];
  dataSendingScope?: Partial<SendingScopeList>[] = SCOPE_NOTIFICATION;
  dataRecipientGroup?: Partial<RecipientGroupList>[];
  dataValueStatus = STATUS_NOTIFICATION;
  avatarDefault = AVATAR_DEFAULT;
  statusNotiObj = STATUS_NOTIFICATION_ENUM;

  constructor(
    private modalService: NgbModal,
    private showMessageService: ShowMessageService,
    private notificationService: NotificationService,
    private generalService: GeneralService,
  ) {}

  ngOnInit(): void {
    this.getDataNotification();
    this.getDataGeneralList()
    this.getDataRecipientGroupsList()
  }

  getDataGeneralList(){
    this.isLoading = true;
    this.notificationService.getSendingScopesList().subscribe((ref: any) => {
        const data = [];
        ref.data.forEach(item => {
          data.push(this.dataSendingScope.find(i => i.value === item))
        });
        this.dataSendingScope = data;
        this.isLoading = false;
    }, (_err: any) => {
      this.generalService.showToastMessageError400(_err);
      this.isLoading = false;
    });
  }

  getDataNotification() {
    this.isLoading = true;
    this.notificationService.getNotificationListSent(this.keyWord, this.valueSendingScope, this.valueRecipientGroup, this.valueStatus, this.valueFromTime, this.valueToTime, this.pageIndex, this.pageSize).subscribe((res: any) => {
      this.collectionSize = res.data.totalItems;
      this.dataSource = res.data.data;
      this.dataSource.forEach(item => {
        item.sendingScopeName = this.getDataScope(item.sendingScope);
        item.recipientGroupsLabel = this.getDataRecipientGroup(item.recipientGroups);
        item.statusLabel = this.getStatusName(item.status)
      })
      this.isLoading = false;
    }, (_err: any) => {
      this.generalService.showToastMessageError400(_err);
      this.isLoading = false;
    });
  }

  getStatusName(value: number): string {
    if (value === 1)
      return 'sent';
    else
      return 'unsent';
  }

  getDataRecipientGroupsList(){
    const dataRecipientGroups = NOTIFICATION_RECIPIENT_GROUP;
    if (this.valueSendingScope != 0){
      this.notificationService.getRecipientGroupsList(this.valueSendingScope).subscribe((ref: any) => {
        const data = [];
        ref.data.forEach(item => {
          data.push(dataRecipientGroups.find(i => i.value === item))
        });
        this.dataRecipientGroup = data;
        this.isLoading = false;
      }, (_err: any) => {
        this.generalService.showToastMessageError400(_err);
        this.isLoading = false;
      });
    }
    else {
      this.dataRecipientGroup = dataRecipientGroups
    }
  }

  onChangeSelect(scope?: string) {
    if (scope){
      this.valueRecipientGroup = '';
    }
    this.getDataRecipientGroupsList()
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

  openModalConfirmDelete(item: any) {
    const modalRef = this.modalService.open(ModalDeleteComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        size: 'modal-md-plus',
      });

    let data = {
      titleModal: translate('notification.titleDialogDeleteNoti'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        dataInput: item.id,
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'announcement',
        apiSubmit: (dataInput: any) => this.notificationService.deleteNotification(dataInput)
      }
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result === true) {
        this.getDataNotification();
      }
    }, (reason) => {
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
}

