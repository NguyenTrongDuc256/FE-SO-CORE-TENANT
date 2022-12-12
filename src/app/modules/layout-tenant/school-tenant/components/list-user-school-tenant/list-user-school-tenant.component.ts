import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {translate} from '@ngneat/transloco';
import {GeneralService} from 'src/app/_services/general.service';
import {UserService} from 'src/app/_services/layout-tenant/user/user.service';
import {ShowMessageService} from 'src/app/_services/show-message.service';
import {
  ModalChangePasswordComponent
} from 'src/app/_shared/modals/modal-change-password/modal-change-password.component';
import {ModalDeleteComponent} from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import {
  DATA_PERMISSION,
  LAYOUTS_TENANT,
  PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT,
  STATUS_ACTIVE,
  STATUS_USERS
} from 'src/app/_shared/utils/constant';
import {AssignRoleUserComponent} from '../../modals/assign-role-user/assign-role-user.component';
import {ModalListRoleUserComponent} from '../../modals/modal-list-role-user/modal-list-role-user.component';
import {
  ModalUpdateUserSchoolTenantComponent
} from '../../modals/modal-update-user-school-tenant/modal-update-user-school-tenant.component';

@Component({
  selector: 'app-list-user-school-tenant',
  templateUrl: './list-user-school-tenant.component.html',
  styleUrls: ['./list-user-school-tenant.component.scss', '../../helper.scss'],
})
export class ListUserSchoolTenantComponent implements OnInit {
  keyword = '';
  arrList = [];
  pageIndex = PAGE_INDEX_DEFAULT; // Trang hiện tại
  pageSize = PAGE_SIZE_DEFAULT; // Số bản ghi trong 1 trang
  collectionSize = 0; // Tổng số lượng bản ghi
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT; // Thay đổi pageSize
  isLoading = false;
  permission = DATA_PERMISSION;
  schoolId: string;
  isActive: any = '';
  arrStatusUser = STATUS_USERS;
  layoutCode: string = '';
  arrLayouts = LAYOUTS_TENANT;
  oldPageIndex = this.pageIndex;

  constructor(
    private modalService: NgbModal,
    private showMessage: ShowMessageService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private generalService: GeneralService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      this.schoolId = res.id;
      this.getList(
        this.pageIndex,
        this.pageSize,
        this.schoolId,
        this.isActive,
        this.keyword
      );
    })
  }

  getList(
    pageIndex: number,
    pageSize: number,
    schoolId: string,
    isActive?: any,
    keyword?: string,
    layout?: string
  ) {
    this.isLoading = true;
    this.userService
      .getUserList(pageIndex, pageSize, schoolId, isActive, keyword, layout)
      .subscribe(
        (res: any) => {
          this.arrList = res.data.data;
          this.collectionSize = res.data?.totalItems;
          this.oldPageIndex = this.pageIndex;
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
          this.generalService.showToastMessageError400(err);
        }
      );
  }

  export() {
    return;
  }

  import() {
    return;
  }

  viewModalListRole(id: string, name: string, hasRemove: boolean) {
    this.isLoading = true;
    this.userService.getRoleList(id).subscribe(
      (res: any) => {
        let dataFromParent = {
          userId: id,
          fullNameUser: name,
          schoolId: this.schoolId,
          arrList: res.data,
          hasRemove: hasRemove
        };
        if (hasRemove) {
          dataFromParent['apiSubmit'] = (dataInput: any) => this.userService.removeRole(dataInput);
          dataFromParent['keyFirebaseAction'] = 'remove-role-from-user';
          dataFromParent['keyFirebaseModule'] = 'user';
        }
        this.openModal(
          ModalListRoleUserComponent,
          'school.listRole',
          'btnAction.cancel',
          'btnAction.close',
          dataFromParent,
          'xl',
        );
        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      }
    );
  }

  update(id: string, infoUser: any) {
    let dataFromParent = {
      userId: id,
      schoolId: this.schoolId,
      service: this.userService,
      user: infoUser,
      apiSubmit: (dataInput: any) => this.userService.update(dataInput),
      keyFirebaseAction: 'update',
      keyFirebaseModule: 'user',
      nameForm: 'update',
    };
    const modalRef = this.openModal(
      ModalUpdateUserSchoolTenantComponent,
      'school.updateUser',
      'btnAction.cancel',
      'btnAction.save',
      dataFromParent,
      'xl',
      'static'
    );
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.getList(
            this.pageIndex,
            this.pageSize,
            this.schoolId,
            this.isActive,
            this.keyword,
            this.layoutCode
          );
        }
      },
      (reason) => {
        return;
      }
    );
  }

  assignRole(id: string) {
    this.isLoading = true;
    this.userService.getListSchoolRoleToAssign(id).subscribe(
      (res: any) => {
        this.isLoading = false;
        let dataFromParent = {
          userId: id,
          schoolId: this.schoolId,
          service: this.userService,
          arrListToAssign: res.data,
          apiSubmit: (dataInput: any) =>
            this.userService.assignRoles(dataInput),
          keyFirebaseAction: 'assign-role-to-user',
          keyFirebaseModule: 'user',
        };
        const modalRef = this.openModal(
          AssignRoleUserComponent,
          'school.assignRole',
          'btnAction.cancel',
          'btnAction.save',
          dataFromParent,
          'lg',
          'static'
        );
        modalRef.result.then(
          (result: boolean) => {
            if (result) {
              this.getList(
                this.pageIndex,
                this.pageSize,
                this.schoolId,
                this.isActive,
                this.keyword,
                this.layoutCode
              );
            }
          },
          (reason) => {
          }
        );
      },
      (err) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      }
    );
  }

  changePassword(id: string, infoUser: any) {
    let dataFromParent = {
      userId: id,
      schoolId: this.schoolId,
      service: this.userService,
      account: infoUser.fullname,
      code: infoUser.code,
      username: infoUser.username,
      apiSubmit: (dataInput: any) =>
        this.generalService.changePasswordUserLayoutTenant(dataInput),
      keyFirebaseAction: 'change-password',
      keyFirebaseModule: 'user',
    };
    const modalRef = this.openModal(
      ModalChangePasswordComponent,
      'changePassword',
      'btnAction.cancel',
      'btnAction.save',
      dataFromParent,
      'lg'
    );
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.getList(
            this.pageIndex,
            this.pageSize,
            this.schoolId,
            this.isActive,
            this.keyword,
            this.layoutCode
          );
        }
      },
      (reason) => {
        return;
      }
    );
  }

  changeStatusUser(action: string, id: string, name: string) {
    let titleModal = '';
    let btnAccept = '';
    let dataFromParent = {
      id: id,
      service: this.userService,
      dataInput: {
        userId: id,
      },
      keyFirebaseModule: 'user',
    };
    switch (action) {
      case 'lock':
        dataFromParent.dataInput['isActive'] = 0;
        dataFromParent['apiSubmit'] = (dataInput: any) =>
          this.userService.updateStatus(dataInput);
        dataFromParent['keyFirebaseAction'] = 'update-status';
        dataFromParent['textConfirmHeader'] =
          translate('school.textConfirmLockUser1') +
          ' ' +
          name +
          ' ' +
          translate('school.textConfirmLockUser2');
        titleModal = 'school.lockUser';
        btnAccept = 'btnAction.lock';
        break;
      case 'unlock':
        dataFromParent.dataInput['isActive'] = 1;
        dataFromParent['apiSubmit'] = (dataInput: any) =>
          this.userService.updateStatus(dataInput);
        dataFromParent['keyFirebaseAction'] = 'update-status';
        dataFromParent['textConfirmHeader'] =
          translate('school.textConfirmUnlockUser1') +
          ' ' +
          name +
          ' ' +
          translate('school.textConfirmUnlockUser2');
        titleModal = 'school.unlockUser';
        btnAccept = 'btnAction.unlock';
        break;
      case 'delete':
        dataFromParent['apiSubmit'] = (dataInput: any) =>
          this.userService.deleteUser(dataInput);
        dataFromParent['keyFirebaseAction'] = 'delete';
        dataFromParent['textConfirmHeader'] =
          translate('school.textConfirmDeleteUser1') +
          ' ' +
          name +
          ' ' +
          translate('school.textConfirmDeleteUser2');
        titleModal = 'school.deleteUser';
        btnAccept = 'btnAction.delete';
        break;
    }
    const modalRef = this.openModal(
      ModalDeleteComponent,
      titleModal,
      'btnAction.cancel',
      btnAccept,
      dataFromParent,
      'modal-md-plus'
    );
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          if(action == 'delete') {
            this.pageIndex = PAGE_INDEX_DEFAULT;
          }
          this.getList(
            this.pageIndex,
            this.pageSize,
            this.schoolId,
            this.isActive,
            this.keyword,
            this.layoutCode
          );
        }
      },
      (reason) => {
        return;
      }
    );
  }

  openModal(
    compo: any,
    titleModal: string,
    btnCancel: string,
    btnAccept: string,
    dataFromParent: any,
    size: string = 'lg',
    backdrop: boolean | 'static' = true
  ) {
    const modalRef = this.modalService.open(compo, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: backdrop, // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: size, // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: titleModal,
      btnCancel: btnCancel,
      btnAccept: btnAccept,
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: dataFromParent,
    };

    modalRef.componentInstance.dataModal = data;
    return modalRef;
  }

  mapNameStatus(value: number) {
    return STATUS_USERS.find((status) => status.value == value)?.label || '--';
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
    this.getList(
      this.pageIndex,
      this.pageSize,
      this.schoolId,
      this.isActive,
      this.keyword,
      this.layoutCode
    );
  }

  filter() {
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.getList(
      this.pageIndex,
      this.pageSize,
      this.schoolId,
      this.isActive,
      this.keyword,
      this.layoutCode
    );
  }

  paginationChange(event: any) {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getList(
      this.pageIndex,
      this.pageSize,
      this.schoolId,
      this.isActive,
      this.keyword
    );
  }

  resetFilter() {
    this.keyword = '';
    this.isActive = '';
    this.layoutCode = '';
  }
}
