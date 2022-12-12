import { translate } from '@ngneat/transloco';
import { Observable, Subscriber } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  LAYOUTS_TENANT,
  TIME_OUT_LISTEN_FIREBASE,
} from 'src/app/_shared/utils/constant';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ModalDeleteComponent } from 'src/app/_shared/modals/modal-delete/modal-delete.component';

@Component({
  selector: 'app-modal-list-role-user-layout-tenant',
  templateUrl: './modal-list-role-user.component.html',
  styleUrls: ['./modal-list-role-user.component.scss', '../../helper.scss'],
})
export class ModalListRoleUserComponent implements OnInit {
  isLoading = false;
  keyword = '';
  listRole = [];
  listRoleOriginal = [];
  @Input() dataModal: any;
  dataFromParent: any;

  constructor(
    public activeModal: NgbActiveModal,
    private listenFirebaseService: ListenFirebaseService,
    private showMessage: ShowMessageService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.dataFromParent = this.dataModal.dataFromParent;
    this.listRole = this.dataFromParent.arrList;
    this.listRoleOriginal = this.dataFromParent.arrList;
  }

  mapNameLayout(value: string) {
    return LAYOUTS_TENANT.find((layout) => layout.code == value)?.name || '--';
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
    this.isLoading = true;
    this.keyword = value.trim();
    this.listRole = this.listRoleOriginal.filter(
      (item) =>
        item.roleName.toLowerCase().includes(this.keyword.toLowerCase()) ||
        item.roleCode.toLowerCase().includes(this.keyword.toLowerCase())
    );
    this.isLoading = false;
  }

  remove(id: string, name: string, userRoleId: string) {
    const modalRef = this.modalService.open(ModalDeleteComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      modalDialogClass: 'modal-md-plus',
    });

    let data = {
      titleModal: 'school.titleDialogRemoveRole',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.remove',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        roleId: id,
        userId: this.dataFromParent.userId,
        dataInput: {
          userRoleId: userRoleId,
          userId: this.dataFromParent.userId,
          roleId: id,
        },
        apiSubmit: (dataInput: any) => this.dataFromParent.apiSubmit(dataInput),
        keyFirebaseAction: this.dataFromParent.keyFirebaseAction,
        keyFirebaseModule: this.dataFromParent.keyFirebaseModule,
        textConfirmHeader:
          translate('school.textConfirmRemoveRole1') +
          ' ' +
          name +
          ' ' +
          translate('school.textConfirmRemoveRole2') +
          ' ' +
          this.dataFromParent.fullNameUser +
          ' ' +
          translate('school.textConfirmRemoveRole3'),
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.isLoading = true;
          this.keyword = '';
          this.listRoleOriginal = this.listRoleOriginal.filter(item => item.roleId != id);
          this.listRole = this.listRoleOriginal;
          this.isLoading = false;
        }
      },
      (reason) => {}
    );
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  listenFireBase(action: string, module: string, isContinue: boolean = false) {
    const timeId = setTimeout(() => {
      this.isLoading = false;
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>) => {
      this.listenFirebaseService.checkFireBase(action, module, subscriber);
    });
    listenFb.subscribe((ref) => {
      if (ref.status === true) {
        clearTimeout(timeId);
        this.isLoading = false;
        if (!isContinue) {
          this.activeModal.close(true);
        }
      } else {
        this.isLoading = false;
      }
    });
  }
}
