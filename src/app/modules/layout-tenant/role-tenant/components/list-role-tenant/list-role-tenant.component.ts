import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { Role } from 'src/app/_models/layout-tenant/role/role.model';
import { GeneralService } from 'src/app/_services/general.service';
import { RoleService } from 'src/app/_services/layout-tenant/role/role.service';
import { ModalDeleteComponent } from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import {
  DATA_PERMISSION,
  LAYOUTS_TENANT,
  PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT
} from 'src/app/_shared/utils/constant';
import { ModalFormRoleTenantComponent } from '../../modals/modal-form-role-tenant/modal-form-role-tenant.component';
import { ModalListUsersTenantComponent } from '../../modals/modal-list-users-tenant/modal-list-users-tenant.component';
import { ModalViewPermissionTenantComponent } from '../../modals/modal-view-permission-tenant/modal-view-permission-tenant.component';
@Component({
  selector: 'app-list-role-tenant',
  templateUrl: './list-role-tenant.component.html',
  styleUrls: ['./list-role-tenant.component.scss', '../../helper-role.scss'],
})
export class ListRoleTenantComponent implements OnInit {
  layoutCode = '';
  keyword = '';
  arrRole: Array<Role> = [];
  pageIndex = PAGE_INDEX_DEFAULT; // Trang hiện tại
  pageSize = PAGE_SIZE_DEFAULT; // Số bản ghi trong 1 trang
  collectionSize = 0; // Tổng số lượng bản ghi
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT; // Thay đổi pageSize
  arrLayouts = LAYOUTS_TENANT;
  isLoading = false;
  permission = DATA_PERMISSION;
  oldPageIndex = this.pageIndex;

  constructor(
    private modalService: NgbModal,
    private roleService: RoleService,
    private generalService: GeneralService
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.isLoading = true;
    this.roleService
      .getList(this.keyword, this.pageIndex, this.pageSize, this.layoutCode)
      .subscribe(
        (res: any) => {
          this.arrRole = res.data.data;
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

  create() {
    const modalRef = this.modalService.open(ModalFormRoleTenantComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'lg', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'role.titleDialogAddRole',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        service: this.roleService,
        apiSubmit: (dataInput: any) => this.roleService.createRole(dataInput),
        keyFirebaseAction: 'create',
        keyFirebaseModule: 'role',
        nameForm: 'create',
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

  updateRole(role: any) {
    const modalRef = this.modalService.open(ModalFormRoleTenantComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'lg', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'role.titleDialogUpdateRole',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        role: role,
        service: this.roleService,
        apiSubmit: (dataInput: any) => this.roleService.updateRole(dataInput),
        keyFirebaseAction: 'update',
        keyFirebaseModule: 'role',
        nameForm: 'update',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.getList();
        }
      },
      (reason) => {}
    );
  }

  delete(roleId: string, roleName: string) {
    const modalRef = this.modalService.open(ModalDeleteComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      modalDialogClass: 'modal-md-plus',
    });

    let data = {
      titleModal: 'role.titleDialogDeleteRole',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.delete',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        role: roleId,
        dataInput: { id: roleId },
        service: this.roleService,
        apiSubmit: (dataInput: any) => this.roleService.deleteRole(dataInput),
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'role',
        textConfirmHeader:
          translate('role.textConfirmDeleteRole1') +
          ' ' +
          roleName +
          ' ' +
          translate('role.textConfirmDeleteRole2'),
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

  viewModalListUser(roleId: string) {
    this.isLoading = true;
    let modalRef = null;
    let data = null;
    this.roleService
      .getListUserRole(roleId, '', PAGE_SIZE_DEFAULT, PAGE_INDEX_DEFAULT)
      .subscribe(
        (res: any) => {
          this.isLoading = false;
          modalRef = this.modalService.open(ModalListUsersTenantComponent, {
            scrollable: true,
            windowClass: 'myCustomModalClass',
            keyboard: false,
            centered: false, // vị trí hiển thị modal ở giữa màn hình
            modalDialogClass: 'modal-xxl',
          });
          data = {
            titleModal: 'role.listUser',
            btnAccept: 'btnAction.close',
            isHiddenBtnClose: false, // hidden/show btn close modal,
            dataFromParent: {
              roleId: roleId,
              listUsers: res.data.data,
              collectionSize: res.data?.totalItems,
            },
          };
          modalRef.componentInstance.dataModal = data;
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
          this.generalService.showToastMessageError400(err);
        }
      );
  }

  viewModalListPermission(roleId: string) {
    this.isLoading = true;
    this.roleService.getListPermissionRole(roleId, '').subscribe(
      (res: any) => {
        const modalRef = this.modalService.open(ModalViewPermissionTenantComponent, {
          scrollable: true,
          windowClass: 'myCustomModalClass',
          keyboard: false,
          centered: false, // vị trí hiển thị modal ở giữa màn hình
          size: 'xl',
        });

        let data = {
          titleModal: 'role.listPermission',
          btnAccept: 'btnAction.close',
          isHiddenBtnClose: false, // hidden/show btn close modal
          dataFromParent: {
            roleId: roleId,
            listPermissions: res.data,
          },
        };

        modalRef.componentInstance.dataModal = data;
        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      }
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
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.getList();
  }

  mapNameLayout(layoutCode: string) {
    return LAYOUTS_TENANT.find((layout) => layout.code == layoutCode)?.name || '--';
  }

  paginationChange(event: any) {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getList();
  }
}
