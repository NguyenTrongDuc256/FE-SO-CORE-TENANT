import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { translate } from "@ngneat/transloco";
import {
  ObjectReceivedInfo
} from "../../../../../_models/layout-teacher/notification/notification.model";
import { NotificationService } from "../../../../../_services/layout-teacher/notifiction/notification.service";
import { ShowMessageService } from "../../../../../_services/show-message.service";
import { ModalDeleteComponent } from "../../../../../_shared/modals/modal-delete/modal-delete.component";
import {
  AVATAR_DEFAULT,
  DATA_PERMISSION, PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT
} from "../../../../../_shared/utils/constant";
import {GeneralService} from "../../../../../_services/general.service";
export const STATUS_NOTIFICATION = [
  { value: 0, label: 'unsent' },
  { value: 1, label: 'sent' },
  { value: 2, label: 'notification.read' }
]
@Component({
  selector: 'app-tab-notification-list-sent-teacher',
  templateUrl: './tab-notification-list-sent-teacher.component.html',
  styleUrls: ['./tab-notification-list-sent-teacher.component.scss']
})
export class TabNotificationListSentTeacherComponent implements OnInit {
  avatar: string = AVATAR_DEFAULT;
  permission = DATA_PERMISSION;
  collectionSize: number = 0;
  sizeOption: number[] = PAGE_SIZE_OPTIONS_DEFAULT;
  pageIndex: number = PAGE_INDEX_DEFAULT;
  pageSize: number = PAGE_SIZE_DEFAULT;
  oldPageIndex = this.pageIndex;
  keyWord: string = '';
  isLoading: boolean = false;
  valueStatus: number | '' = '';
  dataSource?: Partial<ObjectReceivedInfo>[];
  dataStatus = STATUS_NOTIFICATION;
  notificationId: string;
  totalRecipient:number = 0;

  constructor(
    private modalService: NgbModal,
    private showMessageService: ShowMessageService,
    private notificationService: NotificationService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private generalService: GeneralService,
  ) {
  }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((res: any) => {
      if (res.id) {
        this.notificationId = res.id;
        this.getDataListReceived();
      }
      else {
        this.router.navigate(['/teacher/notification/sent']);
      }
    });
  }

  getDataListReceived() {
    this.isLoading = true;
    this.notificationService.getSendListReceived(this.notificationId, this.keyWord, this.valueStatus, this.pageIndex, this.pageSize).subscribe((res: any) => {
      this.collectionSize = res.data.totalItems;
      this.dataSource = res.data.data;
      this.totalRecipient = res.data.dataInfo;
      this.dataSource.forEach(item => {
        item.statusName = this.getStatusName(item.status)
      })
      this.isLoading = false;
      this.oldPageIndex = this.pageIndex;
    }, (_err: any) => {
      this.router.navigate(['/teacher/notification/sent']);
      this.generalService.showToastMessageError400(_err);
      this.isLoading = false;
    });
  }

  onChangeSelect() {
    this.getDataListReceived();
  }

  paginationChange(event: any) {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getDataListReceived();
  }

  search(event, value: string) {
    // if (event.key === 'Enter' || event.key === 'Tab') {
    //   this.searchByValue(value);
    // }
    if (event.key === 'Enter') {
      this.searchByValue(value);
    }
  }

  searchClickIcon(value: string) {
    this.searchByValue(value);
  }

  searchByValue(value: string) {
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.keyWord = value.trim();
    this.getDataListReceived();
  }

  getStatusName(value: number): string {
    if (value === 0)
      return 'unsent';
    else if (value === 1)
      return 'sent';
    else
      return 'notification.read';
  }

  openModalConfirmDelete(item: any) {
    const modalRef = this.modalService.open(ModalDeleteComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        size: 'modal-md-plus'
      });

    let data = {
      titleModal: translate('notification.deleteRecipient'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        dataInput: {id: item.id, announcementId: this.notificationId},
        keyFirebaseAction: 'remove-user',
        keyFirebaseModule: 'announcement',
        apiSubmit: (dataInput: any) => this.notificationService.deleteObjectReceived(dataInput)
      }
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result === true) {
        this.pageIndex = PAGE_INDEX_DEFAULT;
        this.oldPageIndex = this.pageIndex;
        this.getDataListReceived();
      }
    }, (reason) => {
    });
  }

}
