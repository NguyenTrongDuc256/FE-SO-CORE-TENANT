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
import {translate} from "@ngneat/transloco";
import {GeneralService} from "../../../../../_services/general.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-history-score-student-in-course-staff',
  templateUrl: './history-score-student-in-course-staff.component.html',
  styleUrls: ['./history-score-student-in-course-staff.component.scss', '../../style.scss']
})
export class HistoryScoreStudentInCourseStaffComponent implements OnInit {
  genders = GENDER;
  permission = DATA_PERMISSION;
  behaviorScoreType = BEHAVIOR_SCORE_TYPE;
  type: 1 | 2 = 1;
  isLoading: boolean = false;
  gradeId: string;
  timePicker: boolean = false; // có hiển thị giờ phút hay không
  courseId: string;
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
    private generalService: GeneralService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(el => {
      this.gradeId = el.gradeId;
      this.courseId = el.courseId;
      this.userId = el.userId;
    })

    if (this.gradeId && this.courseId && this.userId) {
      this.handleForkJoinAPI();
    }
  }

  // lay data khi chon ngày xong
  dataTimeOutput(event: any) {
    if (this.startDate != event.startDate && this.endDate != event.endDate){
      this.startDate = event.startDate;
      this.endDate = event.endDate
      this.getBehaviorHistoryStudentCourse();
    }
  }

  // Danh sách học sinh lớp môn học
  getBehaviorHistoryStudentCourse() {
    this.isLoading = true;
    this.behaviorStaffService
      .getBehaviorHistoryStudentCourse(this.courseId, this.userId, this.startDate, this.endDate)
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
          // console.log(this.studentInfo)
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
      titleModal: translate('behavior.title.xacNhanHuyChamDiem'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.confirm'),
      isHiddenBtnClose: true,
      dataFromParent: {
        dataView: dataItem,
        dataInput: {
          id: dataItem.id,
          userId: this.userId,
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
          this.getBehaviorHistoryStudentCourse();
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
    this.router.navigate(['/staff/behavior/course/mark'], {
      relativeTo: this.activatedRoute,
      queryParams: {type: type, gradeId: this.gradeId, courseId: this.courseId, userId: this.userId},
    });
  }

  redirectURLHistoryStudent() {
    this.router.navigate(['/staff/behavior/course/history-student'], {
      relativeTo: this.activatedRoute,
      queryParams: {gradeId: this.gradeId, courseId: this.courseId, userId: this.userId},
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
    const APIGetBehaviorHistoryStudentCourse = this.behaviorStaffService.getBehaviorHistoryStudentCourse(this.courseId, this.userId, this.startDate, this.endDate)
    forkJoin([APIGetStudentInfo, APIGetBehaviorHistoryStudentCourse]).subscribe(
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
