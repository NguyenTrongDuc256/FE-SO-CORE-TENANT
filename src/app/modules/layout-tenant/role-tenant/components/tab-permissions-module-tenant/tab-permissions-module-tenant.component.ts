import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { RoleService } from 'src/app/_services/layout-tenant/role/role.service';
import { DATA_PERMISSION } from 'src/app/_shared/utils/constant';
import { forkJoin } from 'rxjs';
import { ModalAssignPermissionRoleTenantComponent } from '../../modals/modal-assign-permission-role-tenant/modal-assign-permission-role-tenant.component';

@Component({
  selector: 'app-tab-permissions-module-tenant',
  templateUrl: './tab-permissions-module-tenant.component.html',
  styleUrls: [
    './tab-permissions-module-tenant.component.scss',
    '../../helper-role.scss',
  ],
})
export class TabPermissionsModuleTenantComponent implements OnInit {
  isLoading = false;
  @Input() roleId = '';
  keyword = '';
  listPermissionOriginal = [];
  listPermission = [];
  permission = DATA_PERMISSION;

  constructor(
    private roleService: RoleService,
    private showMessage: ShowMessageService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getListPermissionRole();
  }

  getListPermissionRole() {
    this.isLoading = true;
    this.roleService.getListPermissionRole(this.roleId, this.keyword).subscribe(
      (res: any) => {
        if (res.status == 1) {
          this.listPermissionOriginal = res.data;
          this.listPermission = res.data;
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

  assignPermission() {
    this.isLoading = true;
    const APIAllPermissions = this.roleService.getAllPermission('');
    const APIListPermissionRole = this.roleService.getListPermissionRole(
      this.roleId,
      ''
    );
    forkJoin([APIAllPermissions, APIListPermissionRole]).subscribe(
      (results: any) => {
        this.isLoading = false;
        const modalRef = this.modalService.open(
          ModalAssignPermissionRoleTenantComponent,
          {
            scrollable: true,
            windowClass: 'myCustomModalClass',
            keyboard: false,
            backdrop: 'static', // prevent click outside modal to close modal
            centered: false, // vị trí hiển thị modal ở giữa màn hình
            modalDialogClass: 'modal-xxl',
          }
        );

        let data = {
          titleModal: 'role.addPermission',
          btnCancel: 'btnAction.cancel',
          btnAccept: 'btnAction.save',
          isHiddenBtnClose: false, // hidden/show btn close modal
          dataFromParent: {
            roleId: this.roleId,
            arrAllPermissions: results[0].data,
            listPermissionRole: results[1].data,
            service: this.roleService,
            apiGetList: (id: string, keyword: string) =>
              this.roleService.getListPermissionRole(id, keyword),
            apiSubmit: (dataInput: any) =>
              this.roleService.updatePermissionRole(dataInput),
            keyFirebaseAction: 'update-permission',
            keyFirebaseModule: 'role',
            nameForm: 'create',
          },
        };

        modalRef.componentInstance.dataModal = data;
        modalRef.result.then(
          (result: boolean) => {
            if (result) this.getListPermissionRole();
          },
          (reason) => {}
        );
      },
      (err: any) => {
        this.isLoading = false;
        this.showMessage.error(err.msg);
      }
    );
  }

  search(event, value: string) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      this.keyword = value.trim();
      this.listPermission = [];
      this.isLoading = true;
      this.listPermissionOriginal.forEach((item) => {
        let arr = item.permissions.filter(
          (per) =>
            per.name.toLowerCase().includes(this.keyword.toLowerCase()) ||
            per.code.toLowerCase().includes(this.keyword.toLowerCase())
        );
        if (arr.length > 0)
          this.listPermission.push({
            id: item.id,
            code: item.code,
            name: item.name,
            indexOrder: item.indexOrder,
            permissions: arr,
          });
      });
      this.isLoading = false;
    }
  }
}
