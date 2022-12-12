import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { GeneralService } from 'src/app/_services/general.service';
import { ClassManagerService } from 'src/app/_services/layout-teacher/class-manager/class-manager.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { DATA_PERMISSION } from 'src/app/_shared/utils/constant';
import { ModalUpdateAbsentTeacherComponent } from '../modal-update-absent-teacher/modal-update-absent-teacher.component';

@Component({
  selector: 'app-modal-absent-detail-teacher',
  templateUrl: './modal-absent-detail-teacher.component.html',
  styleUrls: ['./modal-absent-detail-teacher.component.scss']
})
export class ModalAbsentDetailTeacherComponent implements OnInit {
  permission = DATA_PERMISSION;
  @Input() dataModal: any;
  public isLoading: boolean = false;
  fromDate: "";
  toDate: "";
  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private showMessage: ShowMessageService,
    private route: ActivatedRoute,
    private classManagerService: ClassManagerService,
    private generalService: GeneralService,
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
      homeroomclassId: this.dataModal.dataFromParent.homeroomclassId
    }
    this.classManagerService.getDetailAbsent(dataRequest).subscribe((res: any) => {
      dataUpdate = res?.data;
      const modalRef = this.modalService.open(ModalUpdateAbsentTeacherComponent,
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
