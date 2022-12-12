import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { NotificationService } from 'src/app/_services/layout-staff/notifiction/notification.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ModalDeleteComponent } from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import { AVATAR_DEFAULT, DATA_PERMISSION, NOTIFICATION_RECIPIENT_GROUP, PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT, SCOPE_NOTIFICATION, STATUS_NOTIFICATION_ENUM } from 'src/app/_shared/utils/constant';
import { RecipientGroupList } from 'src/app/_models/layout-staff/notification/notification.model';
import {GeneralService} from "../../../../../_services/general.service";

@Component({
  selector: 'app-notification-in-school',
  templateUrl: './notification-in-school.component.html',
  styleUrls: ['./notification-in-school.component.scss', '../../helper.scss']
})
export class NotificationInSchoolComponent implements OnInit {

  sendingScope: number | '' = '';
  arrSendingScope = SCOPE_NOTIFICATION;
  recipientGroup: number | '' = '';
  arrRecipientGroup: Partial<RecipientGroupList>[] = NOTIFICATION_RECIPIENT_GROUP;
  status: '' | 0 | 1 = '';
  keyword = '';
  pageIndex = PAGE_INDEX_DEFAULT; // Trang hiện tại
  pageSize = PAGE_SIZE_DEFAULT; // Số bản ghi trong 1 trang
  collectionSize = 0; // Tổng số lượng bản ghi
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT; // Thay đổi pageSize
  isLoading = false;
  permission = DATA_PERMISSION;
  arrList = [];
  startDate: string = '';
  endDate: string = '';
  createBy = '';
  arrCreateBy = [];
  avatarDefault = AVATAR_DEFAULT;
  statusNotiObj = STATUS_NOTIFICATION_ENUM;

  constructor(
    private modalService: NgbModal,
    private showMessage: ShowMessageService,
    private notificationService: NotificationService,
    private generalService: GeneralService,
  ) { }

  ngOnInit(): void {
    this.getListScope();
    this.getList();
  }

  getListScope() {
    this.isLoading = true;
    this.notificationService.getListScopeToFilter().subscribe((res: any) => {
      this.arrSendingScope = SCOPE_NOTIFICATION.filter(item => res.data.includes(item.value))
        this.isLoading = false;
    }, (_err) => {
      this.generalService.showToastMessageError400(_err)
    })
  }

  getList() {
    this.isLoading = true;
    this.notificationService.getAllNotiInSchool(this.keyword, this.sendingScope, this.recipientGroup, this.createBy, this.status, this.startDate, this.endDate, this.pageIndex, this.pageSize).subscribe((res: any) => {
      this.arrList = res.data.data;
      this.arrList.forEach(item => {
        item['scopeName'] = SCOPE_NOTIFICATION.find(sc => sc.value == item.sendingScope).label || '--';
        item['recipientName'] = SCOPE_NOTIFICATION.find(sc => sc.value == item.sendingScope).label || '--';
      })
      this.collectionSize = res.totalItems;
      this.isLoading = false;
    }, (_err) => {
      this.generalService.showToastMessageError400(_err)
    })
  }

  mapNameRecipient(recipientCode: number) {
    return NOTIFICATION_RECIPIENT_GROUP.find(item => item.value == recipientCode).label || '--';
  }

  onDataTimeOutput(event:any){
    this.startDate = event.startDate;
    this.endDate = event.endDate;
    this.getList();
  }

  delete(id: string, name: string) {
    const modalRef = this.modalService.open(ModalDeleteComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      modalDialogClass: 'modal-md-plus',
    });

    let data = {
      titleModal: 'notification.titleDialogDeleteNoti',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.delete',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        dataInput: id,
        service: this.notificationService,
        apiSubmit: (dataInput: any) => this.notificationService.deleteNotification(dataInput),
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'announcement',
        textConfirmHeader:
          translate('notification.textConfirmDeleteNoti1') +
          ' ' +
          name +
          ' ' +
          translate('notification.textConfirmDeleteNoti2'),
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.pageIndex = PAGE_INDEX_DEFAULT;
          this.getList();
        }
      },
      (reason) => {}
    );
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
    this.keyword = value.trim();
    this.getList();
  }

  filter() {
    this.getList();
  }

  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getList();
  }

}
