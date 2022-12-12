import {Component, OnInit} from '@angular/core';
import {
  AVATAR_DEFAULT,
  DATA_PERMISSION,
  GENDER,
  MESSAGE_ERROR_CALL_API,
  TIME_OUT_LISTEN_FIREBASE
} from "../../../../../_shared/utils/constant";
import {
  Grade,
  HomeroomClass,
  Student
} from "../../../../../_models/layout-staff/behavior/score-behavior-staff.model";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorStaffService} from "../../../../../_services/layout-staff/behavior-staff/behavior-staff.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ShowMessageService} from "../../../../../_services/show-message.service";
import {
  ModalHistoryStudentInClassStaffComponent
} from "../../../behavior-staff/modals/modal-history-student-in-class-staff/modal-history-student-in-class-staff.component";
import {translate} from "@ngneat/transloco";
import {forkJoin} from "rxjs";
import {
  ModalHistoryStudentInHomeroomClassStaffComponent
} from "../../modals/modal-history-student-in-homeroom-class-staff/modal-history-student-in-homeroom-class-staff.component";
import * as moment from "moment/moment";

@Component({
  selector: 'app-tab-scoring-behavior-homeroom-class-staff',
  templateUrl: './tab-scoring-behavior-homeroom-class-staff.component.html',
  styleUrls: ['./../../../behavior-staff/style.scss', './tab-scoring-behavior-homeroom-class-staff.component.scss']
})
export class TabScoringBehaviorHomeroomClassStaffComponent implements OnInit {
  permission = DATA_PERMISSION;
  isLoading: boolean = false;
  keyWord: string = '';
  homeroomClassId: string = '';
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
    private showMessage: ShowMessageService
  ) {
  }

  ngOnInit(): void {
    this.homeroomClassId = this.activatedRoute.snapshot.params.id;
    this.getStudentByHomeroomClass();
    this.getHomeroomClassInfo()

  }

  search(value) {
    this.keyWord = value;
    // this.handleForkJoinAPI()
    this.getStudentByHomeroomClass();
  }

  // Thông tin lớp học
  getHomeroomClassInfo() {
    this.isLoading = true;
    this.behaviorStaffService
      .getHomeroomClassInfo(this.homeroomClassId)
      .subscribe(
        (res: any) => {
          this.homeroomClassInfo = res.data;
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
          this.showMessage.error(err.msg);
        }
      );
  }

  // Danh sách học sinh lớp chủ nhiệm
  getStudentByHomeroomClass() {
    this.isLoading = true;
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading === true) {
        this.isLoading = false;
        this.showMessage.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.behaviorStaffService.getStudentByHomeroomClass(this.homeroomClassId, this.keyWord).subscribe((res: any) => {
        this.studentScoreList = res.data;
        if (this.homeroomClassList && this.homeroomClassList.length > 0) {
          this.homeroomClassInfo = this.homeroomClassList.find(el => el.id == this.homeroomClassId);
        }
        this.isLoading = false;
        clearTimeout(timeoutCallAPI);
      },
      (err: any) => {
        this.isLoading = false;
        this.showMessage.error(err.msg);
        clearTimeout(timeoutCallAPI);
      }
    );
  }

  // Danh sách Lịch sử chấm điểm 1 HS trong LCN
  getBehaviorHistoryStudentHomeroomClass(studentInfo) {
    this.isLoading = true;
    let startDate = moment().startOf('week').format('X');
    let endDate = moment().endOf('week').format('X');

    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading === true) {
        this.isLoading = false;
        this.showMessage.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.behaviorStaffService.getBehaviorHistoryStudentHomeroomClass(this.homeroomClassId, studentInfo.id, startDate, endDate).subscribe(
      (res: any) => {
        this.isLoading = false;
        clearTimeout(timeoutCallAPI);
        this.showHistoryStudent(res.data, studentInfo);
      },
      (err: any) => {
        this.isLoading = false;
        this.showMessage.error(err.msg);
        clearTimeout(timeoutCallAPI);
      }
    );
  }

  // Gọi modal lịch sử 1 học sinh
  showHistoryStudent(historyOneStudent, studentInfo) {
    const modalRef = this.modalService.open(
      ModalHistoryStudentInHomeroomClassStaffComponent,
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
      homeroomClassId: this.homeroomClassId,
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (_result) => {
      },
    );
  }

  // handleForkJoinAPI() {
  //   const timeoutCallApi = setTimeout(() => {
  //     if (this.isLoading == true) {
  //       this.isLoading = false;
  //       this.showMessage.error(MESSAGE_ERROR_CALL_API);
  //     }
  //   }, TIME_OUT_LISTEN_FIREBASE);
  //
  //   const APIGetHomeroomClassList = this.behaviorStaffService.getHomeroomClassList(this.gradeId)
  //   const APIGetStudentByHomeroomClass = this.behaviorStaffService.getStudentByHomeroomClass(this.homeroomClassId);
  //   forkJoin([APIGetHomeroomClassList, APIGetStudentByHomeroomClass]).subscribe(
  //     (res: any) => {
  //       this.homeroomClassList = res[0].data || [];
  //       this.studentScoreList = res[1].data || [];
  //       if (this.homeroomClassList && this.homeroomClassList.length > 0) {
  //         this.homeroomClassInfo = this.homeroomClassList.find(el => el.id == this.homeroomClassId);
  //       }
  //       this.isLoading = false;
  //       clearTimeout(timeoutCallApi);
  //     }, err => {
  //       this.isLoading = false;
  //       this.showMessage.error(err[0].msg);
  //       this.showMessage.error(err[1].msg);
  //       clearTimeout(timeoutCallApi);
  //     }
  //   );
  // }
}
