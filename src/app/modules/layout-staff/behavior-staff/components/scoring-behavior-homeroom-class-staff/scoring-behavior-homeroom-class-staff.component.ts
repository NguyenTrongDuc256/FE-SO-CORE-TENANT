import {Component, OnInit} from '@angular/core';
import {Grade, HomeroomClass, Student,} from 'src/app/_models/layout-staff/behavior/score-behavior-staff.model';
import {
  AVATAR_DEFAULT,
  DATA_PERMISSION,
  GENDER,
  MESSAGE_ERROR_CALL_API,
  TIME_OUT_LISTEN_FIREBASE
} from 'src/app/_shared/utils/constant';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorStaffService} from 'src/app/_services/layout-staff/behavior-staff/behavior-staff.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ShowMessageService} from 'src/app/_services/show-message.service';
import {translate} from '@ngneat/transloco';
import {
  ModalHistoryStudentInClassStaffComponent
} from '../../modals/modal-history-student-in-class-staff/modal-history-student-in-class-staff.component';
import {forkJoin} from "rxjs";
import * as moment from "moment";
import {GeneralService} from "../../../../../_services/general.service";

@Component({
  selector: 'app-scoring-behavior-homeroom-class-staff',
  templateUrl: './scoring-behavior-homeroom-class-staff.component.html',
  styleUrls: [
    './scoring-behavior-homeroom-class-staff.component.scss',
    '../../style.scss',
  ],
})
export class ScoringBehaviorHomeroomClassStaffComponent implements OnInit {
  permission = DATA_PERMISSION;
  isLoading: boolean = false;
  keyWord: string = '';
  gradeId: string = '';
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
    private showMessage: ShowMessageService,
    private generalService: GeneralService,
  ) {
  }

  ngOnInit(): void {
    this.getGradeList();
    this.activatedRoute.queryParams.subscribe(el => {
      if (el.gradeId) this.gradeId = el.gradeId;
      if (el.homeroomClassId) this.homeroomClassId = el.homeroomClassId;
    })

    if (this.gradeId && this.homeroomClassId) {
      this.handleForkJoinAPI()
    } else if (this.gradeId && !this.homeroomClassId) {
      this.getHomeroomClasslist();
    }
  }

  search(value) {
    this.keyWord = value;
    this.getStudentByHomeroomClass();
  }

  /*Danh sách khối*/
  getGradeList() {
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading === true) {
        this.showMessage.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.behaviorStaffService.getGradeList().subscribe((res: any) => {
        this.gradeList = res.data;
        clearTimeout(timeoutCallAPI);
      },
      (err: any) => {
        this.generalService.showToastMessageError400(err);
        clearTimeout(timeoutCallAPI);
      }
    );
  }

  // Danh sách Lớp chủ nhiệm
  getHomeroomClasslist() {
    this.isLoading = true;
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading === true) {
        this.isLoading = false;
        this.showMessage.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.behaviorStaffService.getHomeroomClassList(this.gradeId).subscribe((res: any) => {
        this.homeroomClassList = res.data;
        this.isLoading = false;
        clearTimeout(timeoutCallAPI);
      },
      (err: any) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
        clearTimeout(timeoutCallAPI);
      }
    );
  }

  onChangeGrade() {
    if (this.gradeId) {
      this.homeroomClassId = '';
      this.homeroomClassInfo = undefined;
      this.studentScoreList = [];
      this.getHomeroomClasslist();
      this.router.navigate(['/staff/behavior'], {
        relativeTo: this.activatedRoute,
        queryParams: {gradeId: this.gradeId},
      });

    } else {
      this.homeroomClassId = '';
      this.homeroomClassInfo = undefined;
      this.homeroomClassList = [];
      this.studentScoreList = [];
      this.router.navigate(['/staff/behavior'], {
        relativeTo: this.activatedRoute,
        queryParams: {gradeId: null, homeroomClassId: null},
      });
    }
  }

  onChangeHomeroomClass() {
    if (this.homeroomClassId) {
      this.getStudentByHomeroomClass();
      this.router.navigate(['/staff/behavior'], {
        relativeTo: this.activatedRoute,
        queryParams: {homeroomClassId: this.homeroomClassId},
        queryParamsHandling: "merge"
      });

    } else {
      this.homeroomClassInfo = undefined;
      this.studentScoreList = [];
      this.router.navigate(['/staff/behavior'], {
        relativeTo: this.activatedRoute,
        queryParams: {homeroomClassId: null},
        queryParamsHandling: "merge"
      });
    }
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
        this.generalService.showToastMessageError400(err);
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
        this.generalService.showToastMessageError400(err);
        clearTimeout(timeoutCallAPI);
      }
    );
  }

  // Gọi modal lịch sử 1 học sinh
  showHistoryStudent(historyOneStudent, studentInfo) {
    const modalRef = this.modalService.open(
      ModalHistoryStudentInClassStaffComponent,
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

  redirectURLHistoryHomeroomClass() {
    this.router.navigate(['/staff/behavior/history-homeroom-class'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        homeroomClassId: this.homeroomClassId
      },
      queryParamsHandling: 'merge',
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

    const APIGetHomeroomClassList = this.behaviorStaffService.getHomeroomClassList(this.gradeId)
    const APIGetStudentByHomeroomClass = this.behaviorStaffService.getStudentByHomeroomClass(this.homeroomClassId);
    forkJoin([APIGetHomeroomClassList, APIGetStudentByHomeroomClass]).subscribe(
      (res: any) => {
        this.homeroomClassList = res[0].data || [];
        this.studentScoreList = res[1].data || [];
        if (this.homeroomClassList && this.homeroomClassList.length > 0) {
          this.homeroomClassInfo = this.homeroomClassList.find(el => el.id == this.homeroomClassId);
        }
        clearTimeout(timeoutCallApi);
        this.isLoading = false;
      }, err => {
        clearTimeout(timeoutCallApi);
        this.generalService.showToastMessageError400(err);
        this.isLoading = false;

      }
    );
  }
}
