import { Component, OnInit } from '@angular/core';
import {
  AVATAR_DEFAULT,
  DATA_PERMISSION, MESSAGE_ERROR_CALL_API,
  PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT, TIME_OUT_LISTEN_FIREBASE
} from "../../../../../_shared/utils/constant";
import {
  HistoryAllStudent,
  HomeroomClass, Student
} from "../../../../../_models/layout-staff/behavior/score-behavior-staff.model";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorStaffService} from "../../../../../_services/layout-staff/behavior-staff/behavior-staff.service";
import {ShowMessageService} from "../../../../../_services/show-message.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment/moment";
import {
  ModalConfirmCancelResultBehaviorComponent
} from "../../../../../_shared/modals/modal-confirm-cancel-result-behavior/modal-confirm-cancel-result-behavior.component";
import {translate} from "@ngneat/transloco";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-history-score-homeroom-class-staff',
  templateUrl: './history-score-homeroom-class-staff.component.html',
  styleUrls: ['./../../../behavior-staff/style.scss','./history-score-homeroom-class-staff.component.scss']
})
export class HistoryScoreHomeroomClassStaffComponent implements OnInit {
  permission = DATA_PERMISSION;
  isLoading: boolean = false;
  homeroomClassId: string;
  keyWord: string;
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
  userIds: any;
  avatar = AVATAR_DEFAULT;

  startDate: string;
  endDate: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private behaviorStaffService: BehaviorStaffService,
    private showMessage: ShowMessageService,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(el => {
      if (el.id) this.homeroomClassId = el.id;
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
    this.oldPageIndex = this.pageIndex;
    this.startDate = event.startDate;
    this.endDate = event.endDate
    this.getHistoryAllStudentHomeroomClass()
  }

  // Thông tin lớp học
  getHomeroomClassInfo() {
    this.isLoading = true;
    const timeoutCallApi = setTimeout(() => {
      if (this.isLoading == true) {
        this.isLoading = false;
        this.showMessage.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.behaviorStaffService
      .getHomeroomClassInfo(this.homeroomClassId)
      .subscribe(
        (res: any) => {
          this.homeroomClassInfo = res.data;
          this.isLoading = false;
          clearTimeout(timeoutCallApi);
        },
        (err: any) => {
          this.isLoading = false;
          this.showMessage.error(err.msg);
          clearTimeout(timeoutCallApi);
        }
      );
  }

  // danh sách lịch sử tất cả học sinh lớp chủ nhiệm
  getHistoryAllStudentHomeroomClass() {
    this.isLoading = true;
    const timeoutCallApi = setTimeout(() => {
      if (this.isLoading == true) {
        this.isLoading = false;
        this.showMessage.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.behaviorStaffService
      .getHistoryAllStudentHomeroomClass(this.homeroomClassId, this.userIds, this.startDate, this.endDate, this.pageIndex, this.pageSize)
      .subscribe(
        (res: any) => {
          this.historyScoreAllStudent = res.data.data;
          this.isLoading = false;
          // console.log(this.historyScoreAllStudent )
          clearTimeout(timeoutCallApi);
        },
        (err: any) => {
          this.isLoading = false;
          this.showMessage.error(err.msg);
          clearTimeout(timeoutCallApi);
        }
      );
  }

  // Danh sách học sinh lớp chủ nhiệm
  getStudentByHomeroomClass() {
    this.isLoading = true;
    const timeoutCallApi = setTimeout(() => {
      if (this.isLoading == true) {
        this.isLoading = false;
        this.showMessage.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.behaviorStaffService.getStudentByHomeroomClass(this.homeroomClassId, this.keyWord).subscribe(
      (res: any) => {
        const children: Student[] = [];
        res.data.forEach(element =>
          children.push(element)
        )
        this.listOfOption = children;
        // console.log(this.listOfOption.length)
        this.isLoading = false;
        clearTimeout(timeoutCallApi);
      },
      (err: any) => {
        this.isLoading = false;
        this.showMessage.error(err.msg);
        clearTimeout(timeoutCallApi);
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
        service: this.behaviorStaffService,
        apiSubmit: (dataInput: any) =>
          this.behaviorStaffService.cancelScoreResult(dataInput),
        keyFirebaseAction: 'cancel-point',
        keyFirebaseModule: 'behavior_grading',
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
