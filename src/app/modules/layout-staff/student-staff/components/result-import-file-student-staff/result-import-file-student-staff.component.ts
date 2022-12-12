import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscriber } from 'rxjs';
import { DataSearch } from 'src/app/_models/general.model';
import { GeneralService } from 'src/app/_services/general.service';
import { StudentStaffService } from 'src/app/_services/layout-staff/student/student-staff.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ARR_STATUS_IMPORT_FILE, DATA_PERMISSION, MESSAGE_ERROR_CALL_API, PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';
import { ModalImportStudentStaffComponent } from '../../modals/modal-import-student-staff/modal-import-student-staff.component';

@Component({
  selector: 'app-result-import-file-student-staff',
  templateUrl: './result-import-file-student-staff.component.html',
  styleUrls: ['./result-import-file-student-staff.component.scss']
})
export class ResultImportFileStudentStaffComponent implements OnInit {
  dataSource: any = [];
  pageIndex = PAGE_INDEX_DEFAULT; // Trang hiện tại
  pageSize = PAGE_SIZE_DEFAULT; // Số bản ghi trong 1 trang
  collectionSize = 0; // Tổng số lượng bản ghi
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT; // Thay đổi pageSize
  isLoading = false;
  permission = DATA_PERMISSION;
  arrStatus = ARR_STATUS_IMPORT_FILE;
  fileName: string = '';
  file: any = null;
  keyImport: any = null;
  keyword = '';
  numberError: number = 0;
  dataItem: any = [];
  statusRecord: 0 | 1 | '' = '';

  constructor(
    private modalService: NgbModal,
    private studentStaffService: StudentStaffService,
    private showMessageService: ShowMessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private listenFirebaseService: ListenFirebaseService,
    private generalService: GeneralService,

  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params && this.activatedRoute.snapshot.queryParams) {
      this.keyImport = this.activatedRoute.snapshot.params.id;
      this.fileName = this.activatedRoute.snapshot.queryParams.nameFile;
      this.getList();
    }
    else {
      this.router.navigate([`staff/student`]);
    }
  }

  getList() {
    this.isLoading = true;
    this.studentStaffService
      .getListResultImportFile(this.keyImport)
      .subscribe(
        (res: any) => {
          this.dataSource = res.data.rows;
          this.filterAndPaginate();
          this.isLoading = false;
        },
        (err: any) => {
          this.router.navigate([`staff/student`]);
          this.isLoading = false;
        }
      );
  }

  onSearch(valueSearch) {
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.keyword = valueSearch;
    this.filterAndPaginate();
  }

  filter() {
    this.filterAndPaginate();
  }

  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.filterAndPaginate();
  }

  filterAndPaginate() {
    const dataSearch: DataSearch = { valueSearch: this.keyword, keySearch1: 'fullname', keySearch2: 'code' }
    let result = this.generalService.filterAndPaginate(this.dataSource, this.pageIndex, this.pageSize, dataSearch, this.statusRecord);
    this.collectionSize = result.totalItems;
    this.numberError = result.numberError;
    this.dataItem = result.data;
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

  import() {
    const modalRef = this.modalService.open(ModalImportStudentStaffComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: true,
        size: 'xl'
      });

    let data: any = {
      title: 'titleImport',
      isHiddenBtnClose: false, // hidden/show btn close modal
    }
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
    }, (reason) => {
    });

  }
  onSubmit(): void {
    this.isLoading = true;
    const dataInput = {
      keyImport: this.keyImport
    }
    this.listenFireBase('create', 'student');
    this.studentStaffService.saveListResultImportFile(dataInput).subscribe((res: any) => {
    }, (_err: any) => {
      this.isLoading = false;
      this.generalService.showToastMessageError400(_err);
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
        this.router.navigate([`staff/student`]);
      } else {
        this.isLoading = false;
      }
    });
  }

  clickCancel() {
    this.router.navigate([`staff/student`]);
  }

}
