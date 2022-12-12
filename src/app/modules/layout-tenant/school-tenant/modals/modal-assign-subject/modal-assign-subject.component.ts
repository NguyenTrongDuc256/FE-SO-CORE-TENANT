import {translate} from '@ngneat/transloco';
import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subscriber} from 'rxjs';
import {ListenFirebaseService} from 'src/app/_services/listen-firebase.service';
import {ShowMessageService} from 'src/app/_services/show-message.service';
import {
  TIME_OUT_LISTEN_FIREBASE,
  ARR_TYPE_OF_SUBJECT,
} from 'src/app/_shared/utils/constant';
import {GeneralService} from "../../../../../_services/general.service";

@Component({
  selector: 'app-modal-assign-subject',
  templateUrl: './modal-assign-subject.component.html',
  styleUrls: ['./modal-assign-subject.component.scss', '../../helper.scss'],
})
export class ModalAssignSubjectComponent implements OnInit {
  isLoading = false;
  keyword = '';
  arrList = [];
  arrListOriginal = [];
  @Input() dataModal: any;
  dataFromParent: any;
  typeSubject: number = null;
  arrTypeSubjects = ARR_TYPE_OF_SUBJECT;
  isCheckAll = false;
  arrIdSubmit = [];
  tenantId: string = localStorage.getItem('Tenant') ? JSON.parse(localStorage.getItem('Tenant')).Id : null;

  constructor(
    public activeModal: NgbActiveModal,
    private listenFirebaseService: ListenFirebaseService,
    private showMessage: ShowMessageService,
    private modalService: NgbModal,
    private generalService: GeneralService

) {
  }

  ngOnInit(): void {
    this.dataFromParent = this.dataModal.dataFromParent;
    this.arrList = this.dataFromParent.arrList;
    this.arrListOriginal = this.dataFromParent.arrList;
    this.arrList.forEach((item) => {
      item['subjectTypeName'] = this.arrTypeSubjects.find(
        (i) => i.value == item.subjectType
      )?.label;
      item['isChecked'] = false;
    });
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
    this.getList();
  }

  filter() {
    this.getList();
  }

  checkedAll(event: boolean) {
    this.arrIdSubmit = [];
    this.arrList.forEach((item) => {
      item.isChecked = event;
      if (event) {
        this.arrIdSubmit.push(item.id);
      }
    });
    this.arrIdSubmit = Array.from(new Set(this.arrIdSubmit));
    this.isCheckAll = event;
  }

  checked(event: boolean, valueChecked: any) {
    let index = this.arrList.findIndex((el) => valueChecked.id === el.id);
    if (index != -1) {
      this.arrList[index].isChecked = event;
      this.isCheckAll =
        this.arrList.length > 0 && this.arrList.every((t) => t.isChecked);
      if (event) {
        this.arrIdSubmit.push(valueChecked.id);
      } else {
        let key = this.arrIdSubmit.findIndex((i) => i === valueChecked.id);
        if (key != -1) {
          this.arrIdSubmit.splice(key, 1);
        }
      }
    }
  }

  submit() {
    if (this.arrIdSubmit.length == 0) return this.showMessage.warning(translate('school.requiredSubject'));
    let dataInput = {
      schoolId: this.dataFromParent.schoolId,
      tenantId: this.tenantId,
      subjectId: this.arrIdSubmit,
    };
    this.isLoading = true;
    this.listenFireBase(this.dataFromParent.keyFirebaseAction, this.dataFromParent.keyFirebaseModule);
    this.dataFromParent.apiSubmit(this.dataFromParent.schoolId, dataInput).subscribe(
      (res: any) => {
        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      }
    );
  }

  getList() {
    this.isLoading = true;
    this.dataFromParent.apiGetList(this.dataFromParent.schoolId, this.typeSubject, this.keyword).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.arrList = res.data;
        this.arrList.forEach((item) => {
          item['subjectTypeName'] = this.arrTypeSubjects.find(
            (i) => i.value == item.subjectType
          )?.label;
          item['isChecked'] = false;
          this.arrIdSubmit.findIndex((el) => el == item.id) != -1
            ? (item.isChecked = true)
            : (item.isChecked = false);
        });
        this.isCheckAll =
          this.arrList.length > 0 &&
          this.arrList.every((t) => t.isChecked);
      },
      (err) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      }
    );
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
