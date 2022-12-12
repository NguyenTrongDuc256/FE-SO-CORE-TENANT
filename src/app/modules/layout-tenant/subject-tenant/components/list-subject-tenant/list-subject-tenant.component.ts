import {
  PAGE_SIZE_OPTIONS_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_INDEX_DEFAULT,
  DATA_PERMISSION,
} from 'src/app/_shared/utils/constant';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubjectService } from 'src/app/_services/layout-tenant/subject/subject.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { translate } from '@ngneat/transloco';
import { AddSubjectTenantComponent } from '../../modals/add-subject-tenant/add-subject-tenant.component';
import { UpdateSubjectMoetTenantComponent } from '../../modals/update-subject-moet-tenant/update-subject-moet-tenant.component';
import { UpdateSubjectTenantComponent } from '../../modals/update-subject-tenant/update-subject-tenant.component';
import { SubjectList } from 'src/app/_models/layout-tenant/subject/subject.model';
import { ModalDeleteComponent } from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import { GeneralService } from 'src/app/_services/general.service';
@Component({
  selector: 'app-list-subject-tenant',
  templateUrl: './list-subject-tenant.component.html',
  styleUrls: ['./list-subject-tenant.component.scss'],
})
export class ListSubjectTenantComponent implements OnInit {
  permission = DATA_PERMISSION;
  keyWord: string = "";
  educationalStages: number | string = '';
  subjectType: string = '';
  gradeType: string = '';
  listGrade: Array<number> = [];
  listSubject: SubjectList[];
  pageIndex = PAGE_INDEX_DEFAULT; // Trang hiện tại
  pageSize = PAGE_SIZE_DEFAULT; // Số bản ghi trong 1 trang
  collectionSize = 20; // Tổng số lượng bản ghi
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT; // Thay đổi pageSize
  oldPageIndex = this.pageIndex;
  isLoading = false;

  constructor(
    private modalService: NgbModal,
    private subjectService: SubjectService,
    private showMessage: ShowMessageService,
    private generalService: GeneralService,

  ) { }

  ngOnInit() {
    this.getListSubject();
  }

  getListSubject() {
    this.isLoading = true;
    for (let i = 0; i <= 11; i++) {
      this.listGrade[i] = i + 1;
    }
    let dataRequest = {
      keyWord: this.keyWord,
      subjectType: this.subjectType,
      gradeType: this.gradeType,
      educationalStages: this.educationalStages,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    }
    this.subjectService.getListSubject(dataRequest).subscribe((res: any) => {
      this.listSubject = res.data.data;
      this.collectionSize = res.data?.totalItems;
      this.isLoading = false;
    }, (err: any) => {
      this.isLoading = false;
      this.generalService.showToastMessageError400(err);
    }
    );
  }

  changeIsActie() {
    this.oldPageIndex = this.pageIndex;
    this.getListSubject();
  }

  createSubject() {
    const modalRef = this.modalService.open(AddSubjectTenantComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static',
      centered: false,
      size: 'lg', // 'sm' | 'md' | 'lg' | 'xl' | string
    });
    let data = {
      titleModal: translate('subject.addSuject'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: false,
      dataFromParent: '',
      nameForm: 'create'
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((_result) => {
      if (_result === true) {
        this.getListSubject();
      }
    }, (_reason) => {
    });
  }

  updateSubject(item) {
    const modalRef = this.modalService.open(UpdateSubjectTenantComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static',
      centered: false,
      size: 'lg', // 'sm' | 'md' | 'lg' | 'xl' | string
    });
    let data = {
      titleModal: translate('subject.updateSuject'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: false,
      dataFromParent: item,
      nameForm: 'update'
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((_result) => {
      if (_result === true) {
        this.getListSubject();
      }
    }, (_reason) => {
    });
  }

  updateSubjectMoet(item) {
    const modalRef = this.modalService.open(UpdateSubjectMoetTenantComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static',
      centered: false,
      size: 'lg', // 'sm' | 'md' | 'lg' | 'xl' | string
    });
    let data = {
      titleModal: translate('subject.updateSujectMoet'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: false,
      dataFromParent: item,
      nameForm: 'update'
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((_result) => {
      if (_result === true) {
        this.getListSubject();
      }
    }, (_reason) => {
    });
  }

  removeSubject(id: string) {
    const modalRef = this.modalService.open(ModalDeleteComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      centered: false,
      modalDialogClass: 'modal-md-plus',
    });
    let data = {
      titleModal: translate('subject.deleteSubject'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: true,
      dataFromParent: {
        dataInput: { id: id },
        service: this.subjectService,
        apiSubmit: (dataInput: any) =>
          this.subjectService.deleteSubject(dataInput),
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'subject',
      },
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result == true) this.getListSubject();
      },
      (reason) => { }
    );
  }

  paginationChange(event: any) {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getListSubject();
  }
}


