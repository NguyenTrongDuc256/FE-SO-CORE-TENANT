
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import * as moment from 'moment';
import { GeneralService } from 'src/app/_services/general.service';
import { AbsentManagerParentService } from 'src/app/_services/layout-parent/absent-manager-parent/absent-manager-parent.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ModalDeleteComponent } from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import { DATA_PERMISSION, PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT } from 'src/app/_shared/utils/constant';
import { ModalAbsentDetailParentComponent } from '../../modals/modal-absent-detail-parent/modal-absent-detail-parent.component';
import { ModalCreateAbsentParentComponent } from '../../modals/modal-create-absent-parent/modal-create-absent-parent.component';
import { ModalPeriodListParentComponent } from '../../modals/modal-period-list-parent/modal-period-list-parent.component';
import { ModalUpdateAbsentParentComponent } from '../../modals/modal-update-absent-parent/modal-update-absent-parent.component';

@Component({
  selector: 'app-absent-list-parent',
  templateUrl: './absent-list-parent.component.html',
  styleUrls: ['./absent-list-parent.component.scss']
})
export class AbsentListParentComponent implements OnInit {
  pageIndex = PAGE_INDEX_DEFAULT; // Trang hiện tại
  pageSize = PAGE_SIZE_DEFAULT; // Số bản ghi trong 1 trang
  collectionSize = 0; // Tổng số lượng bản ghi
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT; // Thay đổi pageSize
  isLoading = false;
  permission = DATA_PERMISSION;
  // data cần truyền lên
  // currentDate: "1653706178"; // ngày truyền lên
  timePicker: boolean = false; // có hiển thị giờ phút hay không
  minDate: ""; // Có thể truyền hoặc không
  maxDate: ""; // Có thể truyền hoặc không
  listAbsent: any = [];
  fromDate: "";
  toDate: "";
  // homeroomClassId: string;
  dateAbsentBus: string;
  numberPeriod: number = 0;
  numberAbsentDate: number = 0;
  dateNow = moment().format('X');

  constructor(
    private modalService: NgbModal,
    private absentManagerParentService: AbsentManagerParentService,
    private showMessage: ShowMessageService,
    private route: ActivatedRoute,
    private generalService: GeneralService

  ) { }

  ngOnInit() {
    this.getListAbsent();
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
    }
    this.absentManagerParentService.getListAbsent(dataRequest).subscribe((res: any) => {
      this.listAbsent = res.data?.data
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
    const modalRef = this.modalService.open(ModalCreateAbsentParentComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        backdrop: 'static',
        centered: false,
        size: 'xl',
      });

    let data = {
      titleModal: translate('training.createAbsent'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: true,
      dataFromParent: '',
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
    let dataRequest = {//call api chi tiết lấy data đổ vào update
      absentId: item.id,
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
          size: 'xl',
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
        service: this.absentManagerParentService,
        apiSubmit: (dataInput: any) =>
          this.absentManagerParentService.deleteAbsent(dataInput),
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'absent_parent',
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

  openListPeriod(item: any) {
    this.isLoading = true;
    let dataDetail = {};
    let dataRequest = {
      id: item.id,
    }
    this.absentManagerParentService.getDetailAbsent(dataRequest).subscribe((res: any) => {
      this.isLoading = false;
      dataDetail = res?.data;
      const modalRef = this.modalService.open(ModalPeriodListParentComponent,
        {
          scrollable: true,
          windowClass: 'myCustomModalClass',
          keyboard: false,
          backdrop: 'static', // prevent click outside modal to close modal
          centered: false, // vị trí hiển thị modal ở giữa màn hình
          size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
        });

      let data = {
        titleModal: '',
        btnAccept: translate('training.exit'),
        btnCancel: translate('btnAction.cancel'),
        isHiddenBtnClose: true, // hidden/show btn close modal
        dataFromParent: {
          data: dataDetail
        },
      }

      modalRef.componentInstance.dataModal = data;
      modalRef.result.then((result) => {
        console.log(result);
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

  absentDetail(item: any) {
    this.isLoading = true;
    let dataDetail = {};
    let dataRequest = {
      id: item.id,
    }
    this.absentManagerParentService.getDetailAbsent(dataRequest).subscribe((res: any) => {
      this.isLoading = true;
      dataDetail = res?.data;
      const modalRef = this.modalService.open(ModalAbsentDetailParentComponent,
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
        dataFromParent: { dataDetail: dataDetail }
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
