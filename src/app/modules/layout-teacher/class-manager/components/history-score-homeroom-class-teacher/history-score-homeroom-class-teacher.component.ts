import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import * as moment from 'moment';
import { HistoryAllStudent, HomeroomClass, Student } from 'src/app/_models/layout-teacher/class-manager/score-behavior-teacher.model';
import { BehaviorTeacherService } from 'src/app/_services/layout-teacher/class-manager/behavior-teacher.service';
import { ClassManagerService } from 'src/app/_services/layout-teacher/class-manager/class-manager.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ModalConfirmCancelResultBehaviorComponent } from 'src/app/_shared/modals/modal-confirm-cancel-result-behavior/modal-confirm-cancel-result-behavior.component';
import { DATA_PERMISSION, PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-history-score-homeroom-class-teacher',
  templateUrl: './history-score-homeroom-class-teacher.component.html',
  styleUrls: ['./history-score-homeroom-class-teacher.component.scss', '../../../class-manager/style.scss']
})
export class HistoryScoreHomeroomClassTeacherComponent implements OnInit {

  permission = DATA_PERMISSION;
  isLoading: boolean = false;
  homeroomClassId: any;
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

  startDate: string;
  endDate: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private behaviorTeacherService: BehaviorTeacherService,
    private showMessage: ShowMessageService,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(e => {
      console.log(11111, e);

      if (e) this.homeroomClassId = e.id;
    })
    // this.activatedRoute.queryParams.subscribe(el => {
    //   console.log(el)
    //   if (el.id) this.homeroomClassId = el.id;
    // })


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
    console.log(this.homeroomClassId)
    this.behaviorTeacherService
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

  // danh sách lịch sử tất cả học sinh lớp chủ nhiệm
  getHistoryAllStudentHomeroomClass() {
    this.isLoading = true;
    this.behaviorTeacherService
      .getHistoryAllStudentHomeroomClass(this.homeroomClassId, this.userIds, this.startDate, this.endDate, this.pageIndex, this.pageSize)
      .subscribe(
        (res: any) => {
          this.historyScoreAllStudent = res.data.data;
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
    this.behaviorTeacherService.getStudentByHomeroomClass(this.homeroomClassId, this.keyWord).subscribe(
      (res: any) => {
        const children: Student[] = [];
        res.data.forEach(element =>
          children.push(element)
        )
        this.listOfOption = children;
        // console.log(this.listOfOption.length)
        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
        this.showMessage.error(err.msg);
      }
    );
  }

  cancelBehavior(dataItem: any) {
    let behaviorLog = dataItem.behaviorLog
    let student = dataItem.student
    let dataform = { ...behaviorLog, student }
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
        keyFirebaseAction: 'cancel_point',
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

