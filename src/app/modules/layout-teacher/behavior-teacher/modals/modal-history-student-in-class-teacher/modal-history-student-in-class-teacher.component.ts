import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {HistoryOneStudent, StudentInfoAPI} from 'src/app/_models/layout-teacher/behavior/score-behavior-teacher.model';
import {ShowMessageService} from 'src/app/_services/show-message.service';
import {
  BEHAVIOR_SCORE_TYPE,
  DATA_PERMISSION,
  GENDER,
  MESSAGE_ERROR_CALL_API,
  TIME_OUT_LISTEN_FIREBASE,
} from 'src/app/_shared/utils/constant';
import {
  ModalConfirmCancelResultBehaviorComponent
} from "../../../../../_shared/modals/modal-confirm-cancel-result-behavior/modal-confirm-cancel-result-behavior.component";
import {GeneralService} from "../../../../../_services/general.service";
import {
  BehaviorTeacherService
} from "../../../../../_services/layout-teacher/behavior-teacher/behavior-teacher.service";

@Component({
  selector: 'app-modal-history-student-in-class-teacher',
  templateUrl: './modal-history-student-in-class-teacher.component.html',
  styleUrls: [
    './modal-history-student-in-class-teacher.component.scss',
    '../../style.scss',
  ],
})
export class ModalHistoryStudentInClassTeacherComponent implements OnInit {
  @Input() dataModal: any;
  permission = DATA_PERMISSION;
  isLoading: boolean = false;
  timePicker: boolean = false; // có hiển thị giờ phút hay không
  genders = GENDER;
  behaviorScoreType = BEHAVIOR_SCORE_TYPE;

  studentInfo: StudentInfoAPI;
  homeroomClassId: string;
  historyOneStudent: HistoryOneStudent[] = [];
  startDate = moment().startOf('week').format('X');
  endDate = moment().endOf('week').format('X');

  constructor(
    public activeModal: NgbActiveModal,
    private behaviorTeacherService: BehaviorTeacherService,
    private modalService: NgbModal,
    private showMessage: ShowMessageService,
    private generalService: GeneralService,

  ) {
  }

  ngOnInit(): void {
    this.historyOneStudent = this.dataModal.historyOneStudent;
    this.studentInfo = this.dataModal.studentInfo;
    this.homeroomClassId = this.dataModal.homeroomClassId;
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  // lay data khi chon ngày xong
  dataTimeOutput(event: any) {
    if (this.startDate != event.startDate || this.endDate != event.endDate) {
      this.startDate = event.startDate;
      this.endDate = event.endDate
      this.getBehaviorHistoryStudentHomeroomClass();
    }
  }

  // Danh sách Lịch sử chấm điểm 1 HS trong LCN
  getBehaviorHistoryStudentHomeroomClass() {
    this.isLoading = true;
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading === true) {
        this.isLoading = false;
        this.showMessage.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.behaviorTeacherService.getBehaviorHistoryStudentHomeroomClass(
      this.homeroomClassId,
      this.studentInfo.id,
      this.startDate,
      this.endDate,
    ).subscribe(
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
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.confirm',
      isHiddenBtnClose: true,
      dataFromParent: {
        dataView: dataItem,
        dataInput: {
          id: dataItem.id,
          userId: this.studentInfo.id,
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
}
