import { GeneralService } from 'src/app/_services/general.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import {
  DATA_PERMISSION,
  LAYOUTS_TENANT,
  PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT,
  STATUS_USERS,
} from 'src/app/_shared/utils/constant';
import { SchoolService } from 'src/app/_services/layout-tenant/school/school.service';
import { UserService } from 'src/app/_services/layout-tenant/user/user.service';
import { ModalUpdateUserSchoolTenantComponent } from '../../modals/modal-update-user-school-tenant/modal-update-user-school-tenant.component';
import { AssignRoleUserComponent } from '../../modals/assign-role-user/assign-role-user.component';
import { forkJoin } from 'rxjs';
import { ModalListRoleUserComponent } from '../../modals/modal-list-role-user/modal-list-role-user.component';
import { ModalDeleteComponent } from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import { translate } from '@ngneat/transloco';
import { ModalChangePasswordComponent } from 'src/app/_shared/modals/modal-change-password/modal-change-password.component';
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

  constructor(
    private modalService: NgbModal,
    private schoolService: SchoolService,
    private showMessage: ShowMessageService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private generalService: GeneralService
  ) {}

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
    });
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
          if (res.status == 1) {
            this.arrList = res.data.data;
            this.collectionSize = res.data?.totalItems;
          } else {
            this.showMessage.error(res.msg);
          }
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
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
        if (res.status == 1) {
          let dataFromParent = {
            userId: id,
            fullNameUser: name,
            schoolId: this.schoolId,
            arrList: res.data,
            hasRemove: hasRemove
          };
          if(hasRemove) {
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
            'static'
          );
        } else {
          this.showMessage.error(res.msg);
        }
        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
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
      'lg',
      'static'
    );
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.pageIndex = 1;
          this.getList(
            this.pageIndex,
            this.pageSize,
            this.schoolId,
            this.isActive,
            this.keyword
          );
        }
      },
      (reason) => {
        return;
      }
    );
  }

  assignRole1(id: string) {
    this.isLoading = true;
    const APIAllRoleToAssign = this.userService.getRolesToAssignList(id);
    const APIListRoleUser = this.userService.getRoleList(id);
    forkJoin([APIAllRoleToAssign, APIListRoleUser]).subscribe(
      (results: any) => {
        this.isLoading = false;
        let dataFromParent = {
          userId: id,
          schoolId: this.schoolId,
          service: this.userService,
          arrListToAssign: results[0].data,
          arrList: results[1].data,
          apiSubmit: (dataInput: any) =>
            this.userService.assignRoles(dataInput),
          keyFirebaseAction: 'assign-role-to-user',
          keyFirebaseModule: 'user',
        };
        const modalRef = this.openModal(
          AssignRoleUserComponent,
          'school.updateUser',
          'btnAction.cancel',
          'btnAction.save',
          dataFromParent,
          'xl'
        );
        modalRef.result.then(
          (result: boolean) => {
            if (result) {
              this.pageIndex = 1;
              this.getList(
                this.pageIndex,
                this.pageSize,
                this.schoolId,
                this.isActive,
                this.keyword
              );
            }
          },
          (reason) => {}
        );
      }
    );
    // this.userService
    //   .getRoleList(id)
    //   .subscribe(
    //     (res: any) => {
    //       if (res.status == 1) {
    //         arrList = res.data;
    //         let dataFromParent = {
    //           service: this.userService,
    //           arrList: arrList,
    //           apiSubmit: (dataInput: any) => this.userService.getRolesToAssignList(dataInput),
    //           keyFirebaseAction: 'assign-role-to-user',
    //           keyFirebaseModule: 'user'
    //         };
    //         const modalRef = this.openModal(AssignRoleUserComponent, 'school.updateUser', 'btnAction.cancel', 'btnAction.save', dataFromParent, 'xl')
    //         modalRef.result.then(
    //           (result: boolean) => {
    //             if (result) {
    //               this.pageIndex = 1;
    //               this.getList(this.pageIndex, this.pageSize, this.schoolId, this.isActive, this.keyword);
    //             }
    //           },
    //           (reason) => {}
    //         );
    //       } else {
    //         this.showMessage.error(res.msg);
    //       }
    //       this.isLoading = false;
    //     },
    //     (err: any) => {
    //       this.isLoading = false;
    //     }
    //   );
  }

  assignRole(id: string) {
    this.isLoading = true;
    this.userService.getListSchoolRoleToAssign(id).subscribe(
      (res: any) => {
        if (res.status == 1) {
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
            'school.updateUser',
            'btnAction.cancel',
            'btnAction.save',
            dataFromParent,
            'lg',
            'static'
          );
          modalRef.result.then(
            (result: boolean) => {
              if (result) {
                this.pageIndex = 1;
                this.getList(
                  this.pageIndex,
                  this.pageSize,
                  this.schoolId,
                  this.isActive,
                  this.keyword
                );
              }
            },
            (reason) => {}
          );
        }
      },
      (err) => {
        this.isLoading = false;
        this.showMessage.error(err.msg);
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
      'modal-md-plus'
    );
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.pageIndex = 1;
          this.getList(
            this.pageIndex,
            this.pageSize,
            this.schoolId,
            this.isActive,
            this.keyword
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
        titleModal = 'school.unLockUser';
        btnAccept = 'btnAction.unlLock';
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
          this.pageIndex = 1;
          this.getList(
            this.pageIndex,
            this.pageSize,
            this.schoolId,
            this.isActive,
            this.keyword
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

  search(event: any, value: string) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      this.pageIndex = 1;
      this.keyword = value.trim();
      this.getList(
        this.pageIndex,
        this.pageSize,
        this.schoolId,
        this.isActive,
        this.keyword
      );
    }
  }

  filter() {
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
}
