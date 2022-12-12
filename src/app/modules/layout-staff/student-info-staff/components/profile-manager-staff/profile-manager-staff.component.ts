import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { GeneralService } from 'src/app/_services/general.service';
import { Student } from "../../../../../_models/layout-staff/student-profile/student-profile.model";
import {
  StudentRecordsStaffService
} from "../../../../../_services/layout-staff/student-records-staff/student-records-staff.service";
import {
  AVATAR_DEFAULT,
  DATA_PERMISSION, GENDER, PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT
} from "../../../../../_shared/utils/constant";
import {
  ModalImportProfileStudentStaffComponent
} from "../../modals/modal-import-profile-student-staff/modal-import-profile-student-staff.component";


@Component({
  selector: 'app-profile-manager-staff',
  templateUrl: './profile-manager-staff.component.html',
  styleUrls: ['./profile-manager-staff.component.scss']
})
export class ProfileManagerStaffComponent implements OnInit {
  avatar: string = AVATAR_DEFAULT;
  permission = DATA_PERMISSION;
  collectionSize: number = 0;
  sizeOption: number[] = PAGE_SIZE_OPTIONS_DEFAULT;
  pageIndex: number = PAGE_INDEX_DEFAULT;
  pageSize: number = PAGE_SIZE_DEFAULT;
  keyWord: string = '';
  isLoading: boolean = false;
  valueDefaultClass: string = '';
  dataSource?: Partial<Student>[];
  classList: any[] = [];
  arrGender = GENDER;
  oldPageIndex = this.pageIndex;

  constructor(
    private modalService: NgbModal,
    private studentRecordsStaffService: StudentRecordsStaffService,
    private generalService: GeneralService
  ) {
  }

  ngOnInit(): void {
    this.getDataGeneralList();
    this.getDataStudent();
  }

  getDataStudent() {
    this.isLoading = true;
    this.studentRecordsStaffService.getListStudentOfRecords(this.valueDefaultClass, this.keyWord, this.pageSize, this.pageIndex).subscribe((res: any) => {
      this.collectionSize = res.data.totalItems;
      this.dataSource = res.data.data;
      this.dataSource.forEach(item => {
        item.genderName = this.getGenderName(item.gender)
      })
      this.oldPageIndex = this.pageIndex;
      this.isLoading = false;
    }, (_err: any) => {
      this.isLoading = false;
      this.generalService.showToastMessageError400(_err);
    });
  }

  getDataGeneralList() {
    this.isLoading = true;
    this.studentRecordsStaffService.getListClass().subscribe((res: any): void => {
      this.classList = res.data.data;
      this.isLoading = false;
    }, (_err: any) => {
      this.isLoading = false;
      this.generalService.showToastMessageError400(_err);
    });
  }

  onChangeSelect() {
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.getDataStudent();
  }

  paginationChange(event: any) {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getDataStudent();
  }

  onClickSearch(valueSearch) {
    this.keyWord = valueSearch;
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.getDataStudent();
  }

  search(event, value: string) {
    if (event.key === 'Enter') {
      this.pageIndex = PAGE_INDEX_DEFAULT;
      this.keyWord = value.trim();
      this.getDataStudent();
    }
  }

  getGenderName(value: number): string {
    if (value === GENDER[0].id)
      return 'genderName.male';
    else if (value === GENDER[1].id)
      return 'genderName.female';
    else
      return 'genderName.other';
  }

  import() {
    const modalRef = this.modalService.open(ModalImportProfileStudentStaffComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: true,
        size: 'xl'
      });
  }

}
