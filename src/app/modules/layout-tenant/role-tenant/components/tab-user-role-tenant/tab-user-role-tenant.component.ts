import { ModalAddUserToRoleTenantComponent } from './../../modals/modal-add-user-to-role-tenant/modal-add-user-to-role-tenant.component';
import { translate } from '@ngneat/transloco';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserRole } from 'src/app/_models/layout-tenant/role/role.model';
import { RoleService } from 'src/app/_services/layout-tenant/role/role.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ModalDeleteComponent } from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import {
  DATA_PERMISSION,
  PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT,
  STATUS_USERS,
} from 'src/app/_shared/utils/constant';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-tab-user-role-tenant',
  templateUrl: './tab-user-role-tenant.component.html',
  styleUrls: ['./tab-user-role-tenant.component.scss', '../../helper-role.scss'],
})
export class TabUserRoleTenantComponent implements OnInit {
  isLoading = false;
  @Input() roleId = '';
  @Input() layout = '';
  @Input() roleCode = '';
  @Input() roleName = '';
  keyword = '';
  pageIndex = PAGE_INDEX_DEFAULT; // Trang hiện tại
  pageSize = PAGE_SIZE_DEFAULT; // Số bản ghi trong 1 trang
  collectionSize = 0; // Tổng số lượng bản ghi
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT; // Thay đổi pageSize
  listUsers: Array<UserRole> = [];
  permission = DATA_PERMISSION;
  oldPageIndex = this.pageIndex;

  constructor(
    private roleService: RoleService,
    private showMessage: ShowMessageService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.isLoading = true;
    this.roleService
      .getListUserRole(this.roleId, this.keyword, this.pageSize, this.pageIndex)
      .subscribe(
        (res: any) => {
          if (res.status == 1) {
            this.listUsers = res.data.data;
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

  create() {
    let optionModal = {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
    };
    let dataInputModal = {
      titleModal: 'role.assignUser',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        roleId: this.roleId,
        nameRole: this.roleName,
        codeRole: this.roleCode,
        layoutCode: this.layout,
        listUsers: [],
        collectionSize: 0,
        listSchools: [],
        listCampus: [],
        service: this.roleService,
        apiGetList: (dataInput: any, pageSize: number, pageIndex: number) =>
          this.roleService.getListUserToAssignRole(
            dataInput,
            pageSize,
            pageIndex
          ),
        apiSubmit: (dataInput: any) =>
          this.roleService.assignUserRole(dataInput),
        keyFirebaseAction: 'assign-user',
        keyFirebaseModule: 'role',
        nameForm: 'create',
      },
    };
    this.isLoading = true;
    const APIGetListUsers = this.roleService.getListUserToAssignRole(
      '',
      PAGE_SIZE_DEFAULT,
      PAGE_INDEX_DEFAULT,
      this.roleId
    );
    const APIGetSchools = this.roleService.getListSchools();
    const APIGetCampus = this.roleService.getListCampus();
    switch (this.layout) {
      case 'teacher':
      case 'staff':
        forkJoin([APIGetSchools, APIGetListUsers]).subscribe(
          (results) => {
            this.isLoading = false;
            dataInputModal.dataFromParent.listSchools = (
              results[0] as any
            ).data;
            dataInputModal.dataFromParent.listUsers = (
              results[1] as any
            ).data.data;
            dataInputModal.dataFromParent.collectionSize = (
              results[1] as any
            ).data?.totalItems;
            this.openModal(
              ModalAddUserToRoleTenantComponent,
              optionModal,
              dataInputModal
            );
          },
          (err) => {
            this.isLoading = false;
            this.showMessage.error(err.msg);
          }
        );
        break;
      case 'campus':
        forkJoin([APIGetCampus, APIGetListUsers]).subscribe(
          (results) => {
            this.isLoading = false;
            dataInputModal.dataFromParent.listCampus = (results[0] as any).data;
            dataInputModal.dataFromParent.listUsers = (
              results[1] as any
            ).data.data;
            dataInputModal.dataFromParent.collectionSize = (
              results[1] as any
            ).data?.totalItems;
            this.openModal(
              ModalAddUserToRoleTenantComponent,
              optionModal,
              dataInputModal
            );
          },
          (err) => {
            this.isLoading = false;
            this.showMessage.error(err.msg);
          }
        );
        break;
      default:
        this.roleService
          .getListUserToAssignRole(
            '',
            PAGE_SIZE_DEFAULT,
            PAGE_INDEX_DEFAULT,
            this.roleId
          )
          .subscribe(
            (res: any) => {
              if (res.status == 1) {
                this.isLoading = false;
                dataInputModal.dataFromParent.listUsers = res.data.data;
                dataInputModal.dataFromParent.collectionSize =
                  res.data.totalItems;
                this.openModal(
                  ModalAddUserToRoleTenantComponent,
                  optionModal,
                  dataInputModal
                );
              }
            },
            (err) => {
              this.isLoading = false;
              this.showMessage.error(err.msg);
            }
          );
    }
  }

  remove(userId: string, userRoleId: string, userName: string) {
    const modalRef = this.modalService.open(ModalDeleteComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      // backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      modalDialogClass: 'modal-md-plus',
    });

    let data = {
      titleModal: 'role.removeUser',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.remove',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        role: userId,
        dataInput: {
          roleId: this.roleId,
          userId: userId,
          userRoleId: userRoleId,
        },
        service: this.roleService,
        apiSubmit: (dataInput: any) =>
          this.roleService.removeUserRole(dataInput),
        keyFirebaseAction: 'remove-user',
        keyFirebaseModule: 'role',
        textConfirmHeader:
          translate('role.textConfirmRemoveUserRole1') +
          ' ' +
          userName +
          ' ' +
          translate('role.textConfirmRemoveUserRole2'),
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.pageIndex = PAGE_INDEX_DEFAULT;
          this.oldPageIndex = this.pageIndex;
          this.getList();
        }
      },
      (reason) => {}
    );
  }

  openModal(modalCompo: any, optionModal: any, dataInputModal: any) {
    const modalRef = this.modalService.open(modalCompo, optionModal);
    let data = dataInputModal;
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.pageIndex = PAGE_INDEX_DEFAULT;
          this.oldPageIndex = this.pageIndex;
          this.getList();
        }
      },
      (reason) => {}
    );
  }

  mapNameStatus(value: number) {
    return STATUS_USERS.find((status) => status.value == value)?.label || '--';
  }

  search(event, value: string) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      this.pageIndex = 1;
      this.oldPageIndex = this.pageIndex;
      this.keyword = value.trim();
      this.getList();
    }
  }

  paginationChange(event: any) {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.listUsers = [];
    this.getList();
  }
}
