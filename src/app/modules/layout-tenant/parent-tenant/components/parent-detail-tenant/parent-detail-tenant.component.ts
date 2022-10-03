import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  AVATAR_DEFAULT, DATA_PERMISSION,
  LAYOUTS_TENANT,
  MESSAGE_ERROR_CALL_API, STUDENT_STATUS,
  TIME_OUT_LISTEN_FIREBASE
} from "../../../../../_shared/utils/constant";
import {RoleService} from "src/app/_services/layout-tenant/role/role.service";
import {ShowMessageService} from "src/app/_services/show-message.service";
import {FormBuilder} from "@angular/forms";
import {ListenFirebaseService} from "src/app/_services/listen-firebase.service";
import {UserService} from "src/app/_services/layout-tenant/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
  ModalAssignToUserTenantComponent
} from "../../../user-tenant/modals/modal-assign-to-user-tenant/modal-assign-to-user-tenant.component";
import {translate, TRANSLOCO_SCOPE} from "@ngneat/transloco";
import {ModalDeleteComponent} from "../../../../../_shared/modals/modal-delete/modal-delete.component";
import {ParentService} from "src/app/_services/layout-tenant/parent/parent.service";
import {ParentInfo} from "src/app/_models/layout-tenant/user/parent.model";
import {StudentService} from "src/app/_services/layout-tenant/student/student.service";
import {
  UpdateUsernameCodeTenantComponent
} from "../../../student-tenant/modals/update-username-code-tenant/update-username-code-tenant.component";
import {
  ModalChangePasswordComponent
} from "../../../../../_shared/modals/modal-change-password/modal-change-password.component";
import {GeneralService} from "src/app/_services/general.service";

@Component({
  selector: 'app-parent-detail-tenant',
  templateUrl: './parent-detail-tenant.component.html',
  styleUrls: ['./parent-detail-tenant.component.scss'],
})
export class ParentDetailTenantComponent implements OnInit {
  isLoading: boolean = false;
  avatarUser: string = AVATAR_DEFAULT;
  permission = DATA_PERMISSION;
  userId: string = '';
  parentInfo: ParentInfo;
  dataSource: any;
  constructor(
    private roleService: RoleService,
    private showMessageService: ShowMessageService,
    private fb: FormBuilder,
    private listenFirebaseService: ListenFirebaseService,
    private userService: UserService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private modalService: NgbModal,
    private parentService: ParentService,
    private studentService: StudentService,
    private generalService: GeneralService
  ) {
  }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((res: any): void => {
      if (res.id) {
        this.userId = res.id;
        this.getParentDetail(res.id);
      }
      else{
        this.router.navigate(['/tenant/parent']);
      }
    });
  }


  getGenderName(value: number): string {
    if (value === 1)
      return translate('genderName.male');
    else if (value === 2)
      return translate('genderName.female');
    else
      return translate('genderName.other');
  }

  getParentDetail(id: string): void {
    this.isLoading = true;
    this.parentService.show(id).subscribe((res: any): void => {
        if (res.status == 1 && res.status != undefined) {
          this.parentInfo = res.data;
          this.dataSource = res.data.childrens;
        } else {
          this.showMessageService.error(res.msg);
          this.router.navigate(['/tenant/parent']);
        }
        this.isLoading = false;
      },
      (err: any) => {
        this.router.navigate(['/tenant/parent']);
        this.isLoading = false;
      }
    );
  }

  updateUsernameCode(item) {
    const modalRef = this.modalService.open(UpdateUsernameCodeTenantComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        size: 'lg',
      });

    let data = {
      titleModal: translate('student.updateUsernameCode'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: item,
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result === true) {
        this.getParentDetail(this.userId);
      }
    }, (reason) => {
    });
  }

  getStatusStudent(value: string): string {
    return STUDENT_STATUS[value];
  }

  updateAccessAppStatus(item) {
    let isAccessAppRequest;
    if (item?.isAccessApp == 0) {
      isAccessAppRequest = 1;
    } else {
      isAccessAppRequest = 0
    }
    const modalRef = this.modalService.open(ModalDeleteComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      centered: false,
      modalDialogClass: 'modal-md-plus',
    });
    let data = {
      titleModal: isAccessAppRequest == 1 ? 'parent.btnAction.unlockAppAccess' : 'parent.btnAction.lockedAccount', //'student.deleteUser',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: true,
      dataFromParent: {
        dataInput: { userId: item.studentUserId, isAccessApp: isAccessAppRequest },
        service: this.studentService,
        apiSubmit: (dataInput: any) => {
          return this.studentService.updateAccessAppStatus(dataInput)
        },
        keyFirebaseAction: 'update-access-app-status',
        keyFirebaseModule: 'user',
      },
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result == true) this.getParentDetail(this.userId);;
      },
      (reason) => { }
    );
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

    let data = {
      titleModal: 'student.deleteUser',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        dataInput: { id: item.studentId },
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'student',
        apiSubmit: (dataInput: any) => {
          return this.studentService.deleteStudent(dataInput)
        }
      }
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result === true) {
        this.getParentDetail(this.userId);
      }
    }, (reason) => {

    });
  }

  changePassword(item) {
    const modalRef = this.modalService.open(ModalChangePasswordComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        size: 'lg',
      });

    let data = {
      titleModal: 'changePassword',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false,
      dataFromParent: {
        //dataInput: {
        userId: item.studentUserId,
        account: item.fullname,
        code: item.code,
        username: item.username,//chờ be thêm
        //},
        keyFirebaseAction: 'change-password',
        keyFirebaseModule: 'user',
        apiSubmit: (dataInput: any) => {
          return this.generalService.changePasswordUserLayoutTenant(dataInput)
        }
      }
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result === true) {
        this.getParentDetail(this.userId);
      }
    }, (reason) => {

    });
  }

}
