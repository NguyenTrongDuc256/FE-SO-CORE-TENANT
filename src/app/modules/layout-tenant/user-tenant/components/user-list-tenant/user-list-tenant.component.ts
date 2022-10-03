import {translate} from '@ngneat/transloco';
import {ShowMessageService} from 'src/app/_services/show-message.service';

import {
  AVATAR_DEFAULT, DATA_PERMISSION, MESSAGE_ERROR_CALL_API, PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT, TIME_OUT_LISTEN_FIREBASE
} from 'src/app/_shared/utils/constant';

import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RoleList, UserList} from 'src/app/_models/layout-tenant/user/user.model';
import {UserService} from 'src/app/_services/layout-tenant/user/user.service';
import {ModalDeleteComponent} from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import {SchoolList} from "src/app/_models/layout-tenant/school/school.model";
import {ModalUpdateStatusComponent} from "../../modals/modal-update-status/modal-update-status.component";
import {ModalRoleListTenantComponent} from "../../modals/modal-role-list-tenant/modal-role-list-tenant.component";
import {
  ModalChangePasswordComponent
} from "../../../../../_shared/modals/modal-change-password/modal-change-password.component";
import {GeneralService} from "../../../../../_services/general.service";

@Component({
  selector: 'app-user-list-tenant',
  templateUrl: './user-list-tenant.component.html',
  styleUrls: ['./user-list-tenant.component.scss']
})
export class UserListTenantComponent implements OnInit {
  avatar: string = AVATAR_DEFAULT;
  permission: any = DATA_PERMISSION;
  collectionSize: number = 0;
  sizeOption: number[] = PAGE_SIZE_OPTIONS_DEFAULT;
  pageIndex: number = 1;
  pageSize: number = PAGE_SIZE_DEFAULT;
  keyWord: string = '';
  isLoading: boolean = false;

  isActive: string = '';
  valueDefaultSchool: string = '';
  dataSource: UserList[];
  schoolList: SchoolList[];
  roleList: RoleList[];

  constructor(
    private modalService: NgbModal,
    private showMessageService: ShowMessageService,
    private userService: UserService,
    private generalService: GeneralService
  ) {
  }

  ngOnInit(): void {
    this.getSchoolList();
    this.getDataUser();
  }

  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getDataUser();
  }

  onChangeSchool() {
    this.getDataUser();
  }

  onChangeStatus() {
    this.getDataUser();
  }

  onClickSearch(valueSearch) {
    this.keyWord = valueSearch;
    this.pageIndex = 1;
    this.getDataUser();
  }

  onEventKeyupEnter(valueSearch) {
    this.keyWord = valueSearch;
    this.pageIndex = 1;
    this.getDataUser();
  }

  getDataUser() {
    this.isLoading = true;

    setTimeout(() => {
      if (this.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);

    this.userService.getUserList(this.pageIndex, this.pageSize, this.valueDefaultSchool, this.isActive, this.keyWord)
      .subscribe((res: any): void => {
        if (res.status != undefined && res.status === 1) {
          this.collectionSize = res.data.totalItems;
          this.dataSource = res.data.data;
          this.isLoading = false;
        }

        if (res.status != undefined && res.status === 0) {
          this.isLoading = false;
          this.showMessageService.error(res.msg);
        }
      }, (_err: any) => {
        this.isLoading = false;
      });
  }

  openModalChangePassword(item) {
    const modalRef = this.modalService.open(ModalChangePasswordComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        backdrop: 'static',
        size: 'lg',
      });

    let data: any = {
      titleModal: 'user.btnAction.changedPassword',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        userId: item.id,
        account: item.fullname,
        code: item.code,
        username: item.username,
        keyFirebaseAction: 'change-password',
        keyFirebaseModule: 'user',
        apiSubmit: (dataInput: any) => {
          return this.generalService.changePasswordUserLayoutTenant(dataInput)
        }
      },
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result === true) {
        this.getDataUser();
      }
    }, (reason) => {
    });
  }

  openModalConfirmDelete(item: any) {
    const modalRef = this.modalService.open(ModalDeleteComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        size: 'lg',
      });

    let data: any = {
      titleModal: 'user.deleteUser',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        dataInput: {userId: item.id},
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'user',
        apiSubmit: (dataInput: any) => this.userService.deleteUser(dataInput)
      }
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result === true) {
        this.getDataUser();
      }
    }, (reason) => {

    });
  }

  openModalUpdateStatus(item) {
    let title: string = '';
    let content: string = '';
    let dataInput: number = 0;
    if (item.isActive) {
      title = translate('user.locked');
      content = translate('user.userLocked');
    } else {
      title = translate('user.active');
      content = translate('user.userActive');
      dataInput = 1;
    }

    const modalRef = this.modalService.open(ModalUpdateStatusComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        size: 'lg'
      });

    let data: any = {
      titleModal: title,
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: false,
      dataFromParent: {
        dataInput: dataInput,
        userId: item.id,
        content: content
      }
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result === true) {
        this.getDataUser();
      }
    }, (reason) => {
    });
  }

  openModalRoleList(item) {
    this.isLoading = true;
    this.userService.getRoleList(item.id).subscribe((res: any): void => {
      if (res.status == 1) {
        const modalRef = this.modalService.open(ModalRoleListTenantComponent,
          {
            scrollable: true,
            windowClass: 'myCustomModalClass',
            keyboard: false,
            centered: false,
            backdrop: 'static',
            size: 'xl'
          });

        let data: any = {
          titleModal: translate('user.roleList'),
          btnCancel: translate('user.close'),
          btnAccept: translate('btnAction.save'),
          isHiddenBtnClose: false,
          dataFromParent: {
            userId: item.id,
            roleList: res.data
          }
        }

        modalRef.componentInstance.dataModal = data;
        modalRef.result.then((result) => {
          if (result === true) {
            this.getDataUser();
          }
        }, (reason) => {
        });
      } else {
        this.showMessageService.error(res.msg);
      }
      this.isLoading = false;
    }, (err: any) => {
      this.isLoading = false;
    });
  }

  getSchoolList() {
    this.isLoading = true;

    setTimeout(() => {
      if (this.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);

    this.userService.getSchoolList().subscribe((res: any): void => {
      if (res.status === 1 && res.status != undefined) {
        this.schoolList = res.data;
        this.isLoading = false;
      }

      if (res.status === 0 && res.status != undefined) {
        this.isLoading = false;
        this.showMessageService.error(res.msg);
      }
    }, (_err: any) => {
      this.isLoading = false;
    });
  }
}
