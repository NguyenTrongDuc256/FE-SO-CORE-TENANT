import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import * as moment from 'moment';
import { GeneralService } from 'src/app/_services/general.service';
import { TrainingService } from 'src/app/_services/layout-staff/training/training.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ModalDeleteComponent } from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import { DATA_PERMISSION, PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT } from 'src/app/_shared/utils/constant';
import { ModalAbsentDetailStaffComponent } from '../../modals/modal-absent-detail-staff/modal-absent-detail-staff.component';
import { ModalCreateAbsentStaffComponent } from '../../modals/modal-create-absent-staff/modal-create-absent-staff.component';
import { ModalUpdateAbsentStaffComponent } from '../../modals/modal-update-absent-staff/modal-update-absent-staff.component';

@Component({
  selector: 'app-absent-list-staff',
  templateUrl: './tab-absent-list-staff.component.html',
  styleUrls: ['./tab-absent-list-staff.component.scss']
})
export class AbsentListStaffComponent implements OnInit {
  pageIndex = PAGE_INDEX_DEFAULT;
  pageSize = PAGE_SIZE_DEFAULT;
  collectionSize = 0;
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT;
  isLoading = false;
  permission = DATA_PERMISSION;
  // currentDate: "1653706178"; // ngày truyền lên
  timePicker: boolean = false; // có hiển thị giờ phút hay không
  minDate: "";
  maxDate: "";
  listAbsent: any = [];
  dateNow = moment().format('X');
  fromDate: "";
  toDate: "";
  homeroomClassId: string;
  dateAbsentBus: string;
  numberPeriod: number = 0;
  numberAbsentDate: number = 0;
  @Input() infomationHomeroomClass:any;

  constructor(
    private modalService: NgbModal,
    private trainingService: TrainingService,
    private route: ActivatedRoute,
    private generalService: GeneralService

  ) { }

  ngOnInit() {
    this.homeroomClassId = this.route.snapshot.params.id;
  }

  substringDate(str: string) {
    return str.trim().substring(0, 5);
  }

  numberPeriods(data: any, event: number) {
    let absentNumber = 0
    let periodNumber = 0;
    data.forEach((el) => {
      absentNumber = absentNumber + 1;
      el?.period?.forEach(item => {
        periodNumber = periodNumber + 1;
      });
    });
    if (event == 1) return absentNumber;
    else return periodNumber;
  }

  dataFromDate(event: any) {
    if (event != this.fromDate) {
      this.fromDate = event;
      this.minDate = this.fromDate
      if (this.fromDate != undefined && this.toDate != undefined) {
        this.getListAbsent();
      }
    }
  }

  dataToDate(event: any) {
    if (event != this.toDate) {
      this.toDate = event;
      this.maxDate = event
      if (this.fromDate != undefined && this.toDate != undefined) {
        this.getListAbsent();
      }
    }
  }

  getListAbsent() {
    this.isLoading = true;
    let dataRequest = {
      fromDate: this.fromDate,
      todDate: this.toDate,
      pageSize: this.pageSize,
      pageIndex: this.pageIndex,
      homeroomclassId: this.homeroomClassId,

    }
    this.trainingService.getListAbsent(dataRequest).subscribe((res: any) => {
      this.listAbsent = res.data?.data;
      this.collectionSize = res.data?.totalItems;
      this.isLoading = false;
    },
      (err: any) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      }
    );
  }

  createAbsent() {
    const modalRef = this.modalService.open(ModalCreateAbsentStaffComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        backdrop: 'static',
        centered: false,
        size: 'lg',
        // modalDialogClass: 'modal-xxl', // custom class, nếu muốn mở rộng size modal- thêm class modal-xxl | modal-xxxl | modal-full-screen
      });

    let data = {
      titleModal: translate('training.createAbsent'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: true,
      dataFromParent: this.homeroomClassId,
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result === true) {
        this.getListAbsent();
      }
    }, (reason) => {
    });
  }

  updateAbsent(item: any) {
    this.isLoading = true;
    let dataUpdate = {};
    let dataRequest = {
      absentId: item.id,
      homeroomclassId: this.homeroomClassId
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
        homeroomclassId: this.homeroomClassId
      }

      modalRef.componentInstance.dataModal = data;
      modalRef.result.then((result) => {
        if (result === true) {
          this.getListAbsent();

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

  removeAbsent(id: string) {
    const modalRef = this.modalService.open(ModalDeleteComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      centered: false,
      modalDialogClass: 'modal-md-plus',
    });
    let data = {
      titleModal: translate('training.deleteAbsent'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: true,
      dataFromParent: {
        dataInput: { id: id },
        service: this.trainingService,
        apiSubmit: (dataInput: any) =>
          this.trainingService.deleteAbsent(dataInput),
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'absent',
      },
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result == true) this.getListAbsent();
      },
      (reason) => { }
    );
  }

  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getListAbsent();
  }

  absentDetail(item: any) {
    let dataDetail = {};
    let dataRequest = {
      absentId: item.id,
      homeroomclassId: this.homeroomClassId
    }
    this.trainingService.getDetailAbsent(dataRequest).subscribe((res: any) => {
      dataDetail = res?.data;
      const modalRef = this.modalService.open(ModalAbsentDetailStaffComponent,
        {
          scrollable: true,
          windowClass: 'myCustomModalClass',
          keyboard: false,
          backdrop: 'static',
          centered: false,
          size: 'lg',
        });

      let data = {
        titleModal: translate('training.absentDetail'),
        btnCancel: translate('btnAction.close'),
        btnAccept: translate('btnAction.update'),
        isHiddenBtnClose: true,
        dataFromParent: { dataDetail: dataDetail, homeroomclassId: this.homeroomClassId }
      }
      modalRef.componentInstance.dataModal = data;
      modalRef.result.then((result) => {
        if (result === true) {
          this.getListAbsent();
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
}
