import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/_services/general.service';
import { StudentRecordsTeacherService } from 'src/app/_services/layout-teacher/student-records/student-records.service';
import { AVATAR_DEFAULT, DATA_PERMISSION, GENDER, PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-list-student-teacher',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss', '../../helper.scss']
})
export class ListStudentComponent implements OnInit {

  keyword = '';
  arrList: any = [];
  pageIndex = PAGE_INDEX_DEFAULT; // Trang hiện tại
  pageSize = PAGE_SIZE_DEFAULT; // Số bản ghi trong 1 trang
  collectionSize = 0; // Tổng số lượng bản ghi
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT; // Thay đổi pageSize
  isLoading = false;
  permission = DATA_PERMISSION;
  arrClasses = [];
  classId= '';
  arrGender = GENDER;
  gender = '';
  avatarDefault = AVATAR_DEFAULT;
  oldPageIndex = this.pageIndex;

  constructor(
    private studentRecordsTeacherService: StudentRecordsTeacherService,
    private generalService: GeneralService
  ) {}

  ngOnInit(): void {
    this.getListClasses();
    this.getList();
  }

  getList() {
    this.isLoading = true;
    this.studentRecordsTeacherService
      .getListStudent(
        this.classId,
        this.keyword,
        this.pageSize,
        this.pageIndex
      )
      .subscribe(
        (res: any) => {
          this.arrList = res.data.data;
          this.collectionSize = res.data?.totalItems;
          this.arrList.forEach((element: any) => {
            element['genderName'] =
              this.arrGender.find(
                (gender) => gender.id == element.gender
              )?.name || '--';
          });
          this.oldPageIndex = this.pageIndex;
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
          this.generalService.showToastMessageError400(err);
        }
      );
  }

  getListClasses() {
    this.isLoading = true;
    this.studentRecordsTeacherService
      .getListClasses('', 9999999, 1)
      .subscribe(
        (res: any) => {
          this.arrClasses = res.data.data;
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
          this.generalService.showToastMessageError400(err);
        }
      );
  }

  import() {return;}

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
