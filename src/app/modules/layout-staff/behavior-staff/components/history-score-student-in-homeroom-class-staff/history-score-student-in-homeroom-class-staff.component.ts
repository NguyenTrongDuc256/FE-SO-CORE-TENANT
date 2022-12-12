import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {BehaviorStaffService} from 'src/app/_services/layout-staff/behavior-staff/behavior-staff.service';
import {ShowMessageService} from 'src/app/_services/show-message.service';
import {
  BEHAVIOR_SCORE_TYPE,
  DATA_PERMISSION,
  GENDER,
  MESSAGE_ERROR_CALL_API,
  TIME_OUT_LISTEN_FIREBASE
} from 'src/app/_shared/utils/constant';
import {
  HistoryOneStudent,
  StudentInfoAPI
} from "../../../../../_models/layout-staff/behavior/score-behavior-staff.model";
import {
  ModalConfirmCancelResultBehaviorComponent
} from "../../../../../_shared/modals/modal-confirm-cancel-result-behavior/modal-confirm-cancel-result-behavior.component";
import {GeneralService} from "../../../../../_services/general.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-history-score-student-in-homeroom-class-staff',
  templateUrl: './history-score-student-in-homeroom-class-staff.component.html',
  styleUrls: ['./history-score-student-in-homeroom-class-staff.component.scss', '../../style.scss']
})
export class HistoryScoreStudentInHomeroomClassStaffComponent implements OnInit {
  /* Lịch sử chấm điểm 1 học sinh lớp chủ nhiệm */
  genders = GENDER;
  permission = DATA_PERMISSION;
  behaviorScoreType = BEHAVIOR_SCORE_TYPE;
  type: 1 | 2 = 1;
  isLoading: boolean = false;
  gradeId: string;
  timePicker: boolean = false; // có hiển thị giờ phút hay không
  homeroomClassId: string;
  userId: string;
  studentInfo: StudentInfoAPI;
  historyOneStudent: HistoryOneStudent[];
  pointDetail: any;
  startDate = moment().startOf('week').format('X');
  endDate = moment().endOf('week').format('X');

  constructor(
    private behaviorStaffService: BehaviorStaffService,
    private modalService: NgbModal,
    private showMessage: ShowMessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private generalService: GeneralService,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(el => {
      this.gradeId = el.gradeId;
      this.homeroomClassId = el.homeroomClassId;
      this.userId = el.userId;
    })
    if (this.gradeId && this.homeroomClassId && this.userId) {
      this.handleForkJoinAPI();
    }
  }

  // lay data khi chon ngày xong
  dataTimeOutput(event: any) {
    if (this.startDate != event.startDate && this.endDate != event.endDate) {
      this.startDate = event.startDate;
      this.endDate = event.endDate
      this.getBehaviorHistoryStudentHomeroomClass();
    }
  }

  // Danh sách lịch sử chấm điểm 1 học sinh trong lớp chủ nhiệm
  getBehaviorHistoryStudentHomeroomClass() {
    this.isLoading = true;
    this.behaviorStaffService
      .getBehaviorHistoryStudentHomeroomClass(this.homeroomClassId, this.userId, this.startDate, this.endDate)
      .subscribe(
        (res: any) => {
          this.historyOneStudent = res.data;
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
          this.generalService.showToastMessageError400(err);
        }
      );
  }

  // Thông tin chi tiết học sinh
  getStudentInfo() {
    this.isLoading = true;
    this.behaviorStaffService.getStudentInfo(this.userId)
      .subscribe(
        (res: any) => {
          this.studentInfo = res.data;
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
          this.generalService.showToastMessageError400(err);
        }
      );
  }

  cancelResultScoreBehavior(dataItem: any) {
    const modalRef = this.modalService.open(ModalConfirmCancelResultBehaviorComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      centered: false,
      modalDialogClass: 'modal-md-plus',
    });
    let data = {
      titleModal: 'behavior.title.xacNhanHuyChamDiem',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.confirm',
      isHiddenBtnClose: true,
      dataFromParent: {
        dataView: dataItem,
        dataInput: {
          id: dataItem.id,
          userId: this.studentInfo.id,
          behaviorId: dataItem.behaviorId
        },
        service: this.behaviorStaffService,
        apiSubmit: (dataInput: any) =>
          this.behaviorStaffService.cancelScoreResult(dataInput),
        keyFirebaseAction: 'cancel-point',
        keyFirebaseModule: 'behavior-grading',
      },
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result == true) {
          this.isLoading = false;
          this.getBehaviorHistoryStudentHomeroomClass();
        }
      },
      (reason) => {
        this.isLoading = false;
      }
    );
  }

  /*1: điểm cộng, 2 điểm trừ*/
  redirectURLMark(type: 1 | 2) {
    this.type = type
    this.router.navigate(['/staff/behavior/mark'], {
      relativeTo: this.activatedRoute,
      queryParams: {type: type, gradeId: this.gradeId, homeroomClassId: this.homeroomClassId, userId: this.userId},
    });
  }

  redirectURLHistoryStudent() {
    this.router.navigate(['/staff/behavior/history-student'], {
      relativeTo: this.activatedRoute,
      queryParams: {gradeId: this.gradeId, homeroomClassId: this.homeroomClassId, userId: this.userId},
    });
  }

  handleForkJoinAPI() {
    this.isLoading = true;
    const timeoutCallApi = setTimeout(() => {
      if (this.isLoading == true) {
        this.isLoading = false;
        this.showMessage.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);

    const APIGetStudentInfo = this.behaviorStaffService.getStudentInfo(this.userId)
    const APIGetBehaviorHistoryStudentHomeroomClass = this.behaviorStaffService.getBehaviorHistoryStudentHomeroomClass(this.homeroomClassId, this.userId, this.startDate, this.endDate)
    forkJoin([APIGetStudentInfo, APIGetBehaviorHistoryStudentHomeroomClass]).subscribe(
      (res: any) => {
        clearTimeout(timeoutCallApi);
        this.studentInfo = res[0].data || [];
        this.historyOneStudent = res[1].data || [];
        this.isLoading = false;
      }, err => {
        clearTimeout(timeoutCallApi);
        this.generalService.showToastMessageError400(err);
        this.isLoading = false;
      }
    );
  }
}
