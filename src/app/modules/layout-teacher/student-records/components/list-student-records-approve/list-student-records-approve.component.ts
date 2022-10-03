import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { ModalRefuseRecordsComponent } from 'src/app/modules/layout-staff/student-staff/modals/modal-refuse-records/modal-refuse-records.component';
import { CategoryStudentRecordsTeacherService } from 'src/app/_services/layout-teacher/category-student-records-teacher/category-student-records-teacher.service';
import { StudentRecordsTeacherService } from 'src/app/_services/layout-teacher/student-records/student-records.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ModalDeleteComponent } from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import { ARR_STATUS_STUDENT_RECORDS, DATA_PERMISSION, MESSAGE_ERROR_CALL_API, PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT, STATUS_STUDENT_RECORDS, TYPE_CATE_STUDENT_RECORDS } from 'src/app/_shared/utils/constant';
import { ModalFormRecordsTeacherComponent } from '../../modals/modal-form-records/modal-form-records.component';

@Component({
  selector: 'app-list-student-records-approve',
  templateUrl: './list-student-records-approve.component.html',
  styleUrls: ['./list-student-records-approve.component.scss', '../../helper.scss']
})
export class ListStudentRecordsApproveComponent implements OnInit {

  keyword = '';
  arrList: any = [];
  pageIndex = PAGE_INDEX_DEFAULT; // Trang hiện tại
  pageSize = PAGE_SIZE_DEFAULT; // Số bản ghi trong 1 trang
  collectionSize = 0; // Tổng số lượng bản ghi
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT; // Thay đổi pageSize
  isLoading = false;
  permission = DATA_PERMISSION;
  arrClasses = [];
  classId = '';
  arrStatus = ARR_STATUS_STUDENT_RECORDS;
  statusRecords = '';
  infoUser: any;
  constStatusRecords = STATUS_STUDENT_RECORDS;
  arrCategories = [];
  oldPageIndex = this.pageIndex;

  constructor(
    private modalService: NgbModal,
    private studentRecordsTeacherService: StudentRecordsTeacherService,
    private showMessage: ShowMessageService,
    private categoryStudentRecordsTeacherService: CategoryStudentRecordsTeacherService,
  ) {}

  ngOnInit(): void {
    this.getListClasses();
    this.getList();
  }

  getList() {
    this.isLoading = true;
    this.studentRecordsTeacherService
      .getListRecordsApprove(
        this.keyword,
        this.classId,
        this.statusRecords,
        this.pageSize,
        this.pageIndex
      )
      .subscribe(
        (res: any) => {
          if (res.status == 1) {
            this.infoUser = res.data;
            this.arrList = res.data.data;
            this.collectionSize = res.data?.totalItems;
            this.arrList.forEach((element: any) => {
              element['approveStatusName'] =
                this.arrStatus.find(
                  (status) => status.value == element.approveStatus
                )?.label || '--';
            });
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

  update(valueUpdate: any) {
    let value = {
      id: valueUpdate.fileUserId,
      name: valueUpdate.fileUserName,
      fileCategoryId: valueUpdate.fileCategoryId,
      fileAttachs: valueUpdate.fileAttaches
    }
    let dataFromParent = {
      arrCate: this.arrCategories,
      valueUpdate: value,
      service: this.studentRecordsTeacherService,
      keyFirebaseAction: 'update',
      keyFirebaseModule: 'file-user',
      apiSubmit: (dataInput: any) =>
        this.studentRecordsTeacherService.update(valueUpdate.fileUserId, dataInput),
      nameForm: 'update',
    };
    const modalRef = this.initModal(
      ModalFormRecordsTeacherComponent,
      'studentRecords.updateRecords',
      'btnAction.cancel',
      'btnAction.save',
      dataFromParent,
      'xxl'
    );
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.pageIndex = 1;
          this.oldPageIndex = this.pageIndex;
          this.getList();
        }
      },
      (reason) => {}
    );
  }

  changeStatusRecords(valueChange: any, nameAction: string) {
    let dataFromParent = {
      id: valueChange.fileUserId,
      dataInput: {
        studentUserId: valueChange.studentUserId,
        fileUserId: valueChange.fileUserId,
        approveStatus: null,
      },
      service: this.studentRecordsTeacherService,
      keyFirebaseAction: 'update',
      keyFirebaseModule: 'file-user',
      apiSubmit: (dataInput: any) =>
        this.studentRecordsTeacherService.changeStatusRecords(
          valueChange.fileUserId,
          dataInput
        ),
    };
    let titleModal = '';
    let size = 'modal-md-plus';
    let modal: any = ModalDeleteComponent;
    switch (nameAction) {
      case 'approve':
        titleModal = 'studentRecords.approveStudentRecords';
        dataFromParent.dataInput.approveStatus =
          STATUS_STUDENT_RECORDS.APPROVED;
        break;
      case 'refuse':
        titleModal = 'studentRecords.refuseStudentRecords';
        dataFromParent.dataInput.approveStatus =
          STATUS_STUDENT_RECORDS.REFUSE;
        dataFromParent.dataInput['approveNote'] = '';
        size = 'lg';
        modal = ModalRefuseRecordsComponent;
        break;
    }
    const modalRef = this.initModal(
      modal,
      titleModal,
      'btnAction.cancel',
      'btnAction.agree',
      dataFromParent,
      size
    );
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.pageIndex = 1;
          this.oldPageIndex = this.pageIndex;
          this.getList();
        }
      },
      (reason) => {}
    );
  }

  changeMarkRecords(valueChange: any, nameAction: string) {
    let dataFromParent = {
      id: valueChange.fileUserId,
      dataInput: {},
      service: this.studentRecordsTeacherService,
      keyFirebaseAction: 'update',
      keyFirebaseModule: 'file-user',
      apiSubmit: (dataInput: any) =>
        this.studentRecordsTeacherService.changeStatusImportRecords(
          valueChange.fileUserId,
          dataInput
        ),
    };
    let titleModal = '';
    switch (nameAction) {
      case 'mark':
        titleModal = 'studentRecords.markImportantRecords';
        dataFromParent.dataInput = {
          IsImportant: 1,
        };
        break;
      case 'unmark':
        titleModal = 'studentRecords.unmarkImportantRecords';
        dataFromParent.dataInput = {
          IsImportant: 0,
        };
        break;
    }
    const modalRef = this.initModal(
      ModalDeleteComponent,
      titleModal,
      'btnAction.cancel',
      'btnAction.agree',
      dataFromParent,
      'modal-md-plus'
    );
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.pageIndex = 1;
          this.oldPageIndex = this.pageIndex;
          this.getList();
        }
      },
      (reason) => {}
    );
  }

  delete(id: string, name: string) {
    let dataFromParent = {
      id: id,
      dataInput: id,
      service: this.studentRecordsTeacherService,
      apiSubmit: (dataInput: any) =>
        this.studentRecordsTeacherService.deleteRecords(dataInput),
      keyFirebaseAction: 'delete',
      keyFirebaseModule: 'file-user',
      textConfirmHeader:
        translate('studentRecords.textConfirmDeleteRecords1') +
        ' ' +
        name +
        ' ' +
        translate('studentRecords.textConfirmDeleteRecords2'),
    };
    const modalRef = this.initModal(
      ModalDeleteComponent,
      'studentRecords.titleDialogDeleteRecords',
      'btnAction.cancel',
      'btnAction.delete',
      dataFromParent,
      'modal-md-plus'
    );
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.pageIndex = 1;
          this.oldPageIndex = this.pageIndex;
          this.getList();
        }
      },
      (reason) => {}
    );
  }

  getListCateRecords() {
    this.categoryStudentRecordsTeacherService
      .getList('', 9999999, TYPE_CATE_STUDENT_RECORDS.STUDENT)
      .subscribe(
        (res: any) => {
          if (res.status == 1) {
            this.arrCategories = res.data.data;
          } else {
            this.showMessage.error(res.msg);
          }
        },
        (err: any) => this.showMessage.error(MESSAGE_ERROR_CALL_API)
      );
  }

  getListClasses() {
    this.studentRecordsTeacherService
      .getListClasses('', 9999999, 1)
      .subscribe(
        (res: any) => {
          if (res.status == 1) {
            this.arrClasses = res.data.data;
          } else {
            this.showMessage.error(res.msg);
          }
        },
        (err: any) => this.showMessage.error(MESSAGE_ERROR_CALL_API)
      );
  }

  initModal(
    compo: any,
    titleModal: string,
    btnCancel: string,
    btnAccept: string,
    dataFromParent: any,
    size: string = 'lg',
    backdrop: boolean | 'static' = true
  ) {
    const modalRef = this.modalService.open(compo, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: backdrop, // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: size, // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: titleModal,
      btnCancel: btnCancel,
      btnAccept: btnAccept,
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: dataFromParent,
    };

    modalRef.componentInstance.dataModal = data;
    return modalRef;
  }

  openModalUpdate(valueUpdate: any) {
    this.isLoading = true;
    this.categoryStudentRecordsTeacherService
      .getList('', 9999999, 1)
      .subscribe(
        (res: any) => {
          if (res.status == 1) {
            this.arrCategories = res.data.data;
            this.isLoading = false;
            this.update(valueUpdate)
          } else {
            this.isLoading = false;
            this.showMessage.error(res.msg);
          }
        },
        (err: any) => {
          this.isLoading = false;
          this.showMessage.error(MESSAGE_ERROR_CALL_API)
        }
      );
  }

  search(event, value: string) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      this.pageIndex = 1;
      this.oldPageIndex = this.pageIndex;
      this.keyword = value.trim();
      this.getList();
    }
  }

  filter() {
    this.pageIndex = 1;
    this.oldPageIndex = this.pageIndex;
    this.getList();
  }

  paginationChange(event: any) {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getList();
  }

}
