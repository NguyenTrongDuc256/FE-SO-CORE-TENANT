import {
  AVATAR_DEFAULT,
  DATA_PERMISSION,
  MESSAGE_ERROR_CALL_API,
  PAGE_INDEX_DEFAULT,
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
import {
  ModalRoleListTenantComponent
} from "../../../user-tenant/modals/modal-role-list-tenant/modal-role-list-tenant.component";
import {UserService} from "../../../../../_services/layout-tenant/user/user.service";
import {
  ModalChangeUsernameCodeComponent
} from "../../../../../_shared/modals/modal-change-username-code/modal-change-username-code.component";
import {Router} from "@angular/router";
import {ShowMessageService} from 'src/app/_services/show-message.service';
import {
  ModalImportEmployeeTenantComponent
} from "../../modals/modal-import-employee-tenant/modal-import-employee-tenant.component";

@Component({
  selector: 'app-employee-list-tenant',
  templateUrl: './employee-list-tenant.component.html',
  styleUrls: ['./employee-list-tenant.component.scss']
})
export class EmployeeListTenantComponent implements OnInit {
  avatar: string = AVATAR_DEFAULT;
  permission: any = DATA_PERMISSION;
  collectionSize: number;
  pageIndex: number = PAGE_INDEX_DEFAULT;
  oldPageIndex: number = this.pageIndex;
  pageSize: number = PAGE_SIZE_DEFAULT;
  sizeOption: number[] = PAGE_SIZE_OPTIONS_DEFAULT;
  keyWord: string = '';
  isLoading: boolean = false;

  roleId: string = '';
  roleList: any[] = [];
  valueDefaultSchool: string = '';
  dataSource: EmployeeList[] = [];
  schoolList: SchoolList[] = [];
  nzNotFoundContent: string = 'employee.notFoundContent';

  constructor(
    private modalService: NgbModal,
    private showMessageService: ShowMessageService,
    private employeeService: EmployeeService,
    private generalService: GeneralService,
    private userService: UserService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getSchoolList();
    this.getInitializationData();
    this.getEmployeeList();
  }

  paginationChange(event: any) {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getEmployeeList();
  }

  onChangeSchool() {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.getEmployeeList();
  }

  onChangeRole() {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.getEmployeeList();
  }

  search(valueSearch): void {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.keyWord = valueSearch;
    this.getEmployeeList();
  }

  getInitializationData(): void {
    this.isLoading = true;
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.employeeService.getInitializationData().subscribe(
      (res: any): void => {
        clearTimeout(timeoutCallAPI);
        this.roleList = res.data.roles || [];
        this.isLoading = false;
      }, (_err: any) => {
        clearTimeout(timeoutCallAPI);
        this.generalService.showToastMessageError400(_err);
        this.isLoading = false;
      }
    );
  }

  getEmployeeList(): void {
    this.isLoading = true;
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);

    this.employeeService.getEmployeeList(this.pageIndex, this.pageSize, this.valueDefaultSchool, this.roleId, this.keyWord)
      .subscribe((res: any): void => {
        clearTimeout(timeoutCallAPI);
        this.collectionSize = res.data.totalItems;
        this.dataSource = res.data.data;
        this.isLoading = false;

      }, (_err: any) => {
        clearTimeout(timeoutCallAPI);
        this.generalService.showToastMessageError400(_err);
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
        dataInput: {userId: item.userId},
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
    });
  }

  getSchoolList() {
    this.employeeService.getSchoolList().subscribe((res: any): void => {
      this.schoolList = res.data;
    }, (_err: any) => {
      this.generalService.showToastMessageError400(_err);
    });
  }

  openModalSwitchEmployeeEdit(item) {
    if (item.employees.length == 1) {
      this.router.navigate(['/tenant/employee/create-or-edit', item.employees[0].id]);
    } else {
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
      });
    }
  }

  getRoleListByUserId(userId: string) {
    this.isLoading = true;
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);

    this.userService.getRoleList(userId).subscribe((res: any): void => {
      clearTimeout(timeoutCallAPI);
      this.openModalRoleListByUserId(userId, res.data);
      this.isLoading = false;

    }, (_err: any) => {
      clearTimeout(timeoutCallAPI);
      this.generalService.showToastMessageError400(_err);
      this.isLoading = false;
    });
  }

  openModalRoleListByUserId(userId: string, roleList: any) {
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
      titleModal: 'user.roleList',
      btnCancel: 'user.close',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false,
      dataFromParent: {
        userId: userId,
        roleList: roleList
      }
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
    });
  }

  openModalChangeUsernameCode(item: any): void {
    const modalRef = this.modalService.open(ModalChangeUsernameCodeComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        backdrop: 'static',
        size: 'lg',
      });
    let data: any = {
      titleModal: 'editUsernameCode',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        userId: item.userId,
        fullName: item.fullName,
        code: item.code,
        username: item.username,
        keyFirebaseAction: 'update',
        keyFirebaseModule: 'user',
        apiSubmit: (dataInput: any) => {
          return this.generalService.changeUsernameCodeUserLayoutTenant(dataInput)
        }
      },
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result === true) {
        this.getEmployeeList();
      }
    });
  }

  openModalImport(): void {
    const modalRef = this.modalService.open(ModalImportEmployeeTenantComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: true,
        backdrop: 'static',
        size: 'xl',
      });

    let data: any = {
      title: 'titleImport',
      isHiddenBtnClose: false, // hidden/show btn close modal
      schoolList: this.schoolList
    }
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
    });
  }
}
