import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RoleService} from "src/app/_services/layout-tenant/role/role.service";
import {ShowMessageService} from "src/app/_services/show-message.service";
import {FormBuilder} from "@angular/forms";
import {ListenFirebaseService} from "src/app/_services/listen-firebase.service";
import {UserService} from "src/app/_services/layout-tenant/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RoleList, RoleToAssignList, UserInfo} from "src/app/_models/layout-tenant/user/user.model";
import {translate} from "@ngneat/transloco";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
  ModalAssignToUserTenantComponent
} from "../../modals/modal-assign-to-user-tenant/modal-assign-to-user-tenant.component";
import {DATA_PERMISSION, LAYOUTS_TENANT} from "../../../../../_shared/utils/constant";
import {ModalDeleteComponent} from "../../../../../_shared/modals/modal-delete/modal-delete.component";

@Component({
  selector: 'app-user-detail-tenant',
  templateUrl: './user-detail-tenant.component.html',
  styleUrls: ['./user-detail-tenant.component.scss']
})
export class UserDetailTenantComponent implements OnInit {
  isLoading: boolean = false;
  @ViewChild('fileInputAvatar') fileInputAvatar: ElementRef;
  permission: any = DATA_PERMISSION;
  keyWord: string = '';
  userId: string = '';
  userInfo: UserInfo;
  roleList: RoleList[]
  roleToAssignList: RoleToAssignList[] = [];
  layouts: any = LAYOUTS_TENANT;

  constructor(
    private roleService: RoleService,
    private showMessageService: ShowMessageService,
    private fb: FormBuilder,
    private listenFirebaseService: ListenFirebaseService,
    private userService: UserService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((res: any): void => {
      if (res.id) {
        this.userId = res.id;
        this.getUserDetail(res.id);
        this.getRoleList(res.id);
        this.getRolesToAssignList(res.id);
      }
    });
  }

  getUserDetail(id: string): void {
    this.isLoading = true;
    this.userService.show(id).subscribe((res: any): void => {
        if (res.status == 1 && res.status != undefined) {
          this.userInfo = res.data;
        } else {
          this.showMessageService.error(res.msg);
        }
        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
      }
    );
  }

  getRoleList(id: string): void {
    this.isLoading = true;
    this.userService.getRoleList(id).subscribe((res: any): void => {
      if (res.status != undefined && res.status == 1) {
        this.roleList = res.data;
      } else {
        this.showMessageService.error(res.msg);
      }
      this.isLoading = false;
    }, (err: any) => {
      this.isLoading = false;
    });
  }

  onClickSearch(valueSearch): void {
    this.keyWord = valueSearch;
    this.getRoleList(this.userId);
  }

  onEventKeyupEnter(valueSearch): void {
    this.keyWord = valueSearch;
    this.getRoleList(this.userId);
  }

  getRolesToAssignList(userId: string): void {
    this.userService.getRolesToAssignList(userId).subscribe((res: any): void => {
        if (res.status == 1) {
          this.roleToAssignList = res.data;
        } else {
          this.showMessageService.error(res.msg);
        }
      },
      (err: any) => {
      }
    );
  }

  onOpenModalAssignRoleToUser(): void {
    const modalRef = this.modalService.open(ModalAssignToUserTenantComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        // backdrop: 'static', // prevent click outside modal to close modal
        centered: false, // vị trí hiển thị modal ở giữa màn hình
        size: 'xl ', // 'sm' | 'md' | 'lg' | 'xl',
        //modalDialogClass: 'modal-xxl', // custom class, nếu muốn mở rộng size modal- thêm class modal-xxl | modal-xxxl | modal-full-screen
      });

    let data = {
      titleModal: translate('user.assignRoleToUser'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: false,
      dataFromParent: {
        userId: this.userId,
        roleToAssignList: this.roleToAssignList
      },
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result === true) {
        this.getRoleList(this.userId);
        this.getRolesToAssignList(this.userId);
      }
    }, (reason) => {
      console.log(reason)
    });
  }

  getLayoutName(code: string): string {
    let layoutName: string = '';
    this.layouts.forEach((el) => {
      if (code == el.code) {
        layoutName = el.name;
      }
    });
    return layoutName;
  }

  removeRole(userRoleId: string, roleId): void {
    const modalRef = this.modalService.open(ModalDeleteComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      centered: false,
      modalDialogClass: 'modal-md-plus',
    });

    let data = {
      titleModal: 'user.deleteRole',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: true,
      dataFromParent: {
        dataInput: {
          userRoleId: userRoleId,
          roleId: roleId,
          userId: this.userId
        },
        service: this.userService,
        apiSubmit: (dataInput: any) => this.userService.removeRole(dataInput),
        keyFirebaseAction: 'remove-role-from-user',
        keyFirebaseModule: 'user',
      },
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result == true) {
          this.getRoleList(this.userId);
          this.getRolesToAssignList(this.userId);
        }
      },
      (reason) => {
      }
    );
  }

}
