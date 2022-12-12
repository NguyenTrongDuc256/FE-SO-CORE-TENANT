import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {Course, HistoryAllStudent, Student,} from 'src/app/_models/layout-staff/behavior/score-behavior-staff.model';
import {ShowMessageService} from 'src/app/_services/show-message.service';
import {
  DATA_PERMISSION,
  PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT,
} from 'src/app/_shared/utils/constant';
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
  selector: 'app-history-score-course-teacher',
  templateUrl: './history-score-course-teacher.component.html',
  styleUrls: ['./history-score-course-teacher.component.scss', '../../style.scss'],
})
export class HistoryScoreCourseTeacherComponent implements OnInit {
  permission = DATA_PERMISSION;
  isLoading: boolean = false;
  courseId: string;
  keyWord: string;
  historyScoreAllStudent: HistoryAllStudent[];
  courseInfo: Course;
  listOfOption: Student[] = [];
  listOfSelectedValue = [];
  timePicker: boolean = false; // có hiển thị giờ phút hay không
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT;
  pageIndex = PAGE_INDEX_DEFAULT;
  pageSize = PAGE_SIZE_DEFAULT;
  collectionSize = 0;
  oldPageIndex = this.pageIndex;
  userIds: any;

  startDate: string;
  endDate: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private behaviorTeacherService: BehaviorTeacherService,
    private showMessage: ShowMessageService,
    private modalService: NgbModal,
    private generalService: GeneralService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(el => {
      if (el.courseId) this.courseId = el.courseId;
    })

    if (this.courseId) {
      this.startDate = moment().startOf('week').format('X'); // ngày bắt đầu tuần từ 00:00
      this.endDate = moment().endOf('week').format('X'); // ngày kết thúc tuần tuần từ 23:59:59

      this.getHistoryAllStudentCourse();
      this.getStudentByCourse();
      this.getCourseInfo();
    }
  }


  dataTimeOutput(event: any) {
    this.oldPageIndex = this.pageIndex;
    if (this.startDate != event.startDate && this.endDate != event.endDate) {
      this.startDate = event.startDate;
      this.endDate = event.endDate
      this.getHistoryAllStudentCourse();
    }
  }

  // Thông tin lớp học
  getCourseInfo() {
    this.isLoading = true;
    this.behaviorTeacherService
      .getCourseInfo(this.courseId)
      .subscribe(
        (res: any) => {
          this.courseInfo = res.data;
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
          this.generalService.showToastMessageError400(err);
        }
      );
  }

  // danh sách lịch sử tất cả học sinh lớp môn học
  getHistoryAllStudentCourse() {
    this.isLoading = true;
    this.behaviorTeacherService
      .getHistoryAllStudentCourse(this.courseId, this.userIds, this.startDate, this.endDate, this.pageIndex, this.pageSize)
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
  getStudentByCourse() {
    this.isLoading = true;
    this.behaviorTeacherService.getStudentByCourse(this.courseId, this.keyWord).subscribe(
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
        if (result == true) this.getHistoryAllStudentCourse();
      },
      (reason) => {
      }
    );
  }

  paginationChange(event: any) {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getHistoryAllStudentCourse();
  }
}
