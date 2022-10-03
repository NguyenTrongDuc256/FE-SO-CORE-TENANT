import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { DATA_PERMISSION } from 'src/app/_shared/utils/constant';
import { translate } from "@ngneat/transloco";
import { CampusService } from 'src/app/_services/layout-tenant/campus/campus.service';
import { ModalDeleteComponent } from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import { ModalFormCampusTenantComponent } from '../../modals/modal-form-campus-tenant/modal-form-campus-tenant.component';

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
    private showMessageService: ShowMessageService
  ) { }

  ngOnInit(): void {
    this.getDataSource();
  }

  getDataSource() {
    this.isLoading = true;
    this.campusService.getListCampus(this.keyWord,this.isActive).subscribe((res: any) => {
      this.isLoading = false;
      if (res.status == 1) {
        this.dataSource = res.data;
      } else {
        this.showMessageService.error(res.msg);
      }
    }, (_err: any) => {
      this.isLoading = false;
    })
  }

  checkChangeKeywordSerach(event: any) {
    this.keyWord = event.target.value;
    if (event.keyCode == 13) {
      this.getDataSource();
    }
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
      isHiddenBtnClose: false,
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
