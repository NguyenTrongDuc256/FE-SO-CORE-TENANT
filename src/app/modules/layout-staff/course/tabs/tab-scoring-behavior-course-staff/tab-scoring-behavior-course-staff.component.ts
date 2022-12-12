import { Component, OnInit } from '@angular/core';
import {
  AVATAR_DEFAULT,
  DATA_PERMISSION,
  GENDER,
  MESSAGE_ERROR_CALL_API,
  TIME_OUT_LISTEN_FIREBASE
} from "../../../../../_shared/utils/constant";
import {Grade, HomeroomClass, Student} from "../../../../../_models/layout-staff/behavior/score-behavior-staff.model";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorStaffService} from "../../../../../_services/layout-staff/behavior-staff/behavior-staff.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ShowMessageService} from "../../../../../_services/show-message.service";
import * as moment from "moment";
import {
  ModalHistoryStudentInHomeroomClassStaffComponent
} from "../../../homeroom-class/modals/modal-history-student-in-homeroom-class-staff/modal-history-student-in-homeroom-class-staff.component";
import {translate} from "@ngneat/transloco";
import {GeneralService} from "../../../../../_services/general.service";
import {
  ModalHistoryStudentInCourseStaffComponent
} from "../../modals/modal-history-student-in-course-staff/modal-history-student-in-course-staff.component";

@Component({
  selector: 'app-tab-scoring-behavior-course-staff',
  templateUrl: './tab-scoring-behavior-course-staff.component.html',
  styleUrls: ['./../../../behavior-staff/style.scss','./tab-scoring-behavior-course-staff.component.scss']
})
export class TabScoringBehaviorCourseStaffComponent implements OnInit {

  permission = DATA_PERMISSION;
  isLoading: boolean = false;
  keyWord: string = '';
  courseId: string = '';
  gradeList: Grade[] = [];
  homeroomClassList: HomeroomClass[] = [];
  studentScoreList: Student[] = [];
  genders = GENDER;
  homeroomClassInfo: { id: string, name: string, code: string };
  nzNotFoundContent: string = 'behavior.label.notFoundContent';
  avatar = AVATAR_DEFAULT;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private behaviorStaffService: BehaviorStaffService,
    private modalService: NgbModal,
    private showMessage: ShowMessageService,
    private generalService: GeneralService,
  ) {
  }

  ngOnInit(): void {
    this.courseId = this.activatedRoute.snapshot.params.id;
    this.getStudentByCourse();
    this.getCourseInfo()

  }

  search(value) {
    this.keyWord = value;
    // this.handleForkJoinAPI()
    this.getStudentByCourse();
  }

  // Thông tin lớp học
  getCourseInfo() {
    this.isLoading = true;
    this.behaviorStaffService
      .getCourseInfo(this.courseId)
      .subscribe(
        (res: any) => {
          this.homeroomClassInfo = res.data;
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
           this.generalService.showToastMessageError400(err)
        }
      );
  }

  // Danh sách học sinh lớp môn học
  getStudentByCourse() {
    this.isLoading = true;
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading === true) {
        this.isLoading = false;
        this.showMessage.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.behaviorStaffService.getStudentByCourse(this.courseId, this.keyWord).subscribe((res: any) => {
        this.studentScoreList = res.data;
        if (this.homeroomClassList && this.homeroomClassList.length > 0) {
          this.homeroomClassInfo = this.homeroomClassList.find(el => el.id == this.courseId);
        }
        this.isLoading = false;
        clearTimeout(timeoutCallAPI);
      },
      (err: any) => {
        this.isLoading = false;
         this.generalService.showToastMessageError400(err)
        clearTimeout(timeoutCallAPI);
      }
    );
  }

  // Danh sách Lịch sử chấm điểm 1 HS trong LCN
  getBehaviorHistoryStudentCourse(studentInfo) {
    this.isLoading = true;
    let startDate = moment().startOf('week').format('X');
    let endDate = moment().endOf('week').format('X');

    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading === true) {
        this.isLoading = false;
        this.showMessage.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.behaviorStaffService.getBehaviorHistoryStudentCourse(this.courseId, studentInfo.id, startDate, endDate).subscribe(
      (res: any) => {
        this.isLoading = false;
        clearTimeout(timeoutCallAPI);
        this.showHistoryStudent(res.data, studentInfo);
      },
      (err: any) => {
        this.isLoading = false;
         this.generalService.showToastMessageError400(err)
        clearTimeout(timeoutCallAPI);
      }
    );
  }

  // Gọi modal lịch sử 1 học sinh
  showHistoryStudent(historyOneStudent, studentInfo) {
    const modalRef = this.modalService.open(
      ModalHistoryStudentInCourseStaffComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        backdrop: 'static',
        centered: false,
        size: 'xl', // 'sm' | 'md' | 'lg' | 'xl' | string
      }
    );
    let data = {
      titleModal: translate('behavior.title.scoringHistory'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.confirm'),
      isHiddenBtnClose: true,
      historyOneStudent: historyOneStudent,
      studentInfo: studentInfo,
      courseId: this.courseId,
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (_result) => {
      },
    );
  }

}
