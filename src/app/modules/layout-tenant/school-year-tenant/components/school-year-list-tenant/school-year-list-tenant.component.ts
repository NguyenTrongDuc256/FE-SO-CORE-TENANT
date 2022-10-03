import {
  ModalUpdateGradebookInputComponent
} from './../../modals/modal-update-gradebook-input/modal-update-gradebook-input.component';
import {translate} from '@ngneat/transloco';
import {ShowMessageService} from 'src/app/_services/show-message.service';
import {
  DATA_PERMISSION,
  MESSAGE_ERROR_CALL_API,
  PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT,
  SCHOOL_YEAR_SATUS,
  TIME_OUT_LISTEN_FIREBASE
} from 'src/app/_shared/utils/constant';
import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {
  ModalFormEditSchoolYearComponent
} from '../../modals/modal-form-edit-school-year/modal-form-edit-school-year.component';
import {SchoolYearService} from 'src/app/_services/layout-tenant/school-year/school-year.service';
import {
  ModalFormAddSchoolYearComponent
} from '../../modals/modal-form-add-school-year/modal-form-add-school-year.component';
import {ModalDeleteComponent} from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import {SchoolYearList} from 'src/app/_models/layout-tenant/school-year/school-year.model';

@Component({
  selector: 'app-school-year-list-tenant',
  templateUrl: './school-year-list-tenant.component.html',
  styleUrls: ['./school-year-list-tenant.component.scss']
})
export class SchoolYearListTenantComponent implements OnInit {
  permission = DATA_PERMISSION;
  collectionSize: number = 0;
  sizeOption: number[] = PAGE_SIZE_OPTIONS_DEFAULT;
  pageIndex: number = PAGE_INDEX_DEFAULT;
  pageSize: number = PAGE_SIZE_DEFAULT;
  keyWord: string = '';
  isLoading: boolean = false;

  schoolYearStatus: any = SCHOOL_YEAR_SATUS;
  status: string = '';
  tenantId: string = '';
  tenantInfo: string;
  dataSource: SchoolYearList[];

  constructor(
    private schoolYearService: SchoolYearService,
    private modalService: NgbModal,
    private showMessageService: ShowMessageService,
  ) {
  }

  ngOnInit(): void {
    this.tenantInfo = localStorage.getItem('Tenant');
    if (this.tenantInfo) {
      this.tenantId = JSON.parse(this.tenantInfo).Id;
    }

    if (this.tenantId) {
      this.getDataIndex();
    }

  }

  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  onChangeStatus() {
    this.getDataIndex();
  }

  onClickSearch(valueSearch) {
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.keyWord = valueSearch;
    this.getDataIndex();
  }

  onEventKeyupEnter(valueSearch) {
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.keyWord = valueSearch;
    this.getDataIndex();
  }

  getDataIndex() {
    this.isLoading = true;
    setTimeout(() => {
      if (this.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);

    this.schoolYearService.getSchoolYearList(this.tenantId, this.status, this.keyWord).subscribe((res: any) => {
      if (res.status === 1) {
        this.collectionSize = res.data.totalItems;
        this.dataSource = res.data.data;
        this.isLoading = false;
      }

      if (res.status === 0) {
        this.isLoading = false;
        this.showMessageService.error(res.msg);
      }
    }, (_err: any) => {
      this.isLoading = false;
    });
  }

  getStatusName(value: number): string {
    if (value == 0) return translate('schoolYear.lock0');
    if (value == 1) return translate('schoolYear.lock1');
    if (value == 2) return translate('schoolYear.lock2');
  }

  openModalAdd(DataRelationship) {
    const modalRef = this.modalService.open(ModalFormAddSchoolYearComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        backdrop: 'static',
        size: 'xxl',
      });

    let data = {
      titleModal: translate('schoolYear.addSchoolYear'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: DataRelationship,
      tenantId: this.tenantId
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result === true) {
        this.getDataIndex();
      }
    }, (reason) => {
      console.log(reason);
    });
    this.isLoading = false;
  }

  openModalUpdate(item: any, dataRelationship: any) {
    const modalRef = this.modalService.open(ModalFormEditSchoolYearComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        backdrop: 'static',
        size: 'xxl'
      });

    let data = {
      titleModal: translate('schoolYear.updateSchoolYear'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: false,
      dataFromParent: item,
      dataRelationship: dataRelationship,
      tenantId: this.tenantId
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result === true) {
        this.getDataIndex();
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  openModalDelete(item) {
    const modalRef = this.modalService.open(ModalDeleteComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        backdrop: 'static',
        size: 'lg'
      });

    let data = {
      titleModal: 'schoolYear.delete',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false,
      dataFromParent: {
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'school-year',
        apiSubmit: () => this.schoolYearService.delete(this.tenantId, item.id)
      }
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result === true) {
        this.getDataIndex();
      }
    }, (reason) => {

    });
  }

  openModalUpdateGradebookInput(item) {
    let title = '';
    let dataInput = 0;
    if (item.isLockGradebookInput) {
      title = translate('schoolYear.noLockGradebook');
    } else {
      title = translate('schoolYear.lockGradebook');
      dataInput = 1;
    }

    const modalRef = this.modalService.open(ModalUpdateGradebookInputComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        backdrop: 'static',
        size: 'lg'
      });

    let data = {
      titleModal: title,
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: false,
      dataFromParent: {
        dataInput: dataInput,
        tenantId: this.tenantId,
        schoolYearId: item.id,
      }
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result === true) {
        this.getDataIndex();
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  getDataRelationship(item: any = null, isUpdate: boolean = false) {
    this.isLoading = true;
    setTimeout(() => {
      if (this.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.schoolYearService.getDataRelationship(this.tenantId).subscribe((res: any) => {
      if (isUpdate) {
        this.openModalUpdate(item, res)
      } else {
        this.openModalAdd(res);
      }
      this.isLoading = false;
    }, (_err: any) => {
      this.isLoading = false;
    });
  }
}
