import {ShowMessageService} from 'src/app/_services/show-message.service';

import {
  AVATAR_DEFAULT,
  DATA_PERMISSION,
  MESSAGE_ERROR_CALL_API, PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT,
  TIME_OUT_LISTEN_FIREBASE
} from 'src/app/_shared/utils/constant';

import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalDeleteComponent} from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import {SchoolList} from "src/app/_models/layout-tenant/school/school.model";
import {EmployeeList} from "src/app/_models/layout-tenant/employee/employee.model";
import {EmployeeService} from "src/app/_services/layout-tenant/employee/employee.service";
import {
  ModalChangePasswordComponent
} from "../../../../../_shared/modals/modal-change-password/modal-change-password.component";
import {GeneralService} from "../../../../../_services/general.service";
import {
  ModalSwitchEmployeeEditComponent
} from "../../modals/modal-switch-employee-edit/modal-switch-employee-edit.component";
import {translate} from "@ngneat/transloco";

@Component({
  selector: 'app-employee-list-tenant',
  templateUrl: './employee-list-tenant.component.html',
  styleUrls: ['./employee-list-tenant.component.scss']
})
export class EmployeeListTenantComponent implements OnInit {
  avatar: string = AVATAR_DEFAULT;
  permission: any = DATA_PERMISSION;
  collectionSize: number = 0;
  sizeOption: number[] = PAGE_SIZE_OPTIONS_DEFAULT;
  pageIndex: number = 1;
  pageSize: number = PAGE_SIZE_DEFAULT;
  keyWord: string = '';
  isLoading: boolean = false;

  roleId: string = '';
  roleList: any[] = [];
  valueDefaultSchool: string = '';
  dataSource: EmployeeList[];
  schoolList: SchoolList[];

  constructor(
    private modalService: NgbModal,
    private showMessageService: ShowMessageService,
    private employeeService: EmployeeService,
    private generalService: GeneralService,
  ) {
  }

  ngOnInit(): void {
    this.getSchoolList();
    this.getMoetCategories();
    this.getEmployeeList();
  }

  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getEmployeeList();
  }

  onChangeSchool() {
    this.getEmployeeList();
  }

  onChangeRole() {
    this.getEmployeeList();
  }

  onClickSearch(valueSearch) {
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.keyWord = valueSearch;
    this.getEmployeeList();
  }

  onEventKeyupEnter(valueSearch) {
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.keyWord = valueSearch;
    this.getEmployeeList();
  }

  getMoetCategories(): void {
    this.isLoading = true;
    this.employeeService.getInitializationData().subscribe((res: any): void => {
        if (res.status != undefined && res.status == 1) {
          this.roleList = res.data.roles || [];
        } else {
          this.showMessageService.error(res.msg);
        }
        this.isLoading = false;
      }, (err: any) => {
        this.isLoading = false;
      }
    );
  }

  getEmployeeList() {
    this.isLoading = true;
    setTimeout(() => {
      if (this.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);

    this.employeeService.getEmployeeList(this.pageIndex, this.pageSize, this.valueDefaultSchool, this.roleId, this.keyWord)
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
      titleModal: 'employee.btnAction.changedPassword',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        userId: item.userId,
        account: item.fullName,
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
        this.getEmployeeList();
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
      titleModal: 'employee.titleDelete',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        dataInput: {id: item.userId},
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'employee',
        apiSubmit: (dataInput: any) => this.employeeService.delete(dataInput)
      }
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result === true) {
        this.getEmployeeList();
      }
    }, (reason) => {

    });
  }

  openModalUpdateStatus(item) {
    // let title = '';
    // let content = '';
    // let dataInput = 0;
    // if (item.isActive) {
    //   title = translate('user.locked');
    //   content = translate('user.userLocked');
    // } else {
    //   title = translate('user.active');
    //   content = translate('user.userActive');
    //   dataInput = 1;
    // }
    //
    // const modalRef = this.modalService.open(ModalUpdateStatusComponent,
    //   {
    //     scrollable: true,
    //     windowClass: 'myCustomModalClass',
    //     keyboard: false,
    //     centered: false,
    //     size: 'lg'
    //   });
    //
    // let data = {
    //   titleModal: title,
    //   btnCancel: translate('btnAction.cancel'),
    //   btnAccept: translate('btnAction.save'),
    //   isHiddenBtnClose: false,
    //   dataFromParent: {
    //     dataInput: dataInput,
    //     userId: item.id,
    //     content: content
    //   }
    // }
    //
    // modalRef.componentInstance.dataModal = data;
    // modalRef.result.then((result) => {
    //   console.log(result);
    //   if (result === true) {
    //     this.getDataUser();
    //   }
    // }, (reason) => {
    //   console.log(reason);
    // });
  }

  openModalRoleList(item) {
    // const modalRef = this.modalService.open(ModalRoleListTenantComponent,
    //   {
    //     scrollable: true,
    //     windowClass: 'myCustomModalClass',
    //     keyboard: false,
    //     centered: false,
    //     size: 'xl'
    //   });
    //
    // let data = {
    //   titleModal: translate('user.roleList'),
    //   btnCancel: translate('user.close'),
    //   btnAccept: translate('btnAction.save'),
    //   isHiddenBtnClose: false,
    //   dataFromParent: {
    //     userId: item.id,
    //   }
    // }
    //
    // modalRef.componentInstance.dataModal = data;
    // modalRef.result.then((result) => {
    //   console.log(result);
    //   if (result === true) {
    //     this.getDataUser();
    //   }
    // }, (reason) => {
    //   console.log(reason);
    // });
  }

  getSchoolList() {
    this.isLoading = true;

    setTimeout(() => {
      if (this.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);

    this.employeeService.getSchoolList().subscribe((res: any): void => {
      if (res.status != undefined && res.status === 1) {
        this.schoolList = res.data;
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

  openModalSwitchEmployeeEdit(item) {
    const modalRef = this.modalService.open(ModalSwitchEmployeeEditComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        backdrop: 'static',
        size: 'lg',
      });

    let data: any = {
      titleModal: translate('employee.modalEmployeeEdit'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        dataEmployee: item,
      },
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      console.log(result)
    }, (reason) => {
    });
  }
}
