import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { GeneralService } from 'src/app/_services/general.service';
import { TrainingService } from 'src/app/_services/layout-staff/training/training.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { DATA_PERMISSION } from 'src/app/_shared/utils/constant';
import { ModalUpdateAbsentStaffComponent } from '../modal-update-absent-staff/modal-update-absent-staff.component';

@Component({
  selector: 'app-modal-absent-detail-staff',
  templateUrl: './modal-absent-detail-staff.component.html',
  styleUrls: ['./modal-absent-detail-staff.component.scss']
})
export class ModalAbsentDetailStaffComponent implements OnInit {
  permission = DATA_PERMISSION;
  @Input() dataModal: any;
  public isLoading: boolean = false;
  fromDate: "";
  toDate: "";
  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private trainingService: TrainingService,
    private generalService: GeneralService,

  ) { }

  ngOnInit() {
    this.fromDate = this.dataModal.dataFromParent.dataDetail.fromDate;
    this.toDate = this.dataModal.dataFromParent.dataDetail.toDate;
  }

  updateAbsent() {
    this.isLoading = true;
    let dataUpdate = {};
    let dataRequest = {
      absentId: this.dataModal.dataFromParent.dataDetail.id,
      homeroomclassId: this.dataModal.dataFromParent.homeroomclassId
    }
    this.trainingService.getDetailAbsent(dataRequest).subscribe((res: any) => {
      dataUpdate = res?.data;
      const modalRef = this.modalService.open(ModalUpdateAbsentStaffComponent,
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
        homeroomclassId: this.dataModal.dataFromParent.homeroomclassId
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