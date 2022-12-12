import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { Observable, Subscriber } from 'rxjs';
import { GeneralService } from 'src/app/_services/general.service';
import { RoleService } from 'src/app/_services/layout-tenant/role/role.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import {
  LAYOUTS_TENANT, PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT,
  STATUS_ACTIVE,
  TIME_OUT_LISTEN_FIREBASE
} from 'src/app/_shared/utils/constant';
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
    private listenFirebaseService: ListenFirebaseService,
    private generalService: GeneralService
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
          this.oldPageIndex = this.pageIndex;
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
          this.generalService.showToastMessageError400(err);
        }
      );
  }

  checkedAll(event: boolean) {
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
    this.listUserIdSubmit = Array.from(new Set(this.listUserIdSubmit));
    this.isCheckAll = event;
  }

  checked(event:boolean, valueChecked: any) {
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
        this.dataFromParent.layoutCode == 'staff' || this.dataFromParent.layoutCode == 'student') &&
      this.schoolId == null
    )
      return this.showMessage.warning(translate('role.warmingSelectSchool'));
    if (this.dataFromParent.layoutCode == 'campus' && this.campusId == null)
      return this.showMessage.warning(translate('role.warmingSelectCampus'));
    if (this.listUserIdSubmit.length == 0)
      return this.showMessage.warning(translate('role.warmingSelectUser'));
    this.isLoading = true;
    this.listenFireBase(
      this.dataFromParent.keyFirebaseAction,
      this.dataFromParent.keyFirebaseModule
    );
    this.dataFromParent.apiSubmit(dataInput).subscribe(
      (res: any) => {},
      (err: any) => {
        this.isLoading = false;
      }
    );
  }

  mapNameLayout() {
    return (
      LAYOUTS_TENANT.find((layout) => layout.code == this.dataFromParent?.layoutCode)
        ?.name || '--'
    );
  }

  mapNameStatus(value: number) {
    return STATUS_ACTIVE.find((status) => status.value == value)?.label || '--';
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
    this.getListUsers();
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
