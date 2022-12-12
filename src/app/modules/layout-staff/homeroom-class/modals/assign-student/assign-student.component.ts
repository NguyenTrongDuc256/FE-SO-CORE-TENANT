import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { Observable, Subscriber } from 'rxjs';
import { GeneralService } from 'src/app/_services/general.service';
import { TrainingService } from 'src/app/_services/layout-staff/training/training.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import {
  PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT,
  TIME_OUT_LISTEN_FIREBASE
} from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-assign-student-homeroom-class',
  templateUrl: './assign-student.component.html',
  styleUrls: ['./assign-student.component.scss', '../../helper.scss'],
})
export class AssignStudentHomeroomClassComponent implements OnInit {
  isLoading = false;
  classId = '';
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
  oldPageIndex = this.pageIndex;
  shoolYear = localStorage.getItem('currentNameSchoolYear') || '--';

  constructor(
    public activeModal: NgbActiveModal,
    private trainingService: TrainingService,
    private listenFirebaseService: ListenFirebaseService,
    private generalService: GeneralService,
    private showMessageService: ShowMessageService
  ) {}

  ngOnInit(): void {
    this.dataFromParent = this.dataModal.dataFromParent;
    this.classId = this.dataFromParent.infoClass.id;
    this.listUsers = this.dataFromParent.listUsers;
    this.collectionSize = this.dataFromParent.collectionSize;
  }

  getListUsers() {
    this.isLoading = true;
    this.trainingService
      .getListStudentToAssignHomeroomClass(
        this.classId,
        this.pageIndex,
        this.pageSize,
        this.keyword
      )
      .subscribe(
        (res: any) => {
          this.isLoading = false;
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
        },
        (err: any) => {
          this.isLoading = false;
          this.generalService.showToastMessageError400(err);
        }
      );
  }

  checkedAll(event) {
    this.listUsers.forEach((item) => {
      item.isChecked = event;
      if (event) {
        this.listUserIdSubmit.push(item.userId);
      } else {
        let key = this.listUserIdSubmit.findIndex((i) => i === item.userId);
        if (key != -1) {
          this.listUserIdSubmit.splice(key, 1);
        }
      }
    });
    this.listUserIdSubmit = Array.from(new Set(this.listUserIdSubmit));
    this.isCheckAll = event;
  }

  checked(event, valueChecked: any) {
    let index = this.listUsers.findIndex((el) => valueChecked.userId === el.userId);
    if (index != -1) {
      this.listUsers[index].status = event;
      this.isCheckAll =
        this.listUsers.length > 0 && this.listUsers.every((t) => t.status);
      if (event) {
        this.listUserIdSubmit.push(valueChecked.userId);
      } else {
        let key = this.listUserIdSubmit.findIndex((i) => i === valueChecked.userId);
        if (key != -1) {
          this.listUserIdSubmit.splice(key, 1);
        }
      }
    }
  }

  submit() {
    // if(this.listUserIdSubmit?.length == 0) return this.showMessageService.warning(translate('training.warmingSelectStudent'));
    let dataInput = {
      homeroomClassId: this.dataFromParent.infoClass.id,
      studentUserIds: this.listUserIdSubmit,
    };
    this.isLoading = true;
    this.listenFireBase(
      this.dataFromParent.keyFirebaseAction,
      this.dataFromParent.keyFirebaseModule
    );
    this.dataFromParent.apiSubmit(this.classId, dataInput).subscribe(
      (res: any) => {},
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
