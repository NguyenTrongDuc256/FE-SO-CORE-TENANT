import { Component, OnInit } from '@angular/core';
import {BEHAVIOR_SCORE_TYPE, DATA_PERMISSION, GENDER} from "../../../../../_shared/utils/constant";
import {
  HistoryOneStudent,
  StudentInfoAPI
} from "../../../../../_models/layout-staff/behavior/score-behavior-staff.model";
import {BehaviorStaffService} from "../../../../../_services/layout-staff/behavior-staff/behavior-staff.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ShowMessageService} from "../../../../../_services/show-message.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as moment from "moment/moment";
import {
  ModalConfirmCancelResultBehaviorComponent
} from "../../../../../_shared/modals/modal-confirm-cancel-result-behavior/modal-confirm-cancel-result-behavior.component";
import {GeneralService} from "../../../../../_services/general.service";

@Component({
  selector: 'app-history-score-student-in-homeroom-class-staff',
  templateUrl: './history-score-student-in-homeroom-class-staff.component.html',
  styleUrls: ['./../../../behavior-staff/style.scss', './history-score-student-in-homeroom-class-staff.component.scss']
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
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(e  => {
      if (e) this.homeroomClassId = e.id;
    })

    this.activatedRoute.queryParams.subscribe(el => {
      // console.log(el)
      this.type = el.subtab;
      this.userId = el.userid;
    })
    if (this.homeroomClassId && this.userId) {
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

  // Danh sách học sinh lớp chủ nhiệm
  getBehaviorHistoryStudentHomeroomClass() {
    this.isLoading = true;
    this.behaviorStaffService
      .getBehaviorHistoryStudentHomeroomClass(this.homeroomClassId, this.userId, this.startDate,this.endDate)
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
      btnCancel:'btnAction.cancel',
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
        keyFirebaseModule: 'behavior_grading',
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
    this.router.navigate(['/staff/homeroom-class/detail/',this.homeroomClassId], {
      relativeTo: this.activatedRoute,
      queryParams: {tab:'behavior', subtab: type,  userid: this.userId},
    });
  }

  redirectURLHistoryStudent() {
    this.router.navigate(['/staff/behavior/history-student'], {
      relativeTo: this.activatedRoute,
      queryParams: {gradeId: this.gradeId, homeroomClassId: this.homeroomClassId, userId: this.userId},
    });
  }

}
