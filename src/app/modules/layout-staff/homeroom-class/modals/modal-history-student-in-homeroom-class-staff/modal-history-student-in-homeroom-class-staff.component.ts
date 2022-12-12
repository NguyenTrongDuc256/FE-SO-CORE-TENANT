import { Component, Input, OnInit } from '@angular/core';
import {
  BEHAVIOR_SCORE_TYPE,
  DATA_PERMISSION,
  GENDER,
  MESSAGE_ERROR_CALL_API, TIME_OUT_LISTEN_FIREBASE
} from "../../../../../_shared/utils/constant";
import {
  HistoryOneStudent,
  StudentInfoAPI
} from "../../../../../_models/layout-staff/behavior/score-behavior-staff.model";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BehaviorStaffService } from "../../../../../_services/layout-staff/behavior-staff/behavior-staff.service";
import { ShowMessageService } from "../../../../../_services/show-message.service";
import * as moment from "moment/moment";
import {
  ModalConfirmCancelResultBehaviorComponent
} from "../../../../../_shared/modals/modal-confirm-cancel-result-behavior/modal-confirm-cancel-result-behavior.component";
import { translate } from "@ngneat/transloco";
import {GeneralService} from "../../../../../_services/general.service";

@Component({
  selector: 'app-modal-history-student-in-homeroom-class-staff',
  templateUrl: './modal-history-student-in-homeroom-class-staff.component.html',
  styleUrls: ['./../../../behavior-staff/style.scss', './modal-history-student-in-homeroom-class-staff.component.scss']
})
export class ModalHistoryStudentInHomeroomClassStaffComponent implements OnInit {
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
    private behaviorStaffService: BehaviorStaffService,
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
    if (this.startDate != event.startDate && this.endDate != event.endDate) {
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
    this.behaviorStaffService.getBehaviorHistoryStudentHomeroomClass(
      this.homeroomClassId,
      this.studentInfo.id,
      this.startDate,
      this.endDate,
    ).subscribe(
      (res: any) => {
        this.historyOneStudent = res.data;
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
      btnCancel:'btnAction.cancel',
      btnAccept: 'btnAction.confirm',
      isHiddenBtnClose: true,
      dataFromParent: {
        dataView: dataItem,
        dataInput: {
          id: dataItem.id,
          userId: this.studentInfo.id,
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
          this.getBehaviorHistoryStudentHomeroomClass();
        }
      },
      (reason) => {
        this.isLoading = false;
      }
    );
  }
}
