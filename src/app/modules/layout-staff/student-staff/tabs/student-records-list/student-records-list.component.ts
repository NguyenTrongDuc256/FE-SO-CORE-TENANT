import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { GeneralService } from 'src/app/_services/general.service';
import { CategoryStudentRecordsStaffService } from 'src/app/_services/layout-staff/category-student-records-staff/category-student-records-staff.service';
import { StudentRecordsStaffService } from 'src/app/_services/layout-staff/student-records-staff/student-records-staff.service';
import { ModalDeleteComponent } from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import {
  ARR_STATUS_STUDENT_RECORDS,
  DATA_PERMISSION, PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT,
  STATUS_STUDENT_RECORDS,
  TYPE_CATE_STUDENT_RECORDS
} from 'src/app/_shared/utils/constant';
import { ModalFormRecordsStaffComponent } from '../../modals/modal-form-records-staff/modal-form-records-staff.component';
import { ModalRefuseRecordsComponent } from '../../modals/modal-refuse-records/modal-refuse-records.component';

@Component({
  selector: 'app-student-records-list',
  templateUrl: './student-records-list.component.html',
  styleUrls: ['./student-records-list.component.scss', '../../helper.scss'],
})
export class StudentRecordsListComponent implements OnInit {

  keyword = '';
  arrList: any = [];
  pageIndex = PAGE_INDEX_DEFAULT; // Trang hiện tại
  pageSize = PAGE_SIZE_DEFAULT; // Số bản ghi trong 1 trang
  collectionSize = 0; // Tổng số lượng bản ghi
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT; // Thay đổi pageSize
  isLoading = false;
  permission = DATA_PERMISSION;
  arrCategories = [];
  cateId = '';
  arrStatus = ARR_STATUS_STUDENT_RECORDS;
  statusRecords = '';
  @Input() studentId = '';
  @Input() studentUserId = '';
  constStatusRecords = STATUS_STUDENT_RECORDS;
  oldPageIndex = this.pageIndex;

  constructor(
    private modalService: NgbModal,
    private studentRecordsStaffService: StudentRecordsStaffService,
    private categoryStudentRecordsStaffService: CategoryStudentRecordsStaffService,
    private activatedRouter: ActivatedRoute,
    private generalService: GeneralService
  ) {}

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(res => {
      this.studentId = res.id;
    })
    this.activatedRouter.queryParams.subscribe(res => {
      this.studentUserId = res.userId;
      this.getList();
    })

    this.getListCateRecords();
  }

  getList() {
    this.isLoading = true;
    this.studentRecordsStaffService
      .getListRecordsOfStudent(
        this.studentUserId,
        this.keyword,
        this.cateId,
        this.statusRecords,
        this.pageSize,
        this.pageIndex
      )
      .subscribe(
        (res: any) => {
          this.arrList = res.data.fileUsers.data;
          this.collectionSize = res.data?.fileUsers?.totalItems;
          this.arrList.forEach((element: any) => {
            element['approveStatusName'] =
              this.arrStatus.find(
                (status) => status.value == element.approveStatus
              )?.label || '--';
          });
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
    let dataFromParent = {
      userId: this.studentUserId,
      arrCate: this.arrCategories,
      service: this.studentRecordsStaffService,
      keyFirebaseAction: 'create',
      keyFirebaseModule: 'file-user',
      apiSubmit: (dataInput: any) =>
        this.studentRecordsStaffService.create(dataInput),
      nameForm: 'create',
    };
    const modalRef = this.initModal(
      ModalFormRecordsStaffComponent,
      'studentRecords.createRecords',
      'btnAction.cancel',
      'btnAction.save',
      dataFromParent,
      'xxl'
    );
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

  update(valueUpdate: any) {
    let dataFromParent = {
      userId: this.studentUserId,
      arrCate: this.arrCategories,
      valueUpdate: valueUpdate,
      service: this.studentRecordsStaffService,
      keyFirebaseAction: 'update',
      keyFirebaseModule: 'file-user',
      apiSubmit: (dataInput: any) =>
        this.studentRecordsStaffService.update(valueUpdate.id, dataInput),
      nameForm: 'update',
    };
    const modalRef = this.initModal(
      ModalFormRecordsStaffComponent,
      'studentRecords.updateRecords',
      'btnAction.cancel',
      'btnAction.save',
      dataFromParent,
      'xxl'
    );
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.getList();
        }
      },
      (reason) => {}
    );
  }

  changeStatusRecords(valueChange: any, nameAction: string) {
    let dataFromParent = {
      id: valueChange.id,
      dataInput: {
        studentUserId: this.studentUserId,
        fileUserId: valueChange.id,
        approveStatus: null,
      },
      service: this.studentRecordsStaffService,
      keyFirebaseAction: 'update',
      keyFirebaseModule: 'file-user',
      apiSubmit: (dataInput: any) =>
        this.studentRecordsStaffService.changeStatusRecords(
          valueChange.id,
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
          this.getList();
        }
      },
      (reason) => {}
    );
  }

  changeMarkRecords(valueChange: any, nameAction: string) {
    let dataFromParent = {
      id: valueChange.id,
      dataInput: {},
      service: this.studentRecordsStaffService,
      keyFirebaseAction: 'update',
      keyFirebaseModule: 'file-user',
      apiSubmit: (dataInput: any) =>
        this.studentRecordsStaffService.changeStatusImportRecords(
          valueChange.id,
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
          this.pageIndex = PAGE_INDEX_DEFAULT;
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
      service: this.studentRecordsStaffService,
      apiSubmit: (dataInput: any) =>
        this.studentRecordsStaffService.deleteRecords(dataInput),
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
          this.pageIndex = PAGE_INDEX_DEFAULT;
          this.getList();
        }
      },
      (reason) => {}
    );
  }

  getListCateRecords() {
    this.isLoading = true;
    this.categoryStudentRecordsStaffService
      .getList('', 9999999, 1, TYPE_CATE_STUDENT_RECORDS.STUDENT, null)
      .subscribe(
        (res: any) => {
          this.arrCategories = res.data.data;
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
          this.generalService.showToastMessageError400(err);
        }
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

  paginationChange(event: any) {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getList();
  }
}
