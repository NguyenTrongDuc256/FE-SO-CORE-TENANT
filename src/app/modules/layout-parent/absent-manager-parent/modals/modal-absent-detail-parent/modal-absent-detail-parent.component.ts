
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { GeneralService } from 'src/app/_services/general.service';
import { AbsentManagerParentService } from 'src/app/_services/layout-parent/absent-manager-parent/absent-manager-parent.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { DATA_PERMISSION } from 'src/app/_shared/utils/constant';
import { ModalUpdateAbsentParentComponent } from '../modal-update-absent-parent/modal-update-absent-parent.component';

@Component({
  selector: 'app-modal-absent-detail-parent',
  templateUrl: './modal-absent-detail-parent.component.html',
  styleUrls: ['./modal-absent-detail-parent.component.scss']
})
export class ModalAbsentDetailParentComponent implements OnInit {
  @Input() dataModal: any;
  public isLoading: boolean = false;
  fromDate: "";
  toDate: "";
  permission = DATA_PERMISSION;
  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private absentManagerParentService: AbsentManagerParentService,
    private showMessage: ShowMessageService,
    private generalService: GeneralService

  ) { }

  ngOnInit() {
    this.fromDate = this.dataModal.dataFromParent.dataDetail.fromDate;
    this.toDate = this.dataModal.dataFromParent.dataDetail.toDate;
  }

  updateAbsent() {
    this.isLoading = true;
    let dataUpdate = {};
    let dataRequest = {//call api chi tiết lấy data đổ vào update
      absentId: this.dataModal.dataFromParent.dataDetail.id,
    }
    this.absentManagerParentService.getDetailAbsent(dataRequest).subscribe((res: any) => {
      dataUpdate = res?.data;
      const modalRef = this.modalService.open(ModalUpdateAbsentParentComponent,
        {
          scrollable: true,
          windowClass: 'myCustomModalClass',
          keyboard: false,
          backdrop: 'static',
          centered: false,
          size: 'lg',
        });

      let data = {
        titleModal: translate('training.updateAbsent'),
        btnCancel: translate('btnAction.cancel'),
        btnAccept: translate('btnAction.save'),
        isHiddenBtnClose: true,
        dataFromParent: dataUpdate,
      }

      modalRef.componentInstance.dataModal = data;
      modalRef.result.then((result) => {
        if (result === true) {
          this.activeModal.close(true);
        }
      }, (reason) => {
      });

      this.isLoading = false;
    },
      (err: any) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);

      }
    );
  }

  onSubmit() {
    this.updateAbsent();
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }
}