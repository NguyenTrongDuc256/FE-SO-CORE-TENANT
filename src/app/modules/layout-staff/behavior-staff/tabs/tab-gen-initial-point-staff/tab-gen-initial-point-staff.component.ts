import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { BehaviorConfigStaffService } from 'src/app/_services/layout-staff/behavior-staff/behavior-config-staff.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { BEHAVIOR_SCORE_OBJECT_TYPE } from 'src/app/_shared/utils/constant';
import { ModalGenInitialPointConfirmStaffComponent } from '../../modals/modal-gen-Initial-point-confirm-staff/modal-gen-Initial-point-confirm-staff.component';

@Component({
  selector: 'app-tab-gen-initial-point-staff',
  templateUrl: './tab-gen-initial-point-staff.component.html',
  styleUrls: ['./tab-gen-initial-point-staff.component.scss']
})
export class TabGenInitialPointStaffComponent implements OnInit {
  behaviorScoreObjectType = BEHAVIOR_SCORE_OBJECT_TYPE;
  genInitialPointInfoData: Array<any> = [];
  resData: Array<any> = []
  isLoading: boolean = false;
  constructor(
    private showMessageService: ShowMessageService,
    private behaviorConfigStaffService: BehaviorConfigStaffService,
    private modalService: NgbModal,

  ) { }

  ngOnInit() {
    this.genInitialPointInfo();
  }

  genInitialPointInfo() {
    this.isLoading = true;
    this.behaviorConfigStaffService.genInitialPointInfo().subscribe((res: any) => {
      this.isLoading = false;
      this.resData = res.data;
      this.genInitialPointInfoData = [];
      this.behaviorScoreObjectType.forEach((el, i) => { //convert data theo kỳ học
        this.genInitialPointInfoData.push({
          objectType: el.key,
          arrSemester: this.resData.filter(item => item.objectType == el.key)
        });
      });

    }, (err: any) => {
      this.isLoading = false;
      this.showMessageService.error(err.msg);
    });
  }

  genInitialPoint(item: any) {
    let dataRequest = {
      objectType: item.objectType, //1: học sinh, 2:giáo viên, 3:lớp chủ nhiệm
      semester: item.semester, //học kì
      point: Number(item.initializedPoint),
      forNewObjects: item.hasNewObject == 1 ? true : false //Sinh điểm cho đối tượng mới sau khi đã sinh điểm ban đầu cho học kỳ đó hay không? //false: Không, true: Có
    }
    const modalRef = this.modalService.open(ModalGenInitialPointConfirmStaffComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        backdrop: 'static',
        centered: false,
        size: 'md',
      });

    let data = {
      titleModal: translate('xacNhanSinhDiemBanDauChoHocKy') + dataRequest.semester,
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.confirm',
      isHiddenBtnClose: true,
      dataFromParent: dataRequest,
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result === true) {
        this.genInitialPointInfo();
      }
    }, (reason) => {
    });
  }
}
