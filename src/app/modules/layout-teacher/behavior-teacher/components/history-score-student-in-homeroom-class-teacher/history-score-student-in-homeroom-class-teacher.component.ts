import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {ShowMessageService} from 'src/app/_services/show-message.service';
import {BEHAVIOR_SCORE_TYPE, DATA_PERMISSION, GENDER} from 'src/app/_shared/utils/constant';
import {
  HistoryOneStudent,
  StudentInfoAPI
} from "../../../../../_models/layout-teacher/behavior/score-behavior-teacher.model";
import {
  ModalConfirmCancelResultBehaviorComponent
} from "../../../../../_shared/modals/modal-confirm-cancel-result-behavior/modal-confirm-cancel-result-behavior.component";
import {GeneralService} from "../../../../../_services/general.service";
import {
  BehaviorTeacherService
} from "../../../../../_services/layout-teacher/behavior-teacher/behavior-teacher.service";

@Component({
  selector: 'app-history-score-student-in-homeroom-class-teacher',
  templateUrl: './history-score-student-in-homeroom-class-teacher.component.html',
  styleUrls: ['./history-score-student-in-homeroom-class-teacher.component.scss', '../../style.scss']
})
export class HistoryScoreStudentInHomeroomClassTeacherComponent implements OnInit {
  /* Lịch sử chấm điểm 1 học sinh lớp chủ nhiệm */
  genders = GENDER;
  permission = DATA_PERMISSION;
  studentInfo: StudentInfoAPI;
  type: 1 | 2 = 1;
  isLoading: boolean = false;
  gradeId: string;
  homeroomClassId: string;
  userId: string;
  fromDate: number;
  toDate: number;
  historyOneStudent: HistoryOneStudent[];
  pointDetail: any;
  behaviorScoreType = BEHAVIOR_SCORE_TYPE;
  startDate: string;
  endDate: string;
  timePicker: boolean = false; // có hiển thị giờ phút hay không
  constructor(
    private behaviorTeacherService: BehaviorTeacherService,
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
      this.getStudentInfo()
      this.getBehaviorHistoryStudentHomeroomClass();
    }
  }

  // lay data khi chon ngày xong
  dataTimeOutput(event: any) {
    if (this.startDate != event.startDate && this.endDate != event.endDate){
      this.startDate = event.startDate;
      this.endDate = event.endDate
      this.getBehaviorHistoryStudentHomeroomClass();
    }
  }

  // Danh sách lịch sử chấm điểm 1 học sinh trong lớp chủ nhiệm
  getBehaviorHistoryStudentHomeroomClass() {
    this.isLoading = true;
    this.startDate = moment().startOf('week').format('X');// ngày bắt đầu tuần từ 00:00
    this.endDate = moment().endOf('week').format('X');// ngày kết thúc tuần tuần từ 23:59:59
    this.behaviorTeacherService
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
    this.behaviorTeacherService.getStudentInfo(this.userId)
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
        service: this.behaviorTeacherService,
        apiSubmit: (dataInput: any) =>
          this.behaviorTeacherService.cancelScoreResult(dataInput),
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
    this.router.navigate(['/teacher/behavior/mark'], {
      relativeTo: this.activatedRoute,
      queryParams: {type: type, gradeId: this.gradeId, homeroomClassId: this.homeroomClassId, userId: this.userId},
    });
  }

  redirectURLHistoryStudent() {
    this.router.navigate(['/teacher/behavior/history-student'], {
      relativeTo: this.activatedRoute,
      queryParams: {gradeId: this.gradeId, homeroomClassId: this.homeroomClassId, userId: this.userId},
    });
  }
}
