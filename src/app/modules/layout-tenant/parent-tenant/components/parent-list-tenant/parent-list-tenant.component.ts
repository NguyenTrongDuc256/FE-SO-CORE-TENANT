import { Component, OnInit } from '@angular/core';
import {
  AVATAR_DEFAULT,
  DATA_PERMISSION, MESSAGE_ERROR_CALL_API, PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT, TIME_OUT_LISTEN_FIREBASE
} from "../../../../../_shared/utils/constant";
import {SchoolList} from "src/app/_models/layout-tenant/school/school.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ShowMessageService} from "src/app/_services/show-message.service";

import {translate} from "@ngneat/transloco";
import {ModalDeleteComponent} from "../../../../../_shared/modals/modal-delete/modal-delete.component";
import {GradeList} from "src/app/_models/layout-tenant/grade/grade.model";
import {ParentService} from "src/app/_services/layout-tenant/parent/parent.service";
import {ParentList} from "src/app/_models/layout-tenant/user/parent.model";
import {
  ModalChangePasswordComponent
} from "../../../../../_shared/modals/modal-change-password/modal-change-password.component";
import {GeneralService} from "src/app/_services/general.service";
import {
  ModalImportEmployeeTenantComponent
} from "../../../employee-tenant/modals/modal-import-employee-tenant/modal-import-employee-tenant.component";
import {
  ModalImportParentTenantComponent
} from "../../modals/modal-import-parent-tenant/modal-import-parent-tenant.component";

@Component({
  selector: 'app-parent-list-tenant',
  templateUrl: './parent-list-tenant.component.html',
  styleUrls: ['./parent-list-tenant.component.scss']
})
export class ParentListTenantComponent implements OnInit {
  avatar: string = AVATAR_DEFAULT;
  permission = DATA_PERMISSION;
  collectionSize: number = 0;
  sizeOption: number[] = PAGE_SIZE_OPTIONS_DEFAULT;
  pageIndex: number = PAGE_INDEX_DEFAULT;
  pageSize: number = PAGE_SIZE_DEFAULT;
  keyWord: string = '';
  isLoading: boolean = false;
  valueDefaultSchool: string = '';
  valueDefaultGrade: string = '';
  valueDefaultClass: string = '';
  dataApi: any;
  dataSource?: Partial<ParentList>[];
  schoolList: SchoolList[];
  gradeList: GradeList[] = [];
  classList: any[] = [];

  constructor(
    private modalService: NgbModal,
    private parentService: ParentService,
    private generalService: GeneralService,
    private showMessageService: ShowMessageService,
  ) {
  }

  ngOnInit(): void {
    // this.generalService.changeValueSearch(1)
    this.getDataGeneralList();
    this.getDataParent();
  }

  getDataParent() {
    this.isLoading = true;

    this.parentService.getParentList(this.pageIndex, this.pageSize, this.valueDefaultSchool, this.valueDefaultGrade, this.valueDefaultClass, this.keyWord).subscribe((res: any) => {
        this.collectionSize = res.data.totalItems;
        this.dataSource = res.data.data;
        this.dataSource.forEach(item => {
          item.genderName = this.getGenderName(item.gender)
        })
        this.isLoading = false;

    }, (_err: any) => {
      this.generalService.showToastMessageError400(_err)
      this.isLoading = false;
    });
  }

  getDataGeneralList() {
    this.isLoading = true;
    this.parentService.getDataGeneralList().subscribe((res: any): void => {
        this.dataApi = res.data;
        this.schoolList = this.dataApi.schools;
        this.gradeList = this.dataApi.grades;
        this.classList = this.dataApi.homeroomClasses;
        this.isLoading = false;

    }, (_err: any) => {
      this.generalService.showToastMessageError400(_err)
      this.isLoading = false;
    });
  }

  onChangeSelect(field?: string) {
    if (field === "school") {
      if (this.valueDefaultSchool){
        this.classList = [];
        const school = this.dataApi.schools.find(item => item.id === this.valueDefaultSchool)
        this.gradeList = this.dataApi.grades.filter((item: any) => item.educationStages === school.educationStages);
        // this.listPhong = this.dataDialog.divisions.filter((item: any) => item.parent_id === Number(this.formSubmit.get('department_id').value));
        this.gradeList.forEach(grade => {
          const classes = this.dataApi.homeroomClasses.filter((item: any) => item.gradeId === grade.id);
          classes.forEach(school => this.classList.push(school));
        });
      }
      else{
        this.gradeList = this.dataApi.grades;
      }
      this.valueDefaultGrade = '';
      this.valueDefaultClass = '';
    }
    else if(field === "grade"){
      if (this.valueDefaultGrade){
        this.classList = this.dataApi.homeroomClasses.filter((item: any) => item.gradeId === this.valueDefaultGrade);
      }
      else{
        this.classList = this.dataApi.homeroomClasses;
      }
      this.valueDefaultClass = '';
    }
    this.getDataParent();
  }

  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getDataParent();
  }

  onClickSearch(valueSearch) {
    this.keyWord = valueSearch;
    this.getDataParent();
  }

  onEventKeyupEnter(valueSearch) {
    this.keyWord = valueSearch;
    this.getDataParent();
  }

  getGenderName(value: number): string {
    if (value === 1)
      return 'genderName.male';
    else if (value === 2)
      return 'genderName.female';
    else
      return 'genderName.other';
  }

  openModalChangePassword(item) {
    let dataFromParent = {
      userId: item.id,
      account: item.fullName,
      code: item.code,
      username: item. username,
      apiSubmit: (dataInput: any) =>
        this.generalService.changePasswordUserLayoutTenant(dataInput),
      keyFirebaseAction: 'change-password',
      keyFirebaseModule: 'user',
    };

    const modalRef = this.modalService.open(ModalChangePasswordComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: true, // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'lg', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'changePassword',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: dataFromParent,
    };

    modalRef.componentInstance.dataModal = data;

    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.pageIndex = 1;
          this.getDataParent()
        }
      },
    );
  }

  openModalConfirmDelete(item: any) {
    const modalRef = this.modalService.open(ModalDeleteComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        size: 'modal-md-plus',
      });

    let data = {
      titleModal: translate('parent.deleteUser'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        dataInput: item.id,
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'parent',
        apiSubmit: (dataInput: any) => this.parentService.deleteParent(dataInput)
      }
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result === true) {
        this.getDataParent();
      }
    }, (reason) => {
    });
  }

  openModalBlockAccount(item) {
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
        dataInput: { userId: item.id, isAccessApp: isAccessAppRequest },
        service: this.parentService,
        apiSubmit: (dataInput: any) => {
          return this.parentService.updateAccessApp(dataInput)
        },
        keyFirebaseAction: 'update-access-app-status',
        keyFirebaseModule: 'user',
      },
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result == true) {
          this.getDataParent()
        };
      },
    );
  }

  openModalSendNotification(item) {
    this.showMessageService.warning('Màn hình hiện chưa được thực hiện!');
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
    //   titleModal: 'Khóa truy cập tài khoản',
    //   btnCancel: translate('btnAction.cancel'),
    //   btnAccept: translate('btnAction.save'),
    //   isHiddenBtnClose: false,
    //   dataFromParent: {
    //     dataInput: dataInput,
    //     userId: item.id,
    //     content: 'Tài khoản người dùng sẽ bị khóa truy cập tài khoản'
    //   }
    // }
    //
    // modalRef.componentInstance.dataModal = data;
    // modalRef.result.then((result) => {
    //   console.log(result);
    //   if (result === true) {
    //     this.getDataParent();
    //   }
    // }, (reason) => {
    //   console.log(reason);
    // });
  }

  openModalImport(): void {
    const modalRef = this.modalService.open(ModalImportParentTenantComponent,
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
