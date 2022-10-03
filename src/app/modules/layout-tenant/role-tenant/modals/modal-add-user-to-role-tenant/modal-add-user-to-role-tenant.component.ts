import { translate } from '@ngneat/transloco';
import { Subscriber, Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  LAYOUTS_TENANT,
  MESSAGE_ERROR_CALL_API,
  PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT,
  TIME_OUT_LISTEN_FIREBASE,
} from 'src/app/_shared/utils/constant';
import { RoleService } from 'src/app/_services/layout-tenant/role/role.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
@Component({
  selector: 'app-modal-add-user-to-role-tenant',
  templateUrl: './modal-add-user-to-role-tenant.component.html',
  styleUrls: [
    './modal-add-user-to-role-tenant.component.scss',
    '../../helper-role.scss',
  ],
})
export class ModalAddUserToRoleTenantComponent implements OnInit {
  isLoading = false;
  roleId = '';
  keyword = '';
  pageIndex = PAGE_INDEX_DEFAULT; // Trang hiện tại
  pageSize = PAGE_SIZE_DEFAULT; // Số bản ghi trong 1 trang
  collectionSize = 0; // Tổng số lượng bản ghi
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT; // Thay đổi pageSize
  listUsers = [];
  isCheckAll = false;
  listUserIdSubmit = [];
  @Input() dataModal: any;
  dataFromParent: any;
  arrSchools = [];
  schoolId = null;
  arrCampus = [];
  campusId = null;
  oldPageIndex = this.pageIndex;

  constructor(
    public activeModal: NgbActiveModal,
    private roleService: RoleService,
    private showMessage: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService
  ) {}

  ngOnInit(): void {
    this.dataFromParent = this.dataModal.dataFromParent;
    this.listUsers = this.dataFromParent.listUsers;
    this.collectionSize = this.dataFromParent.collectionSize;
    this.arrSchools = this.dataFromParent.listSchools;
    this.arrCampus = this.dataFromParent.listCampus;
  }

  getListUsers() {
    this.isLoading = true;
    this.roleService
      .getListUserToAssignRole(
        this.keyword,
        this.pageSize,
        this.pageIndex,
        this.dataFromParent.roleId
      )
      .subscribe(
        (res: any) => {
          if (res.status == 1) {
            this.listUsers = res.data.data;
            this.listUsers.forEach((item) => {
              item['isChecked'] = false;
              this.listUserIdSubmit.findIndex((el) => el == item.id) != -1
                ? (item.isChecked = true)
                : (item.isChecked = false);
            });
            this.isCheckAll =
              this.listUsers.length > 0 &&
              this.listUsers.every((t) => t.isChecked);
            this.collectionSize = res.data?.totalItems;
          } else {
            this.showMessage.error(res.msg);
          }
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
        }
      );
  }

  checkedAll(event) {
    this.listUsers.forEach((item) => {
      item.isChecked = event;
      if (event) {
        this.listUserIdSubmit.push(item.id);
      } else {
        let key = this.listUserIdSubmit.findIndex((i) => i === item.id);
        if (key != -1) {
          this.listUserIdSubmit.splice(key, 1);
        }
      }
    });
    this.isCheckAll = event;
  }

  checked(event, valueChecked: any) {
    let index = this.listUsers.findIndex((el) => valueChecked.id === el.id);
    if (index != -1) {
      this.listUsers[index].status = event;
      this.isCheckAll =
        this.listUsers.length > 0 && this.listUsers.every((t) => t.status);
      if (event) {
        this.listUserIdSubmit.push(valueChecked.id);
      } else {
        let key = this.listUserIdSubmit.findIndex((i) => i === valueChecked.id);
        if (key != -1) {
          this.listUserIdSubmit.splice(key, 1);
        }
      }
    }
  }

  submit() {
    let dataInput = {
      roleId: this.dataFromParent.roleId,
      userIds: this.listUserIdSubmit,
      campusId: this.campusId || null,
      schoolId: this.schoolId || null,
    };
    if (
      (this.dataFromParent.layoutCode == 'teacher' ||
        this.dataFromParent.layoutCode == 'staff') &&
      this.schoolId == null
    )
      return this.showMessage.warning(translate('role.warmingSelectSchool'));
    if (this.dataFromParent.layoutCode == 'campus' && this.campusId == null)
      return this.showMessage.warning(translate('role.warmingSelectCampus'));
    this.isLoading = true;
    this.listenFireBase(
      this.dataFromParent.keyFirebaseAction,
      this.dataFromParent.keyFirebaseModule
    );
    this.dataFromParent.apiSubmit(dataInput).subscribe(
      (res: any) => {
        if (res.status == 0) {
          this.isLoading = false;
          this.activeModal.close(false);
          this.showMessage.error(res.msg);
        }
      },
      (err: any) => {
        this.isLoading = false;
        this.showMessage.error(MESSAGE_ERROR_CALL_API);
      }
    );
  }

  mapNameLayout() {
    return (
      LAYOUTS_TENANT.find((layout) => layout.code == this.dataFromParent?.layoutCode)
        ?.name || '--'
    );
  }

  search(event, value: string) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      this.pageIndex = 1;
      this.keyword = value.trim();
      this.getListUsers();
    }
  }

  paginationChange(event: any) {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getListUsers();
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  listenFireBase(action: string, module: string) {
    const timeId = setTimeout(() => {
      this.isLoading = false;
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>) => {
      this.listenFirebaseService.checkFireBase(action, module, subscriber);
    });
    listenFb.subscribe((ref) => {
      if (ref.status === true) {
        clearTimeout(timeId);
        this.isLoading = false;
        this.activeModal.close(true);
      } else {
        this.isLoading = false;
      }
    });
  }
}
