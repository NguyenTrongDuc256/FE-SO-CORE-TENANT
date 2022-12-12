import {Component, OnInit} from '@angular/core';
import {
  ARR_STATUS_IMPORT_FILE,
  DATA_PERMISSION,
  MESSAGE_ERROR_CALL_API,
  PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT,
  TIME_OUT_LISTEN_FIREBASE
} from "../../../../../_shared/utils/constant";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ShowMessageService} from "../../../../../_services/show-message.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ListenFirebaseService} from "../../../../../_services/listen-firebase.service";
import {Observable, Subscriber} from "rxjs";
import {translate} from "@ngneat/transloco";
import {GeneralService} from "../../../../../_services/general.service";
import {DataSearch} from "src/app/_models/general.model";
import {
  ModalImportEmployeeTenantComponent
} from "../../modals/modal-import-employee-tenant/modal-import-employee-tenant.component";
import {EmployeeService} from "../../../../../_services/layout-tenant/employee/employee.service";
import {SchoolList} from "../../../../../_models/layout-tenant/school/school.model";

@Component({
  selector: 'app-result-import-employee-tenant',
  templateUrl: './result-import-employee-tenant.component.html',
  styleUrls: ['./result-import-employee-tenant.component.scss']
})
export class ResultImportEmployeeTenantComponent implements OnInit {
  isLoading: boolean = false;
  isSubmitForm: boolean = false;
  permission = DATA_PERMISSION;
  keyImport: string = '';
  schoolId: string = '';
  fileName: string = '';
  file: any = null;

  dataSource: any = [];
  dataItem: any = [];
  pageIndex = PAGE_INDEX_DEFAULT; // Trang hiện tại
  pageSize = PAGE_SIZE_DEFAULT; // Số bản ghi trong 1 trang
  collectionSize = 0; // Tổng số lượng bản ghi
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT; // Thay đổi pageSize

  arrStatus = ARR_STATUS_IMPORT_FILE;
  statusRecord: 0 | 1 | '' = '';
  schoolList: SchoolList[];
  nzNotFoundContent: string = 'employee.notFoundContent';
  keyword: string = '';
  numberError: number = 0;

  constructor(
    private modalService: NgbModal,
    private employeeService: EmployeeService,
    private showMessageService: ShowMessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private listenFirebaseService: ListenFirebaseService,
    private generalService: GeneralService,
  ) {
  }

  ngOnInit(): void {
    this.getSchoolList();
    if (this.activatedRoute.snapshot.params && this.activatedRoute.snapshot.queryParams
    ) {
      this.keyImport = this.activatedRoute.snapshot.params.id;
      this.schoolId = this.activatedRoute.snapshot.params.schoolId;
      this.fileName = this.activatedRoute.snapshot.queryParams.nameFile;
      this.getList();
    } else {
      this.router.navigate([`tenant/employee`]);
    }
  }

  getList() {
    this.isLoading = true;
    this.employeeService.getListResultImportFile(this.keyImport, this.schoolId).subscribe((res: any) => {
        if (res.data.hasError) {
          this.isSubmitForm = true;
        } else {
          this.isSubmitForm = false;
        }
        this.dataSource = res.data.rows;
        this.filterAndPaginate();
        this.isLoading = false;
      },
      (err: any) => {
        this.router.navigate([`employee`]);
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      }
    );
  }

  search(valueSearch) {
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.keyword = valueSearch;
    this.filterAndPaginate();
  }

  onChangeStatus() {
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.filterAndPaginate();
  }

  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.filterAndPaginate();
  }

  filterAndPaginate() {
    const dataSearch: DataSearch = {valueSearch: this.keyword, keySearch1: 'fullName', keySearch2: 'code'}
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
        this.showMessageService.warning(translate('errorFileExcel'))
      }
    }
  }

  clickCancel() {
    this.router.navigate([`tenant/employee`]);
  }

  import() {
    const modalRef = this.modalService.open(ModalImportEmployeeTenantComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: true,
        backdrop: 'static',
        size: 'xl',
      });

    let data: any = {
      title: 'titleImport',
      isHiddenBtnClose: false, // hidden/show btn close modal
      schoolList: this.schoolList
    }
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result != false) {
        this.keyImport = result.keyImport;
        this.schoolId = result.schoolId
        this.getList();
      }
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.isSubmitForm = true;
    let dataInput = {
      keyImport: this.keyImport,
      schoolId: this.schoolId
    }
    this.listenFireBase("import", "employee");
    this.employeeService.saveDataImport(dataInput).subscribe((res: any) => {
    }, (_err: any) => {
      this.isLoading = false;
      this.isSubmitForm = false;
      this.generalService.showToastMessageError400(_err);
    })
  }

  listenFireBase(action: string, module: string): void {
    setTimeout(() => {
      if (this.isLoading === true) {
        this.isLoading = false;
        this.isSubmitForm = false;
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>): void => {
      this.listenFirebaseService.checkFireBase(action, module, subscriber);
    });
    listenFb.subscribe((ref) => {
      if (ref.status) {
        this.isLoading = false;
        this.isSubmitForm = false;
        this.router.navigate([`tenant/employee`]);
      } else {
        this.isSubmitForm = false;
        this.isLoading = false;
      }
    });
  }

  getSchoolList() {
    this.isLoading = true;
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);

    this.employeeService.getSchoolList().subscribe(
      (res: any): void => {
      clearTimeout(timeoutCallAPI);
      this.schoolList = res.data;
      this.isLoading = false;
    }, (_err: any) => {
      clearTimeout(timeoutCallAPI);
      this.generalService.showToastMessageError400(_err);
      this.isLoading = false;
    });
  }
}
