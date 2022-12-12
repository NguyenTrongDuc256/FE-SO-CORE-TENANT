import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { translate } from "@ngneat/transloco";
import { GeneralService } from 'src/app/_services/general.service';
import {
  StudentProfileParentService
} from "../../../../../_services/layout-parent/student-profile-parent/student-profile-parent.service";
import { ModalDeleteComponent } from "../../../../../_shared/modals/modal-delete/modal-delete.component";
import {
  ARR_STATUS_STUDENT_RECORDS, AVATAR_DEFAULT,
  DATA_PERMISSION, PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT, TYPE_CATE_STUDENT_RECORDS
} from "../../../../../_shared/utils/constant";
import { ModalFormRecordsParentComponent } from "../../modals/modal-form-records-parent/modal-form-records-parent.component";

@Component({
  selector: 'app-student-record-list-parent',
  templateUrl: './student-record-list-parent.component.html',
  styleUrls: ['./student-record-list-parent.component.scss']
})
export class StudentRecordListParentComponent implements OnInit {
  avatar: string = AVATAR_DEFAULT;
  keyword = '';
  dataSource: any = [];
  dataApi: any = [];
  pageIndex = PAGE_INDEX_DEFAULT; // Trang hiện tại
  pageSize = PAGE_SIZE_DEFAULT; // Số bản ghi trong 1 trang
  collectionSize = 0; // Tổng số lượng bản ghi
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT; // Thay đổi pageSize
  isLoading = false;
  permission = DATA_PERMISSION;
  arrCategories = [];
  cateId: string = '';
  arrStatus = ARR_STATUS_STUDENT_RECORDS;
  statusRecords: string = '';
  studentUserId: string = null;
  oldPageIndex = this.pageIndex;

  constructor(
    private modalService: NgbModal,
    private studentProfileParentService: StudentProfileParentService,
    private generalService: GeneralService
  ) {}

  ngOnInit(): void {
    this.studentUserId = JSON.parse(localStorage.getItem('currentUnit')).id
      this.getList();
      this.getListCateRecords();
  }

  getList() {
    this.isLoading = true;
    this.studentProfileParentService
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
        this.dataApi = res.data;
        this.dataSource = res.data.fileUsers.data;
        this.collectionSize = res.data?.fileUsers?.totalItems;
        this.dataSource.forEach((element: any) => {
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
      service: this.studentProfileParentService,
      keyFirebaseAction: 'create',
      keyFirebaseModule: 'file-user',
      apiSubmit: (dataInput: any) =>
        this.studentProfileParentService.create(dataInput),
      nameForm: 'create',
    };
    const modalRef = this.openModal(
      ModalFormRecordsParentComponent,
      'studentRecords.createRecords',
      'btnAction.cancel',
      'btnAction.save',
      dataFromParent,
      'xl'
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
      service: this.studentProfileParentService,
      keyFirebaseAction: 'update',
      keyFirebaseModule: 'file-user',
      apiSubmit: (dataInput: any) =>
        this.studentProfileParentService.update(valueUpdate.id, dataInput),
      nameForm: 'update',
    };
    const modalRef = this.openModal(
      ModalFormRecordsParentComponent,
      'studentRecords.updateRecords',
      'btnAction.cancel',
      'btnAction.save',
      dataFromParent,
      'xl'
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

  delete(id: string, name: string) {
    let dataFromParent = {
      id: id,
      dataInput: id,
      service: this.studentProfileParentService,
      apiSubmit: (dataInput: any) =>
        this.studentProfileParentService.deleteRecords(dataInput),
      keyFirebaseAction: 'delete',
      keyFirebaseModule: 'file-user',
      textConfirmHeader:
        translate('studentRecords.textConfirmDeleteRecords1') +
        ' ' +
        name +
        ' ' +
        translate('studentRecords.textConfirmDeleteRecords2'),
    };
    const modalRef = this.openModal(
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
    this.studentProfileParentService
    .getListCategory('', 9999999, 1, TYPE_CATE_STUDENT_RECORDS.STUDENT)
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

  openModal(
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
