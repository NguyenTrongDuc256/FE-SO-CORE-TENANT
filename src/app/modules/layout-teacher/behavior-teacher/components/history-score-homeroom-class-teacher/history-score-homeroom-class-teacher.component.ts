import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  HistoryAllStudent,
  HomeroomClass,
  Student,
} from 'src/app/_models/layout-teacher/behavior/score-behavior-teacher.model';
import {
  DATA_PERMISSION,
  PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT,
} from '../../../../../_shared/utils/constant';
import {ShowMessageService} from '../../../../../_services/show-message.service';
import * as moment from 'moment';
import {
  ModalConfirmCancelResultBehaviorComponent
} from "../../../../../_shared/modals/modal-confirm-cancel-result-behavior/modal-confirm-cancel-result-behavior.component";
import {translate} from "@ngneat/transloco";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GeneralService} from "../../../../../_services/general.service";
import {
  BehaviorTeacherService
} from "../../../../../_services/layout-teacher/behavior-teacher/behavior-teacher.service";

@Component({
  selector: 'app-history-score-homeroom-class-teacher',
  templateUrl: './history-score-homeroom-class-teacher.component.html',
  styleUrls: [
    './history-score-homeroom-class-teacher.component.scss',
    '../../style.scss',
  ],
})
export class HistoryScoreHomeroomClassTeacherComponent implements OnInit {
  permission = DATA_PERMISSION;
  isLoading: boolean = false;
  homeroomClassId: string;
  keyWord: string = '';
  historyScoreAllStudent: HistoryAllStudent[];
  homeroomClassInfo: HomeroomClass;
  listOfOption: Student[] = [];
  listOfSelectedValue = [];
  timePicker: boolean = false; // có hiển thị giờ phút hay không
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT;
  pageIndex = PAGE_INDEX_DEFAULT;
  pageSize = PAGE_SIZE_DEFAULT;
  collectionSize = 0;
  oldPageIndex = this.pageIndex;
  userIds: string[] = [];

  startDate = moment().startOf('week').format('X');
  endDate = moment().endOf('week').format('X');

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private behaviorTeacherService: BehaviorTeacherService,
    private showMessage: ShowMessageService,
    private modalService: NgbModal,
    private generalService: GeneralService,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(el => {
      if (el.homeroomClassId) this.homeroomClassId = el.homeroomClassId;
    })

    if (this.homeroomClassId) {
      this.startDate = moment().startOf('week').format('X'); // ngày bắt đầu tuần từ 00:00
      this.endDate = moment().endOf('week').format('X'); // ngày kết thúc tuần tuần từ 23:59:59

      this.getHistoryAllStudentHomeroomClass();
      this.getStudentByHomeroomClass();
      this.getHomeroomClassInfo();
    }
  }


  dataTimeOutput(event: any) {
    if (this.startDate != event.startDate || this.endDate != event.endDate) {
      this.oldPageIndex = this.pageIndex;
      this.startDate = event.startDate;
      this.endDate = event.endDate
      this.getHistoryAllStudentHomeroomClass()
    }
  }

  // Thông tin lớp học
  getHomeroomClassInfo() {
    this.isLoading = true;
    this.behaviorTeacherService
      .getHomeroomClassInfo(this.homeroomClassId)
      .subscribe(
        (res: any) => {
          this.homeroomClassInfo = res.data;
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
          this.generalService.showToastMessageError400(err);
        }
      );
  }

  // danh sách lịch sử tất cả học sinh lớp chủ nhiệm
  getHistoryAllStudentHomeroomClass() {
    this.isLoading = true;
    this.behaviorTeacherService
      .getHistoryAllStudentHomeroomClass(this.homeroomClassId, this.userIds, this.startDate, this.endDate, this.pageIndex, this.pageSize)
      .subscribe(
        (res: any) => {
          this.historyScoreAllStudent = res.data.data;
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
          this.generalService.showToastMessageError400(err);
        }
      );
  }

  // Danh sách học sinh lớp chủ nhiệm
  getStudentByHomeroomClass() {
    this.isLoading = true;
    this.behaviorTeacherService.getStudentByHomeroomClass(this.homeroomClassId, this.keyWord).subscribe(
      (res: any) => {
        const children: Student[] = [];
        res.data.forEach(element =>
          children.push(element)
        )
        this.listOfOption = children;
        console.log(this.listOfOption.length)
        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      }
    );
  }

  cancelBehavior(dataItem: any) {
    let behaviorLog = dataItem.behaviorLog
    let student = dataItem.student
    let dataform = {...behaviorLog, student}
    // console.log(dataform)
    const modalRef = this.modalService.open(ModalConfirmCancelResultBehaviorComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      centered: false,
      modalDialogClass: 'modal-md-plus',
    });
    let data = {
      titleModal: translate('behavior.title.xacNhanHuyChamDiem'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.confirm'),
      isHiddenBtnClose: true,
      dataFromParent: {
        dataView: dataform,
        dataInput: {
          id: dataform.id,
          userId: dataform.student.id,
          behaviorId: dataform.behaviorId
        },
        service: this.behaviorTeacherService,
        apiSubmit: (dataInput: any) =>
          this.behaviorTeacherService.cancelScoreResult(dataInput),
        keyFirebaseAction: 'cancel-point',
        keyFirebaseModule: 'behavior-grading',
      },
    };
    // console.log(data.dataFromParent)
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result == true) this.getHistoryAllStudentHomeroomClass();
      },
      (reason) => {
      }
    );
  }

  paginationChange(event: any) {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getHistoryAllStudentHomeroomClass();
  }
}
