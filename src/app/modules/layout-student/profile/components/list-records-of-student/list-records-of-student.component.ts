import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/_services/general.service';
import { ProfileService } from 'src/app/_services/layout-student/profile/profile.service';
import { ARR_STATUS_STUDENT_RECORDS, AVATAR_DEFAULT, DATA_PERMISSION, PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT, STATUS_STUDENT_RECORDS } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-list-records-of-student',
  templateUrl: './list-records-of-student.component.html',
  styleUrls: ['./list-records-of-student.component.scss']
})
export class ListRecordsOfStudentComponent implements OnInit {

  keyword = '';
  arrList: any = [];
  pageIndex = PAGE_INDEX_DEFAULT; // Trang hiện tại
  pageSize = PAGE_SIZE_DEFAULT; // Số bản ghi trong 1 trang
  collectionSize = 0; // Tổng số lượng bản ghi
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT; // Thay đổi pageSize
  isLoading = false;
  permission = DATA_PERMISSION;
  arrCategories = [];
  cateId = '';
  arrStatus = ARR_STATUS_STUDENT_RECORDS;
  statusRecords = '';
  studentUserId = JSON.parse(localStorage.getItem('User')).Id;
  avatarDefault = AVATAR_DEFAULT;
  infoUser: any;
  constStatusRecords = STATUS_STUDENT_RECORDS;
  oldPageIndex = this.pageIndex;

  constructor(
    private profileService: ProfileService,
    private generalService: GeneralService
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.isLoading = true;
    this.profileService
      .getListRecordsOfStudent(
        this.studentUserId,
        this.keyword,
        this.pageSize,
        this.pageIndex
      )
      .subscribe(
        (res: any) => {
          this.infoUser = res.data;
          this.arrList = res.data.fileUsers.data;
          this.collectionSize = res.data?.fileUsers?.totalItems;
          this.oldPageIndex = this.pageIndex;
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
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.keyword = value.trim();
    this.getList();
  }

  filter() {
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.getList();
  }

  paginationChange(event: any) {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getList();
  }

}
