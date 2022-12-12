import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { DATA_PERMISSION, MESSAGE_ERROR_CALL_API, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';
import { translate } from "@ngneat/transloco";
import { CampusService } from 'src/app/_services/layout-tenant/campus/campus.service';
import { ModalDeleteComponent } from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import { ModalFormCampusTenantComponent } from '../../modals/modal-form-campus-tenant/modal-form-campus-tenant.component';
import { GeneralService } from 'src/app/_services/general.service';

@Component({
  selector: 'app-campus-list-manager-tenant',
  templateUrl: './campus-list-manager-tenant.component.html',
  styleUrls: ['./campus-list-manager-tenant.component.scss']
})
export class CampusListManagerTenantComponent implements OnInit {

  permission = DATA_PERMISSION;
  dataSource: any[] = [];
  keyWord: string = "";
  isLoading: boolean = false;
  isActive:number = null;

  constructor(
    private modalService: NgbModal,
    private campusService: CampusService,
    private showMessageService: ShowMessageService,
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {
    this.getDataSource();
  }

  getDataSource() {
    this.isLoading = true;
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.campusService.getListCampus(this.keyWord,this.isActive).subscribe((res: any) => {
      this.isLoading = false;
      this.dataSource = res.data;
    }, (_err: any) => {
      clearTimeout(timeoutCallAPI);
      this.generalService.showToastMessageError400(_err);
      this.isLoading = false;
    })
  }

  checkChangeKeywordSerach(value: string) {
    this.keyWord = value;
    this.getDataSource();
  }

  dataTimeOutput(event: any) {
  }

  getTextStatus(value: number) {
    return value == 1 ? translate('campus.activated') : translate('campus.locked');
  }

  changeFilterStatus(event){
    this.isActive = event.target.value;
    this.getDataSource();
  }

  openModalCampusForm() {
    const modalRef = this.modalService.open(ModalFormCampusTenantComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        size: 'xl',
        modalDialogClass: 'modal-xl'
      });

    let data = {
      titleModal: translate('campus.addCampus'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: true,
      dataFromParent: null
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result) {
        this.getDataSource();
      }
    }, (_reason) => {
      //
    });
  }

  openModalUpdateCampus(item: any) {
    const modalRef = this.modalService.open(ModalFormCampusTenantComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        size: 'xl',
        modalDialogClass: 'modal-xl'
      });

    let data = {
      titleModal: translate('campus.updateCampus'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: false,
      dataFromParent: item
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result) {
        this.getDataSource();
      }
    }, (_reason) => {
      //
    });
  }

  opendModalDeleteCampus(item: any){
    const modalRef = this.modalService.open(ModalDeleteComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      modalDialogClass: 'modal-md-plus',
    });

    let data = {
      titleModal: translate('campus.deleteCampus'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.delete'),
      isHiddenBtnClose: true, // hidden/show btn close modal
      dataFromParent: {
        campusId: item.id,
        dataInput: { id: item.id },
        service: this.campusService,
        apiSubmit: (dataInput: any) =>
          this.campusService.deleteCampus(dataInput),
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'campus',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if(result){
          this.getDataSource();
        }
      },
      (reason) => { }
    );
  }

}
