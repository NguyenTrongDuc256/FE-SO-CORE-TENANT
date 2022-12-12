import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import * as moment from 'moment';
import { GeneralService } from 'src/app/_services/general.service';
import { ClassManagerService } from 'src/app/_services/layout-teacher/class-manager/class-manager.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ModalDeleteComponent } from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import { DATA_PERMISSION, PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT } from 'src/app/_shared/utils/constant';
import { ModalAbsentDetailTeacherComponent } from '../../modals/modal-absent-detail-teacher/modal-absent-detail-teacher.component';
import { ModalCreateAbsentTeacherComponent } from '../../modals/modal-create-absent-teacher/modal-create-absent-teacher.component';
import { ModalUpdateAbsentTeacherComponent } from '../../modals/modal-update-absent-teacher/modal-update-absent-teacher.component';

@Component({
  selector: 'app-tab-absent-list-teacher',
  templateUrl: './tab-absent-list-teacher.component.html',
  styleUrls: ['./tab-absent-list-teacher.component.scss']
})
export class TabAbsentListTeacherComponent implements OnInit {
  dateNow = moment().format('X');
  pageIndex = PAGE_INDEX_DEFAULT;
  pageSize = PAGE_SIZE_DEFAULT;
  collectionSize = 0;
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT;
  isLoading = false;
  permission = DATA_PERMISSION;
  // data cần truyền lên
  // currentDate: "1653706178"; 
  timePicker: boolean = false;
  minDate: "";
  maxDate: "";
  listAbsent: any = [];
  totalItems: number;
  fromDate: "";
  toDate: "";
  homeroomClassId: string;
  dateAbsentBus: string;
  numberPeriod: number = 0;
  numberAbsentDate: number = 0;
  constructor(
    private modalService: NgbModal,
    private classManagerService: ClassManagerService,
    private showMessage: ShowMessageService,
    private route: ActivatedRoute,
    private generalService: GeneralService,

  ) { }

  ngOnInit() {
    this.homeroomClassId = this.route.snapshot.params.id;
    this.getListAbsent();

  }

  substringDate(str: string) {
    return str.trim().substring(0, 5);
  }

  numberPeriods(data: any, event: number) {
    let absentNumber = 0
    let periodNumber = 0;
    data.forEach((el) => {
      absentNumber++;
      el?.period?.forEach(item => {
        periodNumber++;
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
    // this.isLoading = true;
    let dataRequest = {
      fromDate: this.fromDate ? this.fromDate : '',
      todDate: this.toDate ? this.toDate : '',
      pageSize: this.pageSize,
      pageIndex: this.pageIndex,
      homeroomclassId: this.homeroomClassId,
    }
    this.classManagerService.getListAbsent(dataRequest).subscribe((res: any) => {
      this.listAbsent = res.data?.data
      this.collectionSize = res.data?.totalItems;
      this.totalItems = res.data?.totalItems;
      this.isLoading = false;

    },
      (err: any) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);

      }
    );

  }

  createAbsent() {
    const modalRef = this.modalService.open(ModalCreateAbsentTeacherComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        backdrop: 'static',
        centered: false,
        size: 'lg',
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
        service: this.classManagerService,
        apiSubmit: (dataInput: any) =>
          this.classManagerService.deleteAbsent(dataInput),
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

  absentDetail(item: any) {
    this.isLoading = true;
    let dataDetail = {};
    let dataRequest = {
      absentId: item.id,
      homeroomclassId: this.homeroomClassId
    }
    this.classManagerService.getDetailAbsent(dataRequest).subscribe((res: any) => {
      dataDetail = res?.data;

      const modalRef = this.modalService.open(ModalAbsentDetailTeacherComponent,
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
        btnCancel: translate('btnAction.cancel'),
        btnAccept: translate('btnAction.update'),
        isHiddenBtnClose: true,
        dataFromParent: { dataDetail: dataDetail, homeroomclassId: this.homeroomClassId },
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

  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getListAbsent();
  }
}

