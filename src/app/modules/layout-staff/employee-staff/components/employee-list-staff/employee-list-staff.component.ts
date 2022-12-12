import {ShowMessageService} from 'src/app/_services/show-message.service';

import {
  AVATAR_DEFAULT,
  DATA_PERMISSION,
  GENDER,
  MESSAGE_ERROR_CALL_API,
  PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT,
  TIME_OUT_LISTEN_FIREBASE
} from 'src/app/_shared/utils/constant';

import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalDeleteComponent} from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import {
  ModalChangePasswordComponent
} from "../../../../../_shared/modals/modal-change-password/modal-change-password.component";
import {GeneralService} from "../../../../../_services/general.service";
import {EmployeeStaffService} from "../../../../../_services/layout-staff/employee/employee-staff.service";
import {
  EmployeeListLayoutStaff,
  MoetCategoriesStaff
} from "../../../../../_models/layout-staff/employee/employee-staff.model";
import {
  ModalRoleListTenantComponent
} from "../../../../layout-tenant/user-tenant/modals/modal-role-list-tenant/modal-role-list-tenant.component";
import {
  ModalChangeUsernameCodeComponent
} from "../../../../../_shared/modals/modal-change-username-code/modal-change-username-code.component";
import {
  ModalImportEmployeeStaffComponent
} from "../../modals/modal-import-employee-staff/modal-import-employee-staff.component";
import {
  ModalImportEmployeeTenantComponent
} from "../../../../layout-tenant/employee-tenant/modals/modal-import-employee-tenant/modal-import-employee-tenant.component";


@Component({
  selector: 'app-employee-list-staff',
  templateUrl: './employee-list-staff.component.html',
  styleUrls: ['./employee-list-staff.component.scss']
})
export class EmployeeListStaffComponent implements OnInit {
  isAdvFilter: boolean = false;
  isLoading: boolean = false;
  avatar: string = AVATAR_DEFAULT;
  permission: any = DATA_PERMISSION;
  collectionSize: number = 0;
  sizeOption: number[] = PAGE_SIZE_OPTIONS_DEFAULT;
  // begin: filter
  pageIndex: number = PAGE_INDEX_DEFAULT;
  oldPageIndex: number = this.pageIndex;
  pageSize: number = PAGE_SIZE_DEFAULT;
  roleId: string = '';
  keyWord: string = '';
  hinhThucHopDong: string = '';
  gender: number | '' = '';
  viTriViecLam: string = '';
  isLoggedIn: number | '' = '';
  danToc: string = '';
  nzNotFoundContent: string = 'employee.notFoundContent';

  genderList: any = GENDER;
  // end: filter
  roleList: any[] = [];
  moetCategories: MoetCategoriesStaff;
  dataSource: EmployeeListLayoutStaff[];

  constructor(
    private modalService: NgbModal,
    private showMessageService: ShowMessageService,
    private employeeStaffService: EmployeeStaffService,
    private generalService: GeneralService,
  ) {
  }

  ngOnInit(): void {
    this.getInitializationData();
    this.getEmployeeList();
  }

  paginationChange(event: any) {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getEmployeeList();
  }

  onClickAdvFilter() {
    this.isAdvFilter = !this.isAdvFilter;
    if (this.isAdvFilter === false && (this.hinhThucHopDong || this.gender || this.viTriViecLam || this.isLoggedIn || this.danToc)) {
      this.hinhThucHopDong = '';
      this.gender = '';
      this.viTriViecLam = '';
      this.isLoggedIn = '';
      this.danToc = '';
      this.getEmployeeList();
    }
  }

  onChangeRole() {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.getEmployeeList();
  }

  search(valueSearch) {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.keyWord = valueSearch;
    this.getEmployeeList();
  }

  onChangeHinhThucHopDong() {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.getEmployeeList();
  }

  onChangeGender() {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.getEmployeeList();
  }

  onChangeViTriViecLam() {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.getEmployeeList();
  }

  onChangeIsLoggedIn() {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.getEmployeeList();
  }

  onChangeDanToc() {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = PAGE_INDEX_DEFAULT;
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

    this.employeeStaffService.getInitializationData().subscribe(
      (res: any): void => {
        clearTimeout(timeoutCallAPI);
        this.roleList = res.data.roles || [];
        this.moetCategories = res.data.moetCategories || [];
        this.isLoading = false;
      }, (err: any) => {
        clearTimeout(timeoutCallAPI);
        this.generalService.showToastMessageError400(err);
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

    this.employeeStaffService.getEmployeeList(
      this.pageIndex,
      this.pageSize,
      this.roleId,
      this.keyWord,
      this.hinhThucHopDong,
      this.gender,
      this.viTriViecLam,
      this.isLoggedIn,
      this.danToc
    ).subscribe(
      (res: any): void => {
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
          return this.generalService.changePasswordUser(dataInput)
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
        dataInput: {id: item.employeeId},
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'employee',
        apiSubmit: (dataInput: any) => this.employeeStaffService.delete(dataInput)
      }
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result === true) {
        this.getEmployeeList();
      }
    });
  }

  getRoleListByUserId(userId: string) {
    this.isLoading = true;
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);

    this.employeeStaffService.getRoleListByUserId(userId).subscribe((res: any): void => {
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
    }, (reason) => {
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
          return this.generalService.changeUsernameCodeUserLayoutStaff(dataInput)
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
    const modalRef = this.modalService.open(ModalImportEmployeeStaffComponent,
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
    }
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
    });
  }
}
