import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscriber } from 'rxjs';
import { GeneralService } from 'src/app/_services/general.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-assign-student-course',
  templateUrl: './assign-student.component.html',
  styleUrls: ['./assign-student.component.scss', '../../helper.scss']
})
export class AssignStudentCourseComponent implements OnInit {

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
  arrGrades = localStorage.getItem('dataConfigSystem') ? JSON.parse(localStorage.getItem('dataConfigSystem')).grades : [];
  arrHomeroomClass = [];
  gradeId = '';
  homeroomClassId = '';

  constructor(
    public activeModal: NgbActiveModal,
    private listenFirebaseService: ListenFirebaseService,
    private generalService: GeneralService
  ) {}

  ngOnInit(): void {
    this.dataFromParent = this.dataModal.dataFromParent;
    this.listUsers = this.dataFromParent.listUsers;
    this.collectionSize = this.dataFromParent.collectionSize;
    this.getListHomeroomClasses();
  }

  getListUsers() {
    this.isLoading = true;
    this.dataFromParent.service.
    getListStudentToAssignCourse(this.dataFromParent.infoClass.id, this.pageIndex, this.pageSize, this.keyword, this.gradeId, this.homeroomClassId)
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

  getListHomeroomClasses() {
    this.dataFromParent.service
      .getListHomeroomClasses('', '', '', '', '', PAGE_INDEX_DEFAULT, 99999)
      .subscribe(
        (res: any) => {
          this.arrHomeroomClass = res.data.data;
        }, err => {
          this.isLoading = false;
          this.generalService.showToastMessageError400(err);
        })
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

  checked(event: boolean, valueChecked: any) {
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
      id: this.dataFromParent.infoClass.id,
      userIds: this.listUserIdSubmit,
    };
    this.isLoading = true;
    this.listenFireBase(
      this.dataFromParent.keyFirebaseAction,
      this.dataFromParent.keyFirebaseModule
    );
    this.dataFromParent.apiSubmit(dataInput).subscribe(
      (res: any) => {},
      (err: any) => {
        this.isLoading = false;
        let usersErr = err?.errors?.userIds;
        let indexErr = [];
        usersErr.forEach(id => {
          let index = this.listUsers.findIndex((user) => user.id == id);
          if(index != -1) {
            indexErr.push({
              index: index,
              name: this.listUsers[index]?.name
            });
          }
        })
        console.log(indexErr);


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
