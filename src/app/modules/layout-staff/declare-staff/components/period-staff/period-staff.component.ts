import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {translate} from '@ngneat/transloco';
import {PeriodList} from 'src/app/_models/layout-staff/declare/period.model';
import {PeriodService} from 'src/app/_services/layout-staff/declare/period.service';
import {ShowMessageService} from 'src/app/_services/show-message.service';
import {ModalDeleteComponent} from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import {
  DATA_PERMISSION,
  INFO_MOET_PERIOD,
} from 'src/app/_shared/utils/constant';
import {PeriodFormStaffComponent} from '../../modals/period-form-staff/period-form-staff.component';
import {GeneralService} from "../../../../../_services/general.service";

@Component({
  selector: 'app-period-staff',
  templateUrl: './period-staff.component.html',
  styleUrls: ['./period-staff.component.scss'],
})
export class PeriodStaffComponent implements OnInit {
  permission = DATA_PERMISSION;
  listPeriod: PeriodList[];
  isLoading = false;
  keyWord: string = '';
  arrMoetPeriod = INFO_MOET_PERIOD;

  constructor(
    private periodService: PeriodService,
    private modalService: NgbModal,
    private showMessage: ShowMessageService,
    private generalService: GeneralService,
  ) {
  }

  ngOnInit(): void {
    this.getListPeriodStaff();
  }

  getListPeriodStaff() {
    this.isLoading = true;
    let keyWord = this.keyWord;
    this.periodService.getListPeriodStaff(keyWord).subscribe(
      (res: any) => {
        this.listPeriod = res.data;
        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err)
      }
    );
  }

  createPeriodStaff() {
    const modalRef = this.modalService.open(PeriodFormStaffComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static',
      centered: false,
      size: 'xl', // 'sm' | 'md' | 'lg' | 'xl' | string
    });
    let data = {
      titleModal: translate('declare.addPeriod'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: true,
      dataFromParent: '',
      nameForm: 'create',
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (_result) => {
        if (_result == true) this.getListPeriodStaff();
      },
      (_reason) => {
      }
    );
  }

  updatePeriodStaff(item) {
    const modalRef = this.modalService.open(PeriodFormStaffComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static',
      centered: false,
      size: 'xl', // 'sm' | 'md' | 'lg' | 'xl' | string
    });
    let data = {
      titleModal: translate('declare.updatePeriod'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: true,
      dataFromParent: item,
      nameForm: 'update',
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (_result) => {
        if (_result == true) this.getListPeriodStaff();
      },
      (_reason) => {
      }
    );
  }

  removePeriodStaff(id: string) {
    const modalRef = this.modalService.open(ModalDeleteComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      centered: false,
      modalDialogClass: 'modal-md-plus',
    });
    let data = {
      titleModal: translate('declare.deletePeriod'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: true,
      dataFromParent: {
        dataInput: {id: id},
        service: this.periodService,
        apiSubmit: (dataInput: any) =>
          this.periodService.deletePeriodStaff(dataInput),
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'timetable-period',
      },
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result == true) this.getListPeriodStaff();
      },
      (reason) => {
      }
    );
  }
}
