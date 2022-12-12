import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {translate} from '@ngneat/transloco';
import {Course, Grade, Student} from 'src/app/_models/layout-teacher/behavior/score-behavior-teacher.model';
import {ShowMessageService} from 'src/app/_services/show-message.service';
import {
  AVATAR_DEFAULT,
  DATA_PERMISSION,
  GENDER,
  MESSAGE_ERROR_CALL_API,
  TIME_OUT_LISTEN_FIREBASE
} from 'src/app/_shared/utils/constant';
import {forkJoin} from "rxjs";
import * as moment from "moment/moment";
import {GeneralService} from "../../../../../_services/general.service";
import {
  ModalHistoryStudentInCourseTeacherComponent
} from "../../modals/modal-history-student-in-course-teacher/modal-history-student-in-course-teacher.component";
import {
  BehaviorTeacherService
} from "../../../../../_services/layout-teacher/behavior-teacher/behavior-teacher.service";

@Component({
  selector: 'app-scoring-behavior-course-teacher',
  templateUrl: './scoring-behavior-course-teacher.component.html',
  styleUrls: ['./scoring-behavior-course-teacher.component.scss', '../../style.scss'],
})
export class ScoringBehaviorCourseTeacherComponent implements OnInit {
  permission = DATA_PERMISSION;
  isLoading: boolean = false;
  keyWord: string = '';
  gradeId: string = '';
  courseId: string = '';
  gradeList: Grade[] = [];
  courseList: Course[] = [];
  studentScoreList: Student[] = [];
  genders = GENDER;
  courseInfo: { id: string, name: string, code: string };
  nzNotFoundContent: string = 'behavior.label.notFoundContent';
  avatar = AVATAR_DEFAULT;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private behaviorTeacherServiceer: BehaviorTeacherService,
    private modalService: NgbModal,
    private showMessage: ShowMessageService,
    private generalService: GeneralService,
  ) {
  }

  ngOnInit(): void {
    this.getGradeList();
    this.activatedRoute.queryParams.subscribe(el => {
      if (el.gradeId) this.gradeId = el.gradeId;
      if (el.courseId) this.courseId = el.courseId;
    })

    if (this.gradeId && this.courseId) {
      this.handleForkJoinAPI()
    } else if (this.gradeId && !this.courseId) {
      this.getCourseList();
    }
  }

  search(value) {
    this.keyWord = value;
    this.getStudentByCourse();
  }

  /*Danh sách khối*/
  getGradeList() {
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading === true) {
        this.showMessage.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.behaviorTeacherServiceer.getGradeList().subscribe((res: any) => {
        this.gradeList = res.data;
        clearTimeout(timeoutCallAPI);
      },
      (err: any) => {
        this.generalService.showToastMessageError400(err);
        clearTimeout(timeoutCallAPI);
      }
    );
  }

  // Danh sách Lớp môn học
  getCourseList() {
    this.isLoading = true;
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading === true) {
        this.isLoading = false;
        this.showMessage.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.behaviorTeacherServiceer.getCourseList(this.gradeId).subscribe((res: any) => {
        clearTimeout(timeoutCallAPI);
        this.courseList = res.data;
        this.isLoading = false;
      },
      (err: any) => {
        clearTimeout(timeoutCallAPI);
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      }
    );
  }

  onChangeGrade() {
    if (this.gradeId) {
      this.courseId = '';
      this.courseInfo = undefined;
      this.studentScoreList = [];
      this.getCourseList();
      this.router.navigate(['/teacher/behavior/course'], {
        relativeTo: this.activatedRoute,
        queryParams: {gradeId: this.gradeId},
      });

    } else {
      this.courseId = '';
      this.courseInfo = undefined;
      this.courseList = [];
      this.studentScoreList = [];
      this.router.navigate(['/teacher/behavior/course'], {
        relativeTo: this.activatedRoute,
        queryParams: {gradeId: null, courseId: null},
      });
    }
  }

  onChangeCourse() {
    if (this.courseId) {
      this.getStudentByCourse();
      this.router.navigate(['/teacher/behavior/course'], {
        relativeTo: this.activatedRoute,
        queryParams: {courseId: this.courseId},
        queryParamsHandling: "merge"
      });

    } else {
      this.courseInfo = undefined;
      this.studentScoreList = [];
      this.router.navigate(['/teacher/behavior/course'], {
        relativeTo: this.activatedRoute,
        queryParams: {courseId: null},
        queryParamsHandling: "merge"
      });
    }
  }

  // Danh sách học sinh lớp chủ nhiệm
  getStudentByCourse() {
    this.isLoading = true;
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading === true) {
        this.isLoading = false;
        this.showMessage.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.behaviorTeacherServiceer.getStudentByCourse(this.courseId, this.keyWord).subscribe((res: any) => {
        this.studentScoreList = res.data;
        if (this.courseList && this.courseList.length > 0) {
          this.courseInfo = this.courseList.find(el => el.id == this.courseId);
        }
        this.isLoading = false;
        clearTimeout(timeoutCallAPI);
      },
      (err: any) => {
        clearTimeout(timeoutCallAPI);
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
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
    this.behaviorTeacherServiceer.getBehaviorHistoryStudentCourse(this.courseId, studentInfo.id, startDate, endDate).subscribe(
      (res: any) => {
        this.isLoading = false;
        clearTimeout(timeoutCallAPI);
        this.showHistoryStudent(res.data, studentInfo);
      },
      (err: any) => {
        clearTimeout(timeoutCallAPI);
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      }
    );
  }

  // Gọi modal lịch sử 1 học sinh
  showHistoryStudent(historyOneStudent, studentInfo) {
    const modalRef = this.modalService.open(
      ModalHistoryStudentInCourseTeacherComponent,
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

  redirectURLHistoryCourse() {
    this.router.navigate(['/teacher/behavior/history-course'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        courseId: this.courseId
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

    const APIGetCourseList = this.behaviorTeacherServiceer.getCourseList(this.gradeId)
    const APIGetStudentByCourse = this.behaviorTeacherServiceer.getStudentByCourse(this.courseId);
    forkJoin([APIGetCourseList, APIGetStudentByCourse]).subscribe(
      (res: any) => {
        this.courseList = res[0].data || [];
        this.studentScoreList = res[1].data || [];
        if (this.courseList && this.courseList.length > 0) {
          this.courseInfo = this.courseList.find(el => el.id == this.courseId);
        }
        clearTimeout(timeoutCallApi);
        this.isLoading = false;
      }, err => {
        clearTimeout(timeoutCallApi);
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      }
    );
  }
}
