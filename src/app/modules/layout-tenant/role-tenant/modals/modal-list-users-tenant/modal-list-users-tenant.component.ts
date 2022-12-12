import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from 'src/app/_services/general.service';
import { RoleService } from 'src/app/_services/layout-tenant/role/role.service';
import {
  PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT,
  STATUS_ACTIVE
} from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-modal-list-users-tenant',
  templateUrl: './modal-list-users-tenant.component.html',
  styleUrls: ['./modal-list-users-tenant.component.scss', '../../helper-role.scss']
})
export class ModalListUsersTenantComponent implements OnInit {
  isLoading = false;
  roleId = '';
  layout = '';
  keyword = '';
  pageIndex = PAGE_INDEX_DEFAULT; // Trang hiện tại
  pageSize = PAGE_SIZE_DEFAULT; // Số bản ghi trong 1 trang
  collectionSize = 0; // Tổng số lượng bản ghi
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT; // Thay đổi pageSize
  listUsers = [];
  @Input() dataModal: any;
  dataFromParent: any;
  oldPageIndex = this.pageIndex;

  constructor(
    public activeModal: NgbActiveModal,
    private roleService: RoleService,
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {
    this.dataFromParent = this.dataModal.dataFromParent;
    this.listUsers = this.dataFromParent.listUsers;
    this.collectionSize = this.dataFromParent.collectionSize;
  }

  getList() {
    this.isLoading = true;
    this.roleService
      .getListUserRole(this.dataFromParent.roleId, this.keyword, this.pageSize, this.pageIndex)
      .subscribe(
        (res: any) => {
          this.listUsers = res.data.data;
          this.collectionSize = res.data?.totalItems;
          this.oldPageIndex = this.pageIndex;
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
          this.generalService.showToastMessageError400(err);
        }
      );
  }

  mapNameStatus(value: number) {
    return STATUS_ACTIVE.find(status => status.value == value)?.label || '--';
  }

  search(event, value: string) {
    // if (event.key === 'Enter' || event.key === 'Tab') {
    //   this.searchByValue(value);
    // }
    if (event.key === 'Enter') {
      this.searchByValue(value);
    }
  }

  searchClickIcon(value: string) {
    this.searchByValue(value);
  }

  searchByValue(value: string) {
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.keyword = value.trim();
    this.getList();
  }

  paginationChange(event: any) {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getList();
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

}
