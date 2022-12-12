import { Observable, Subscriber } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { LAYOUTS_TENANT, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import {GeneralService} from "../../../../../_services/general.service";

@Component({
  selector: 'app-assign-role-user-school-tenant',
  templateUrl: './assign-role-user.component.html',
  styleUrls: ['./assign-role-user.component.scss', '../../helper.scss'],
})
export class AssignRoleUserComponent implements OnInit {
  @Input() dataModal: any;
  dataFromParent: any;
  isLoading = false;
  keyword = '';
  listRoleToAssign = [];
  listRoleToAssignOriginal = [];
  listRolesUser = [];
  isCheckAll = false;
  listRoleIdSubmit = [];

  constructor(
    public activeModal: NgbActiveModal,
    private showMessage: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private generalService: GeneralService
  ) {}

  ngOnInit(): void {
    this.dataFromParent = this.dataModal.dataFromParent;
    this.listRolesUser = this.dataFromParent.arrList;
    this.listRoleToAssignOriginal = this.dataFromParent.arrListToAssign;
    this.listRoleToAssign = this.dataFromParent.arrListToAssign;
  }

  checkedAll(event: boolean) {
    this.listRoleIdSubmit = [];
    this.listRoleToAssign.forEach((item) => {
      item.isChecked = event;
      if (event) {
        this.listRoleIdSubmit.push(item.id);
      }
    });
    this.isCheckAll = event;
  }

  checked(event: boolean, valueChecked: any) {
    let index = this.listRoleToAssign.findIndex(
      (el) => valueChecked.id === el.id
    );
    if (index != -1) {
      this.listRoleToAssign[index].isChecked = event;
      this.isCheckAll =
        this.listRoleToAssign.length > 0 &&
        this.listRoleToAssign.every((t) => t.isChecked);
      if (event) {
        this.listRoleIdSubmit.push(valueChecked.id);
      } else {
        let key = this.listRoleIdSubmit.findIndex((i) => i === valueChecked.id);
        if (key != -1) {
          this.listRoleIdSubmit.splice(key, 1);
        }
      }
    }
  }

  submit() {
    this.isLoading = true;
    let dataInput = {
      userId: this.dataFromParent.userId,
      roles: [],
    };
    this.listRoleIdSubmit.forEach(item => dataInput.roles.push({
      roleId: item,
      schoolId: this.dataFromParent.schoolId
    }))
    this.listenFireBase(
      this.dataFromParent.keyFirebaseAction,
      this.dataFromParent.keyFirebaseModule
    );
    this.dataFromParent.apiSubmit(dataInput).subscribe(
      (res: any) => {
          this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      }
    );
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
      this.listRoleToAssign = this.listRoleToAssignOriginal.filter(
        (item) =>
          item.name.toLowerCase().includes(this.keyword.toLowerCase()) ||
          item.code.toLowerCase().includes(this.keyword.toLowerCase())
      );
  }

  mapNameLayout(layoutCode: string) {
    return LAYOUTS_TENANT.find((layout) => layout.code == layoutCode)?.name || '--';
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  listenFireBase(action: string, module: string, isContinue: boolean = false) {
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
        if (!isContinue) {
          this.activeModal.close(true);
        }
      } else {
        this.isLoading = false;
      }
    });
  }
}
