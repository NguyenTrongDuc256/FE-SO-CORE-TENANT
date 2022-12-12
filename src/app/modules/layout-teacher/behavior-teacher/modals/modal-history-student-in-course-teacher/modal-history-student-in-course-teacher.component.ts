import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { HistoryOneStudent } from 'src/app/_models/layout-teacher/behavior/score-behavior-teacher.model';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { BEHAVIOR_SCORE_TYPE, DATA_PERMISSION, GENDER } from 'src/app/_shared/utils/constant';
import {
  ModalConfirmCancelResultBehaviorComponent
} from "../../../../../_shared/modals/modal-confirm-cancel-result-behavior/modal-confirm-cancel-result-behavior.component";
import { translate } from "@ngneat/transloco";
import {GeneralService} from "../../../../../_services/general.service";
import {
  BehaviorTeacherService
} from "../../../../../_services/layout-teacher/behavior-teacher/behavior-teacher.service";

@Component({
  selector: 'app-modal-history-student-in-course-teacher',
  templateUrl: './modal-history-student-in-course-teacher.component.html',
  styleUrls: ['./modal-history-student-in-course-teacher.component.scss', '../../style.scss']
})
export class ModalHistoryStudentInCourseTeacherComponent implements OnInit {

  genders = GENDER;
  @Input() dataModal: any;
  inforStudent: any;
  permission = DATA_PERMISSION;
  isLoading: boolean = false;
  userId: string;
  historyOneStudent: HistoryOneStudent[];
  pointDetail: any;
  behaviorScoreType = BEHAVIOR_SCORE_TYPE;
  startDate: string;
  endDate: string;
  timePicker: boolean = false; // có hiển thị giờ phút hay không
  constructor(
    public activeModal: NgbActiveModal,
    private behaviorTeacherService: BehaviorTeacherService,
    private modalService: NgbModal,
    private showMessage: ShowMessageService,
    private generalService: GeneralService,
  ) {
  }

  ngOnInit(): void {
    this.inforStudent = this.dataModal.dataFromParent;
    this.userId = this.inforStudent.id;
    this.getBehaviorHistoryStudentCourse();

  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  // data cần truyền lên


  // lay data khi chon ngày xong
  dataTimeOutput(event: any) {
    if (this.startDate != event.startDate && this.endDate != event.endDate){
      this.startDate = event.startDate;
      this.endDate = event.endDate
      this.getBehaviorHistoryStudentCourse();
    }
  }

  // Danh sách Lịch sử chấm điểm 1 HS trong LMH
  getBehaviorHistoryStudentCourse() {
    this.isLoading = true;
    var curr = new Date();
    this.startDate = moment(curr).startOf('week').format('X');// ngày bắt đầu tuần từ 00:00
    this.endDate = moment(curr).endOf('week').format('X');// ngày kết thúc tuần tuần từ 23:59:59
    // console.log('timetamp',this.startDate);
    // console.log('timetamp1',this.endDate);
    let dataRequest = {
      courseId: this.dataModal.dataKeyId,
      userId: this.dataModal.dataFromParent.id,
      fromDate: this.startDate,
      toDate: this.endDate,
    };
    console.log(dataRequest);

    this.behaviorTeacherService
      .getBehaviorHistoryStudentCourse(
        this.dataModal.dataKeyId,
        this.dataModal.dataFromParent.id,
        this.startDate,
        this.endDate,
      )
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

  cancelBehavior(dataItem: any) {
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
        if (result == true) this.getBehaviorHistoryStudentCourse();
      },
      (reason) => { }
    );
  }
}
