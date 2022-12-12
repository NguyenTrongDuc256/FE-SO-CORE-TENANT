import {Component, OnInit} from '@angular/core';
import {
  AVATAR_DEFAULT,
  DATA_PERMISSION,
  STUDENT_STATUS,
} from "../../../../../_shared/utils/constant";
import {ParentInfo} from "../../../../../_models/layout-staff/user/parent.model";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ParentService} from "../../../../../_services/layout-staff/parent/parent.service";
import {StudentStaffService} from "../../../../../_services/layout-staff/student/student-staff.service";
import {GeneralService} from "../../../../../_services/general.service";
import {translate} from "@ngneat/transloco";
import {ModalDeleteComponent} from "../../../../../_shared/modals/modal-delete/modal-delete.component";
import {
  ModalChangePasswordComponent
} from "../../../../../_shared/modals/modal-change-password/modal-change-password.component";
import {
  UpdateUsernameCodeTenantComponent
} from "../../../../layout-tenant/student-tenant/modals/update-username-code-tenant/update-username-code-tenant.component";

@Component({
  selector: 'app-parent-detail-staff',
  templateUrl: './parent-detail-staff.component.html',
  styleUrls: ['./parent-detail-staff.component.scss']
})
export class ParentDetailStaffComponent implements OnInit {
  isLoading: boolean = false;
  avatarUser: string = AVATAR_DEFAULT;
  permission = DATA_PERMISSION;

  userId: string = '';
  parentInfo: ParentInfo;
  dataSource: any;
  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
    private modalService: NgbModal,
    private parentService: ParentService,
    private studentStaffService: StudentStaffService,
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
        this.router.navigate(['/staff/parent']);
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
          this.parentInfo = res.data;
          this.dataSource = res.data.childrens;
        this.isLoading = false;
      },
      (_err: any) => {
        this.generalService.showToastMessageError400(_err)
        this.router.navigate(['/staff/parent']);
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
        service: this.studentStaffService,
        apiSubmit: (dataInput: any) => {
          return this.studentStaffService.updateAccessAppStatus(dataInput)
        },
        keyFirebaseAction: 'update-access-app-status',
        keyFirebaseModule: 'user',
      },
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result == true) this.getParentDetail(this.userId);
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
        size: 'md',
        modalDialogClass: 'modal-md-plus'
      });

    let data = {
      titleModal: 'parent.deleteStudent',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        dataInput: { id: item.studentId },
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'student',
        apiSubmit: (dataInput: any) => {
          return this.studentStaffService.deleteStudent(dataInput)
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
    });
  }

}
