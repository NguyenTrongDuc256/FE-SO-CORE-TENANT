import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { forkJoin } from 'rxjs';
import { GeneralService } from 'src/app/_services/general.service';
import { SubjectGradeStaffService } from 'src/app/_services/layout-staff/declare/subject-grade-staff.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ModalDeleteComponent } from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import {
  DATA_PERMISSION,
  PAGE_INDEX_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT, STATUS_ACTIVE_LOCKED,
  ARR_TYPE_OF_SUBJECT,
  OBJ_TYPE_OF_SUBJECT,
  MESSAGE_ERROR_CALL_API,
  TIME_OUT_LISTEN_FIREBASE
} from 'src/app/_shared/utils/constant';
import { ModalUpdateSubjectGradeComponent } from '../../../modals/modal-update-subject-grade/modal-update-subject-grade.component';
import { PAGE_SIZE_DEFAULT } from './../../../../../../_shared/utils/constant';

@Component({
  selector: 'app-list-subject-grade',
  templateUrl: './list-subject-grade.component.html',
  styleUrls: ['./list-subject-grade.component.scss', '../../../helper.scss'],
})
export class ListSubjectGradeComponent implements OnInit {
  keyword = '';
  arrList = [];
  pageIndex = PAGE_INDEX_DEFAULT; // Trang hiện tại
  pageSize = PAGE_SIZE_DEFAULT; // Số bản ghi trong 1 trang
  collectionSize = 0; // Tổng số lượng bản ghi
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT; // Thay đổi pageSize
  isLoading = false;
  permission = DATA_PERMISSION;
  oldPageIndex = this.pageIndex;
  arrGrades = localStorage.getItem('dataConfigSystem') ? JSON.parse(localStorage.getItem('dataConfigSystem')).grades : [];
  gradeId = '';
  arrTypeSubjects = ARR_TYPE_OF_SUBJECT;
  subjectType = '';
  status = '';
  arrStatus = STATUS_ACTIVE_LOCKED;
  reportTypeId = '';
  arrReportTypes = [];
  isSyncMoet = false;
  schoolId: string;
  educationalStage = localStorage.getItem('currentUnit') ? JSON.parse(localStorage.getItem('currentUnit')).educationalStages : null;

  constructor(
    private modalService: NgbModal,
    private showMessage: ShowMessageService,
    private subjectGradeStaffService: SubjectGradeStaffService,
    private router: Router,
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {
    this.arrGrades = this.arrGrades.filter(item => item.isActive == 1 && item.educationalStages == this.educationalStage);
    this.gradeId = this.arrGrades[0]?.id;
    this.getList();
    this.getListReportType();
    if (localStorage.getItem('currentUnit')) {
      this.schoolId = JSON.parse(localStorage.getItem('currentUnit')).id
    }
  }

  getList() {
    this.isLoading = true;
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading) {
        this.showMessage.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.subjectGradeStaffService
      .getList(
        this.subjectType,
        this.keyword,
        this.status,
        this.gradeId,
        this.pageIndex,
        this.pageSize,
        this.reportTypeId,
        this.isSyncMoet ? 1 : ''
      )
      .subscribe(
        (res: any) => {
          this.arrList = res.data.data;
          this.collectionSize = res.data?.totalItems;
          this.oldPageIndex = this.pageIndex;
          this.isLoading = false;
        },
        (_err: any) => {
          clearTimeout(timeoutCallAPI);
          this.generalService.showToastMessageError400(_err);
          this.isLoading = false;
        }
      );
  }

  getListReportType() {
    this.isLoading = true;
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading) {
        this.showMessage.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.subjectGradeStaffService.getListReportType().subscribe((res: any) => {
      this.arrReportTypes = res.data;
      this.isLoading = false;
    }, (_err: any) => {
      clearTimeout(timeoutCallAPI);
      this.generalService.showToastMessageError400(_err);
      this.isLoading = false;
    });
  }

  create() {
    return this.router.navigate(['staff/declare/subject/subject-grade/create'], { queryParams: { gradeId: this.gradeId } });
  }

  update(value) {
    this.isLoading = true;
    let dataInputModal = {
      titleModal: 'declare.titleDialogUpdateSubjectGrade',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        id: value.id,
        subject: value,
        gradeId: this.gradeId,
        arrReportTypes: [],
        arrListSubject: [],
        arrSubjectMOET: []
      },
    };
    const APIGetListReportTypes = this.subjectGradeStaffService.getListReportType();
    const APIGetListSubjects = this.subjectGradeStaffService.getListSubjectUpdate(this.gradeId);
    forkJoin([APIGetListReportTypes, APIGetListSubjects]).subscribe(
      (results) => {
        this.isLoading = false;
        dataInputModal.dataFromParent.arrReportTypes = (
          results[0] as any
        ).data;
        dataInputModal.dataFromParent.arrListSubject = (
          results[1] as any
        ).data;
        dataInputModal.dataFromParent.arrSubjectMOET = dataInputModal.dataFromParent.arrListSubject.filter(it => it.SubjectType == OBJ_TYPE_OF_SUBJECT.SUBJECT_MOET)
        const modalRef = this.modalService.open(ModalUpdateSubjectGradeComponent, {
          scrollable: true,
          windowClass: 'myCustomModalClass',
          keyboard: false,
          // backdrop: 'static', // prevent click outside modal to close modal
          centered: false, // vị trí hiển thị modal ở giữa màn hình
          size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
        });
        modalRef.componentInstance.dataModal = dataInputModal;
        modalRef.result.then(
          (result: boolean) => {
            if (result) {
              this.getList();
            }
          },
          (reason) => { }
        );
      },
      (err) => {
        this.isLoading = false;
        this.showMessage.error(err.msg);
      }
    );
  }

  delete(id: string, name: string) {
    const modalRef = this.modalService.open(ModalDeleteComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      modalDialogClass: 'modal-md-plus',
    });

    let data = {
      titleModal: 'declare.titleDialogDeleteSubjectGrade',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.delete',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        id: id,
        dataInput: { id: id, gradeId: this.gradeId },
        service: this.subjectGradeStaffService,
        apiSubmit: (dataInput: { id: string, gradeId: string }) =>
          this.subjectGradeStaffService.delete(dataInput),
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'subject-grade',
        textConfirmHeader:
          translate('declare.textConfirmDeleteSubjectGrade1') +
          ' ' +
          name +
          ' ' +
          translate('declare.textConfirmDeleteSubjectGrade2'),
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.pageIndex = PAGE_INDEX_DEFAULT;
          this.getList();
        }
      },
      (reason) => { }
    );
  }

  mapNameStatus(value: number) {
    return this.arrStatus.find(status => status.value == value)?.label || '--';
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
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getList();
  }
}
