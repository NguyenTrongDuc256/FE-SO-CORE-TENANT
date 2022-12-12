import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { ModuleManagerService } from 'src/app/_services/layout-tenant/module-manager/module-manager.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { DATA_PERMISSION, MESSAGE_ERROR_CALL_API, PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';
import { Router } from '@angular/router';
import { ListModule } from 'src/app/_models/layout-tenant/module-manager/module-manager.model';
import { ModalPermissionOfModuleTenantComponent } from '../../modals/modal-permission-of-module-tenant/modal-permission-of-module-tenant.component';
import { GeneralService } from 'src/app/_services/general.service';

@Component({
  selector: 'app-module-list-tenant',
  templateUrl: './module-list-tenant.component.html',
  styleUrls: ['./module-list-tenant.component.scss']
})
export class ModuleListTenantComponent implements OnInit {
  permission = DATA_PERMISSION;
  dataSource: ListModule[] = [];
  keyWord: string = "";
  statusFilter: number;
  isLoading: boolean = false;
  pageSize: number = PAGE_SIZE_DEFAULT;
  pageIndex: number = PAGE_INDEX_DEFAULT;
  sizeOption: number[] = PAGE_SIZE_OPTIONS_DEFAULT;
  collectionSize: number = 0;
  oldPageIndex = this.pageIndex;
  constructor(
    private modalService: NgbModal,
    private moduleManagerService: ModuleManagerService,
    private showMessageService: ShowMessageService,
    private router: Router,
    private generalService: GeneralService
  ) { }

  ngOnInit() {
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
    this.moduleManagerService.getListModule(this.keyWord, this.statusFilter, this.pageSize, this.pageIndex).subscribe((res: any) => {
      this.isLoading = false;
      this.collectionSize = res.data.totalItems;
      this.dataSource = res.data.data;
    }, (_err: any) => {
      clearTimeout(timeoutCallAPI);
      this.generalService.showToastMessageError400(_err);
      this.isLoading = false;
    })
  }

  changeFilterStatus(event) {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = 1;
    this.statusFilter = event.target.value;
    this.getDataSource();
  }

  checkChangeKeywordSerach() {
    this.getDataSource();
  }

  search(valueSearch): void {
    this.keyWord = valueSearch;
    this.getDataSource();
  }


  getNameStatus(value: number) {
    return value == 1 ? translate('moduleManager.activated') : translate('moduleManager.locked');
  }

  getListPermissionOfModule(item: any) {
    this.isLoading = true;
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.moduleManagerService.permissionOfModule(item.id, '').subscribe((res: any) => {
      this.viewPermissionOfModule(res.data);
      this.isLoading = false;
    }, (_err: any) => {
      clearTimeout(timeoutCallAPI);
      this.generalService.showToastMessageError400(_err);
      this.isLoading = false;
    })
  }

  viewPermissionOfModule(dataPermisson: any) {
    const modalRef = this.modalService.open(ModalPermissionOfModuleTenantComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        size: 'lg'
      });

    let data = {
      titleModal: translate('moduleManager.permissionList'),
      btnCancel: translate('btnAction.close'),
      btnAccept: translate('btnAction.close'),
      isHiddenBtnClose: true,
      dataFromParent: dataPermisson
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result: any) => {
      //
    }, (_reason) => {
      //
    });
  }

  viewDetailModule(item: any) {
    this.router.navigate([`tenant/module/detail/${item.id}`]);
  }

  paginationChange(event: any) {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getDataSource();
  }

}
