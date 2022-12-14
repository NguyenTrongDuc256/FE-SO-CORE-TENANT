import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {School} from 'src/app/_models/layout-tenant/school/school.model';
import {SchoolService} from 'src/app/_services/layout-tenant/school/school.service';
import {ShowMessageService} from 'src/app/_services/show-message.service';
import {
  DATA_PERMISSION,
  PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT
} from 'src/app/_shared/utils/constant';
import {GeneralService} from "../../../../../_services/general.service";

@Component({
  selector: 'app-list-school-tenant',
  templateUrl: './list-school-tenant.component.html',
  styleUrls: ['./list-school-tenant.component.scss', '../../helper.scss']
})
export class ListSchoolTenantComponent implements OnInit {

  keyword = '';
  arrList: Array<School> = [];
  pageIndex = PAGE_INDEX_DEFAULT; // Trang hiện tại
  pageSize = PAGE_SIZE_DEFAULT; // Số bản ghi trong 1 trang
  collectionSize = 0; // Tổng số lượng bản ghi
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT; // Thay đổi pageSize
  isLoading = false;
  permission = DATA_PERMISSION;
  oldPageIndex = this.pageIndex;

  constructor(
    private schoolService: SchoolService,
    private showMessage: ShowMessageService,
    private router: Router,
    private generalService: GeneralService
  ) {
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.isLoading = true;
    this.schoolService
      .getList(this.keyword, this.pageIndex, this.pageSize)
      .subscribe(
        (res: any) => {
          this.arrList = res.data.data;
          this.collectionSize = res.data?.totalItems;
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
          this.generalService.showToastMessageError400(err);
        }
      );
  }

  update(id: string) {
    this.router.navigate(['tenant/school/detail/' + id + '/update']);
  }

  viewList(id: string) {
    this.router.navigate([`tenant/school/detail/${id}/diem-truong`], {queryParams: {tab: 5}});
  }

  sendNoti(id: string) {
    // gửi thông báo
    return;
  }

  moveStudent(id: string) {
    // di chuyển học sinh
    return;
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
    this.oldPageIndex = this.pageIndex;
    this.keyword = value.trim();
    this.getList();
  }

  paginationChange(event: any) {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getList();
  }
}
