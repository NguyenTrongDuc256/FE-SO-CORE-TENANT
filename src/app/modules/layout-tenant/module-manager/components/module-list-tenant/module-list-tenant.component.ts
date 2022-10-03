import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { ModuleManagerService } from 'src/app/_services/layout-tenant/module-manager/module-manager.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { DATA_PERMISSION, PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT } from 'src/app/_shared/utils/constant';
import { Router } from '@angular/router';
import { ListModule } from 'src/app/_models/layout-tenant/module-manager/module-manager.model';
import { ModalPermissionOfModuleTenantComponent } from '../../modals/modal-permission-of-module-tenant/modal-permission-of-module-tenant.component';

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
  collectionSize:number = 0;
  constructor(
    private modalService: NgbModal,
    private moduleManagerService: ModuleManagerService,
    private showMessageService: ShowMessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getDataSource();
  }

  getDataSource() {
    this.isLoading = true;
    this.moduleManagerService.getListModule(this.keyWord, this.statusFilter, this.pageSize, this.pageIndex).subscribe((res: any) => {
      this.isLoading = false;
      if (res.status == 1) {
        this.collectionSize = res.data.totalItems;
        this.dataSource = res.data.data;
      } else {
        this.showMessageService.error(res.msg);
      }
    }, (_err: any) => {
      this.isLoading = false;
    })
  }

  changeFilterStatus(event) {
    this.pageIndex = 1;
    this.statusFilter = event.target.value;
    this.getDataSource();
  }

  checkChangeKeywordSerach(event: any) {
    this.keyWord = event.target.value;
    if (event.keyCode == 13) {
      this.getDataSource();
    }
  }

  getNameStatus(value: number) {
    return value == 1 ? translate('moduleManager.activated') : translate('moduleManager.locked');
  }

  getListPermissionOfModule(item: any){
    this.moduleManagerService.permissionOfModule(item.id,'').subscribe((res:any)=>{
      if(res.status == 1){
        this.viewPermissionOfModule(res.data);
      }else{
        this.showMessageService.error(res.msg);
      }
    }, (_err: any) => {
      this.isLoading = false;
    })
  }

  viewPermissionOfModule(dataPermisson:any) {
    const modalRef = this.modalService.open(ModalPermissionOfModuleTenantComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        size: 'md',
        modalDialogClass: 'modal-xxl'
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
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getDataSource();
  }

}
