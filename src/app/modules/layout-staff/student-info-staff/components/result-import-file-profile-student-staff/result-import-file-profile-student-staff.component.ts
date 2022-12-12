import { Component, OnInit } from '@angular/core';
import {
  ARR_STATUS_IMPORT_FILE,
  DATA_PERMISSION, MESSAGE_ERROR_CALL_API,
  PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT, TIME_OUT_LISTEN_FIREBASE
} from "../../../../../_shared/utils/constant";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
  StudentRecordsStaffService
} from "../../../../../_services/layout-staff/student-records-staff/student-records-staff.service";
import {ShowMessageService} from "../../../../../_services/show-message.service";

import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscriber} from "rxjs";
import {ListenFirebaseService} from "../../../../../_services/listen-firebase.service";
import {
  ModalImportProfileStudentStaffComponent
} from "../../modals/modal-import-profile-student-staff/modal-import-profile-student-staff.component";

@Component({
  selector: 'app-result-import-file-profile-student-staff',
  templateUrl: './result-import-file-profile-student-staff.component.html',
  styleUrls: ['./result-import-file-profile-student-staff.component.scss']
})
export class ResultImportFileProfileStudentStaffComponent implements OnInit {
  dataSource: any = [];
  pageIndex = PAGE_INDEX_DEFAULT; // Trang hiện tại
  pageSize = PAGE_SIZE_DEFAULT; // Số bản ghi trong 1 trang
  collectionSize = 0; // Tổng số lượng bản ghi
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT; // Thay đổi pageSize
  isLoading = false;
  permission = DATA_PERMISSION;
  arrStatus = ARR_STATUS_IMPORT_FILE;
  statusRecords: number|'' = '';
  fileName: string = '';
  file: any = null;
  sessionId: any = null;
  keyword = '';
  numberError: Number = 0;

  constructor(
    private modalService: NgbModal,
    private studentRecordsStaffService: StudentRecordsStaffService,
    private showMessageService: ShowMessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private listenFirebaseService: ListenFirebaseService,
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params && this.activatedRoute.snapshot.queryParams){
      this.sessionId = this.activatedRoute.snapshot.params.id;
      this.fileName = this.activatedRoute.snapshot.queryParams.nameFile;
      this.getList();
    }
    else{
      this.router.navigate([`staff/profile-student/manager-profile`]);
    }
  }

  getList() {
    this.isLoading = true;
    this.studentRecordsStaffService
    .getListResultImportFile(this.sessionId, this.keyword, this.statusRecords, this.pageSize, this.pageIndex)
    .subscribe(
      (res: any) => {
        if (res.status == 1) {
          this.dataSource = res.data.data;
          this.collectionSize = res.data?.totalItems;
          this.numberError = this.collectionSize > 0 ? this.dataSource[0].numberError : 0;
          this.isLoading = false;
        } else {
          // this.router.navigate([`staff/profile-student/manager-profile`]);
          this.showMessageService.error(res.msg);
        }
        this.isLoading = false;
      },
      (err: any) => {
        // this.router.navigate([`staff/profile-student/manager-profile`]);
        this.isLoading = false;
      }
    );
  }

  onClickSearch(valueSearch) {
    this.keyword = valueSearch;
    this.getList();
  }

  onEventKeyupEnter(valueSearch) {
    this.keyword = valueSearch;
    this.getList();
  }

  filter() {
    this.getList();
  }

  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getList();
  }

  onFileChange(event) {
    const file = event.target.files[0];
    if (event.target.files.length > 0) {
      if (event.target.files[0].name.slice(-5) == '.xlsx' || event.target.files[0].name.slice(-4) == '.xls') {
        this.fileName = event.target.files[0].name;
        this.file = file;
      } else {
        this.showMessageService.warning('Không đúng định dạng file')
      }
    }
  }

  uploadFile() {
    document.getElementById('input-file-upload-hoc-sinh').click();
  }

  import(){
    const modalRef = this.modalService.open(ModalImportProfileStudentStaffComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: true,
        size: 'xl'
      });
    modalRef.result.then((result) => {
      if (result) {
        this.sessionId = result.sessionId;
        this.getList();
      }
    }, (reason) => {
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    // formValue.
    const dataInput: any = {
      sessionId: this.sessionId
    }
    this.listenFireBase('create', 'file-user');
    this.studentRecordsStaffService.saveListResultImportFile(dataInput).subscribe((res: any) => {
      if (res.status == 0 && res.status != undefined) {
        this.isLoading = false;
        this.showMessageService.error(res.msg);
      }
    }, (_err: any) => {
      this.isLoading = false;
    })
  }

  listenFireBase(action: string, module: string): void {
    setTimeout(() => {
      if (this.isLoading === true) {
        this.isLoading = false;
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>): void => {
      this.listenFirebaseService.checkFireBase(action, module, subscriber);
    });
    listenFb.subscribe((ref) => {
      if (ref.status) {
        this.isLoading = false;
        this.router.navigate([`staff/profile-student/manager-profile`]);
      } else {
        this.isLoading = false;
      }
    });
  }

  clickCancel(){
    this.router.navigate([`staff/profile-student/manager-profile`]);
  }

}
