import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import * as moment from 'moment';
import { HistoryOneStudent } from 'src/app/_models/layout-teacher/class-manager/score-behavior-teacher.model';
import { BehaviorTeacherService } from 'src/app/_services/layout-teacher/class-manager/behavior-teacher.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ModalConfirmCancelResultBehaviorComponent } from 'src/app/_shared/modals/modal-confirm-cancel-result-behavior/modal-confirm-cancel-result-behavior.component';
import { BEHAVIOR_SCORE_TYPE, DATA_PERMISSION, GENDER } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-modal-history-student-in-homeroom-class-teacher',
  templateUrl: './modal-history-student-in-homeroom-class-teacher.component.html',
  styleUrls: ['../../../class-manager/style.scss', './modal-history-student-in-homeroom-class-teacher.component.scss']
})
export class ModalHistoryStudentInHomeroomClassTeacherComponent implements OnInit {

  @Input() dataModal: any;
  genders = GENDER;
  inforStudent: any;
  permission = DATA_PERMISSION;
  isLoading: boolean = false;
  homeroomClassId: string;
  userId: string;
  fromDate: number;
  toDate: number;
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
    private showMessage: ShowMessageService
  ) {
  }

  ngOnInit(): void {
    this.inforStudent = this.dataModal.dataFromParent;
    this.userId = this.inforStudent.id;
    this.getBehaviorHistoryStudentHomeroomClass();
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  // lay data khi chon ngày xong
  dataTimeOutput(event: any) {
    console.log('đã nhận data', event);
    this.startDate = event.startDate;
    this.endDate = event.endDate;
    this.getBehaviorHistoryStudentHomeroomClass();

  }

  // Danh sách Lịch sử chấm điểm 1 HS trong LCN
  getBehaviorHistoryStudentHomeroomClass() {
    this.isLoading = true;
    let curr = new Date();
    this.startDate = moment(curr).startOf('week').format('X');// ngày bắt đầu tuần từ 00:00
    this.endDate = moment(curr).endOf('week').format('X');// ngày kết thúc tuần tuần từ 23:59:59
    this.behaviorTeacherService.getBehaviorHistoryStudentHomeroomClass(
      this.dataModal.dataKeyId, this.dataModal.dataFromParent.id, this.startDate, this.endDate)
      .subscribe((res: any) => {
        this.historyOneStudent = res.data;
        this.isLoading = false;
      },
        (err: any) => {
          this.isLoading = false;
          this.showMessage.error(err.msg);
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
        keyFirebaseModule: 'behavior_grading',
      },
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result === true) this.getBehaviorHistoryStudentHomeroomClass();
      },
      (reason) => { }
    );
  }

}
