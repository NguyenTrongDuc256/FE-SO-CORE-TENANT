import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-view-permission-tenant',
  templateUrl: './modal-view-permission-tenant.component.html',
  styleUrls: ['./modal-view-permission-tenant.component.scss', '../../helper-role.scss']
})
export class ModalViewPermissionTenantComponent implements OnInit {

  @Input() dataModal: any;
  dataFromParent: any;
  keyword = '';
  isLoading = false;
  listPermission = [];
  listPermissionOriginal = [];

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.dataFromParent = this.dataModal.dataFromParent;
    this.listPermissionOriginal = this.dataFromParent.listPermissions;
    this.listPermission = this.dataFromParent.listPermissions;
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
    this.keyword = value.trim();
    this.listPermission = [];
    this.isLoading = true;
    this.listPermissionOriginal.forEach((item) => {
      let arr = item.permissions.filter(
        (per) =>
          per.name.toLowerCase().includes(this.keyword.toLowerCase()) ||
          per.code.toLowerCase().includes(this.keyword.toLowerCase())
      );
      if (arr.length > 0)
        this.listPermission.push({
          id: item.id,
          code: item.code,
          name: item.name,
          indexOrder: item.indexOrder,
          permissions: arr,
        });
    });
    this.isLoading = false;
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

}
