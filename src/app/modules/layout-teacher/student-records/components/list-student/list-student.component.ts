import { Component, OnInit } from '@angular/core';
import { CategoryStudentRecordsTeacherService } from 'src/app/_services/layout-teacher/category-student-records-teacher/category-student-records-teacher.service';
import { StudentRecordsTeacherService } from 'src/app/_services/layout-teacher/student-records/student-records.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { AVATAR_DEFAULT, DATA_PERMISSION, GENDER, MESSAGE_ERROR_CALL_API, PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT } from 'src/app/_shared/utils/constant';

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
    private showMessage: ShowMessageService,
    private categoryStudentRecordsTeacherService: CategoryStudentRecordsTeacherService
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
          if (res.status == 1) {
            this.arrList = res.data.data;
            this.collectionSize = res.data?.totalItems;
            this.arrList.forEach((element: any) => {
              element['genderName'] =
                this.arrGender.find(
                  (gender) => gender.id == element.gender
                )?.name || '--';
            });
          } else {
            this.showMessage.error(res.msg);
          }
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
        }
      );
  }

  getListClasses() {
    this.studentRecordsTeacherService
      .getListClasses('', 9999999, 1)
      .subscribe(
        (res: any) => {
          if (res.status == 1) {
            this.arrClasses = res.data.data;
          } else {
            this.showMessage.error(res.msg);
          }
        },
        (err: any) => this.showMessage.error(MESSAGE_ERROR_CALL_API)
      );
  }

  import() {return;}

  search(event, value: string) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      this.pageIndex = 1;
      this.oldPageIndex = this.pageIndex;
      this.keyword = value.trim();
      this.getList();
    }
  }

  filter() {
    this.pageIndex = 1;
    this.oldPageIndex = this.pageIndex;
    this.getList();
  }

  paginationChange(event: any) {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getList();
  }

}
