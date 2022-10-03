import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { GradeList } from 'src/app/_models/layout-tenant/grade/grade.model';
import { GradeService } from 'src/app/_services/layout-tenant/grade/grade.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ModalDeleteComponent } from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import { DATA_PERMISSION, PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT } from 'src/app/_shared/utils/constant';
import { CreateGradeTenantComponent } from '../create-grade-tenant/create-grade-tenant.component';
import { UpdateGradeTenantComponent } from '../update-grade-tenant/update-grade-tenant.component';

@Component({
  selector: 'app-list-grade-tenant',
  templateUrl: './list-grade-tenant.component.html',
  styleUrls: ['./list-grade-tenant.component.scss']
})
export class ListGradeTenantComponent implements OnInit {
  isActive: number | string = '';
  listGrade: GradeList[];
  gradeType: string = '';
  educationalStages: number | string = '';
  keyWord: string = '';
  pageIndex = PAGE_INDEX_DEFAULT;
  pageSize = PAGE_SIZE_DEFAULT;
  collectionSize = 0;
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT;
  isLoading = false;
  permission = DATA_PERMISSION;

  constructor(
    private gradeService: GradeService,
    private showMessage: ShowMessageService,
    private modalService: NgbModal,

  ) { }

  ngOnInit() {
    this.getListGrade();
  }

  getListGrade() {
    this.isLoading = true;
    let dataFilter = {
      keyWord: this.keyWord,
      isActive: this.isActive,
      educationalStages: this.educationalStages,
      pageSize: this.pageSize,
      pageIndex: this.pageIndex
    }
    this.gradeService.getListGrade(dataFilter).subscribe((res: any) => {
      if (res.status == 1) {
        this.listGrade = res.data;
        this.collectionSize = res?.data?.totalItems;
      } else {
        this.showMessage.error(res.msg);
      }
      this.isLoading = false;
    }, (_err: any) => {
      this.isLoading = false;
    });
  }

  changeIsActie() {
    this.getListGrade();
  }

  createGrade() {
    const modalRef = this.modalService.open(CreateGradeTenantComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        backdrop: 'static',
        centered: false,
        size: 'lg',
      });

    let data = {
      titleModal: translate('grade.createGrade'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: true,
      dataFromParent: null
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((_result) => {
      if (_result === true) {
        this.getListGrade();
      }
    }, (_reason) => { });
  }

  updateGrade(item) {
    const modalRef = this.modalService.open(UpdateGradeTenantComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        backdrop: 'static',
        centered: false,
        size: 'lg',
      });

    let data = {
      titleModal: translate('grade.updateGrade'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: true,
      dataFromParent: item,
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((_result) => {
      if (_result === true) {
        this.getListGrade();
      }
    }, (_reason) => { });
  }

  removeGrade(id: string) {
    const modalRef = this.modalService.open(ModalDeleteComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      centered: false,
      modalDialogClass: 'modal-md-plus',
    });
    let data = {
      titleModal: 'grade.deleteGrade',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: true,
      dataFromParent: {
        dataInput: { id: id },
        service: this.gradeService,
        apiSubmit: (dataInput: any) =>
          this.gradeService.deleteGrade(dataInput),
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'grades-manager',
      },
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result == true) this.getListGrade();
      },
      (reason) => { }
    );
  }

  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getListGrade();
  }


}
