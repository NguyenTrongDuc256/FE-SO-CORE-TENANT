import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {HistoryOneStudent, StudentInfoAPI} from 'src/app/_models/layout-staff/behavior/score-behavior-staff.model';
import { BehaviorStaffService } from 'src/app/_services/layout-staff/behavior-staff/behavior-staff.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import {
  BEHAVIOR_SCORE_TYPE,
  DATA_PERMISSION,
  GENDER,
  MESSAGE_ERROR_CALL_API,
  TIME_OUT_LISTEN_FIREBASE
} from 'src/app/_shared/utils/constant';
import {
  ModalConfirmCancelResultBehaviorComponent
} from "../../../../../_shared/modals/modal-confirm-cancel-result-behavior/modal-confirm-cancel-result-behavior.component";
import { translate } from "@ngneat/transloco";
import {GeneralService} from "../../../../../_services/general.service";

@Component({
  selector: 'app-modal-history-student-in-course-staff',
  templateUrl: './modal-history-student-in-course-staff.component.html',
  styleUrls: ['./modal-history-student-in-course-staff.component.scss', '../../style.scss']
})
export class ModalHistoryStudentInCourseStaffComponent implements OnInit {

  @Input() dataModal: any;
  isLoading: boolean = false;
  timePicker: boolean = false; // có hiển thị giờ phút hay không
  behaviorScoreType = BEHAVIOR_SCORE_TYPE;
  permission = DATA_PERMISSION;
  genders = GENDER;
  userId: string;
  studentInfo: StudentInfoAPI;
  historyOneStudent: HistoryOneStudent[];
  startDate = moment().startOf('week').format('X');
  endDate = moment().endOf('week').format('X');
  constructor(
    public activeModal: NgbActiveModal,
    private behaviorStaffService: BehaviorStaffService,
    private modalService: NgbModal,
    private showMessage: ShowMessageService,
    private generalService: GeneralService,
  ) {
  }

  ngOnInit(): void {
    this.studentInfo = this.dataModal.studentInfo;
    this.userId = this.studentInfo.id;
    this.historyOneStudent = this.dataModal.historyOneStudent;
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  // data cần truyền lên


  // lay data khi chon ngày xong
  dataTimeOutput(event: any) {
    if (this.startDate != event.startDate && this.endDate != event.endDate) {
      this.startDate = event.startDate;
      this.endDate = event.endDate
      this.getBehaviorHistoryStudentCourse();
    }
  }

  // Danh sách Lịch sử chấm điểm 1 HS trong LMH
  getBehaviorHistoryStudentCourse() {
    this.isLoading = true;
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading === true) {
        this.isLoading = false;
        this.showMessage.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.behaviorStaffService
      .getBehaviorHistoryStudentCourse(
        this.dataModal.courseId,
        this.userId,
        this.startDate,
        this.endDate,
      )
      .subscribe(
        (res: any) => {
          clearTimeout(timeoutCallAPI);
          this.historyOneStudent = res.data;
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
          this.generalService.showToastMessageError400(err);
          clearTimeout(timeoutCallAPI);
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
}
