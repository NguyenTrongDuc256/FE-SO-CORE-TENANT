import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchoolService } from 'src/app/_services/layout-tenant/school/school.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { DATA_PERMISSION } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-tab-grade-school-tenant',
  templateUrl: './tab-grade-school-tenant.component.html',
  styleUrls: ['./tab-grade-school-tenant.component.scss', '../../helper.scss']
})
export class TabGradeSchoolTenantComponent implements OnInit {

  keyword = '';
  arrList = [];
  isLoading = false;
  permission = DATA_PERMISSION;
  schoolId: string;

  constructor(
    private schoolService: SchoolService,
    private showMessage: ShowMessageService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      this.schoolId = res.id;
      this.getList();
    });
  }

  getList() {
    this.isLoading = true;
    this.schoolService
      .getListGrade(this.schoolId, this.keyword)
      .subscribe(
        (res: any) => {
          if (res.status == 1) {
            this.arrList = res.data;
            this.isLoading = false;
          } else {
            this.isLoading = false;
            this.showMessage.error(res.msg);
          }
        },
        (err) => {
          this.isLoading = false;
          this.showMessage.error(err.msg);
        }
      );
  }

  search(event: any, value: string) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      this.keyword = value.trim();
      this.getList();
    }
  }

  filter() {
    this.getList();
  }
}
