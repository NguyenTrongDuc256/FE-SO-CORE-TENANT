import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {RoleList} from "src/app/_models/layout-tenant/user/user.model";
import {LAYOUTS_TENANT} from "../../../../../_shared/utils/constant";

@Component({
  selector: 'app-modal-role-list-tenant',
  templateUrl: './modal-role-list-tenant.component.html',
  styleUrls: ['./modal-role-list-tenant.component.scss']
})

// component này đang dùng chung vs màn hình nhân viên
export class ModalRoleListTenantComponent implements OnInit {

  @Input() dataModal: any;
  isLoading: boolean = false;
  roleList: RoleList[];
  layouts: any = LAYOUTS_TENANT;

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  getLayoutName(code: string) {
    let layoutName: string = '';
    this.layouts.forEach((el) => {
      if (code == el.code) {
        layoutName = el.name;
      }
    });

    return layoutName;
  }

}
