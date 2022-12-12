import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { BuildingList } from 'src/app/_models/layout-staff/declare/infrastructure/building.model';
import { infrastructureService } from 'src/app/_services/layout-staff/declare/infrastructure.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { DATA_PERMISSION } from 'src/app/_shared/utils/constant';
import { ModalDeleteComponent } from '../../../../../../_shared/modals/modal-delete/modal-delete.component';
import { ModalBuildingFormStaffComponent } from '../../../modals/infrastructure/modal-building-form-staff/modal-building-form-staff.component';
import {GeneralService} from "../../../../../../_services/general.service";

@Component({
  selector: 'app-building-staff',
  templateUrl: './building-staff.component.html',
  styleUrls: ['./building-staff.component.scss'],
})
export class BuildingStaffComponent implements OnInit {
  permission = DATA_PERMISSION;
  listBuilding: BuildingList[];
  isLoading = false;
  keyWord: string = '';
  IsActive: number | string = '';
  NumberOfFloor: number | string = '';
  constructor(
    private infrastructureService: infrastructureService,
    private modalService: NgbModal,
    private showMessage: ShowMessageService,
    private generalService: GeneralService,
  ) {}

  ngOnInit(): void {
    this.getListBuildingStaff();
  }
  getListBuildingStaff() {
    this.isLoading = true;
    let dataRequest = {
      keyWord: this.keyWord,
      IsActive: this.IsActive,
    };
    this.infrastructureService.getListBuildingStaff(dataRequest).subscribe(
      (res: any) => {
        this.listBuilding = res.data;
        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err)
      }
    );
  }

  createBuilding() {
    const modalRef = this.modalService.open(ModalBuildingFormStaffComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static',
      centered: false,
      size: 'xl', // 'sm' | 'md' | 'lg' | 'xl' | string
    });
    let data = {
      titleModal: translate('infrastructure.addBuilding'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: true,
      dataFromParent: '',
      nameForm: 'create',
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (_result) => {
        if(_result){
          this.getListBuildingStaff();
        }
      },
      (_reason) => {}
    );
  }

  updateBuilding(item) {
    const modalRef = this.modalService.open(ModalBuildingFormStaffComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static',
      centered: false,
      size: 'xl', // 'sm' | 'md' | 'lg' | 'xl' | string
    });
    let data = {
      titleModal: translate('infrastructure.updateBuilding'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: true,
      dataFromParent: item,
      nameForm: 'update',
    };
    modalRef.componentInstance.dataModal = data;
    console.log(this.listBuilding);
    modalRef.result.then(
      (_result) => {
        if(_result){
          this.getListBuildingStaff();
        }
      },
      (_reason) => {}
    );
  }

  removeBuilding(id: string) {
    const modalRef = this.modalService.open(ModalDeleteComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      centered: false,
      modalDialogClass: 'modal-md-plus',
    });
    let data = {
      titleModal: translate('infrastructure.deleteBuilding'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: true,
      dataFromParent: {
        dataInput: { id: id },
        service: this.infrastructureService,
        apiSubmit: (dataInput: any) =>
          this.infrastructureService.deleteBuildingStaff(dataInput),
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'classroom-building',
      },
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result == true) this.getListBuildingStaff();
      },
      (reason) => {}
    );
  }
}
