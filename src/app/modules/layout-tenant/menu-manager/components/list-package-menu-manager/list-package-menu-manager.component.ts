import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PackageMenuManager } from 'src/app/_models/layout-tenant/menu-manager/package-menu-manager.model';
import { MenuManagerService } from 'src/app/_services/layout-tenant/menu-manager/menu-manager.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { Router } from '@angular/router';
import { translate } from '@ngneat/transloco';
import { ModalAssignMenuPackageToSchoolComponent } from '../../modals/modal-assign-menu-package-to-school/modal-assign-menu-package-to-school.component';
import { ModalDeleteComponent } from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import { DATA_PERMISSION, MESSAGE_ERROR_CALL_API, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';
import { GeneralService } from 'src/app/_services/general.service';

@Component({
  selector: 'app-list-package-menu-manager',
  templateUrl: './list-package-menu-manager.component.html',
  styleUrls: ['./list-package-menu-manager.component.scss']
})
export class ListPackageMenuManagerComponent implements OnInit {

  pageIndex = 1;
  pageSize = 5;
  collectionSize = 0;
  sizeOption = [5, 10, 15];
  dataSubRoute: any;
  keyWord: string = '';
  isLoading: boolean = false;
  checkAddMenuPackage: boolean = false;
  checkUpdateMenuPackage: boolean = false;
  menuPackageIdUpdate: string = '';
  checkDetailMenuPackage: boolean = false;
  menuPackageManagerId: string = '';
  permission = DATA_PERMISSION;
  columns = [
    {
      name: 'STT',
      className: "text-center w-5"
    },
    {
      name: 'menuManager.menuPackage',
      className: "w-20"
    },
    {
      name: 'menuManager.menuCode',
      className: "w-20"
    },
    {
      name: 'menuManager.layoutApply',
      className: "w-45"
    },
    {
      name: 'menuManager.activity',
      className: "text-center w-10"
    }
  ];
  dataMenuPackage: PackageMenuManager[] = [];
  startDate = "1651718978";
  endDate = "1653965378";
  currentDate = "1653706178";
  timePicker: boolean = true;

  constructor(
    private modalService: NgbModal,
    private menuManagerService: MenuManagerService,
    private showMessageService: ShowMessageService,
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {
    this.getDataMenuPackage();
  }

  getDataMenuPackage() {
    this.isLoading = true;
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.menuManagerService.getListMenuPackage(this.keyWord).subscribe((res: any) => {
      this.dataMenuPackage = res.data;
      this.collectionSize = res.data?.length;
      this.isLoading = false;
    }, (err: any) => {
      clearTimeout(timeoutCallAPI);
      this.generalService.showToastMessageError400(err);
      this.isLoading = false;
    });
  }

  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  dataTimeOutput(event: any) {
  }

  getLayoutAppply(data) {
    let result = data.join(", ");
    return result;
  }

  setDataSubRoute(name, data) {
    this.dataSubRoute = {
      name, data
    }
  }

  openModalAddMenu() {
    this.checkAddMenuPackage = true;
  }

  checkCreatedMenuPackage(event) {
    this.checkAddMenuPackage = false;
    if (event) {
      this.getDataMenuPackage();
    }
  }

  checkEditMenuPackage(event) {
    this.checkUpdateMenuPackage = false;
    if (event) {
      this.getDataMenuPackage();
    }
  }

  updateMenuPackage(item: any) {
    this.menuPackageIdUpdate = item.id;
    this.checkUpdateMenuPackage = true;
  }

  getDataSchoolNotAssign(item) {
    this.isLoading = true;
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.menuManagerService.getDataSchoolNotAssignMenuPackage(item.id, '', 9999, 1).subscribe((res: any) => {
      this.assignMenuPackage(item, res.data);
      this.isLoading = false;
    }, (_err) => {
      clearTimeout(timeoutCallAPI);
      this.generalService.showToastMessageError400(_err);
      this.isLoading = false;
    })
  }

  assignMenuPackage(item, dataSchool: any[]) {
    const modalRef = this.modalService.open(ModalAssignMenuPackageToSchoolComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        backdrop: 'static', // prevent click outside modal to close modal
        centered: false, // vị trí hiển thị modal ở giữa màn hình
        size: 'xl', // 'sm' | 'md' | 'lg' | 'xl'
      });

    let data = {
      titleModal: translate('menuManager.assignMenuToSchool'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        dataMenu: item,
        dataSchool: dataSchool
      }
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => { }, (reason) => {
    });
  }

  viewDetailMenuPackageManager(item: any) {
    this.menuPackageManagerId = item.id;
    this.checkDetailMenuPackage = true;
  }

  checkCloseDetailMenuPackage(event: any) {
    this.checkDetailMenuPackage = false;
    if (event.status == 2) {
      this.menuPackageIdUpdate = event.id;
      this.checkUpdateMenuPackage = true;
    }
  }

  deleteMenuPackage(item: any) {
    const modalRef = this.modalService.open(ModalDeleteComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      centered: false,
      modalDialogClass: 'modal-md-plus',
    });

    let data = {
      titleModal: 'menuManager.deleteMenuPackage',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: true,
      dataFromParent: {
        dataInput: {},
        service: this.menuManagerService,
        apiSubmit: (dataInput: any) =>
          this.menuManagerService.deleteMenuPackage(item.id),
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'menu-package'
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result == true) this.getDataMenuPackage();
      },
      (reason) => { }
    );
  }

}
