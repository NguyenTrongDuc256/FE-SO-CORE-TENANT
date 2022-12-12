import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SchoolService} from 'src/app/_services/layout-tenant/school/school.service';
import {ShowMessageService} from 'src/app/_services/show-message.service';
import {DATA_PERMISSION} from 'src/app/_shared/utils/constant';
import {GeneralService} from "../../../../../_services/general.service";

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
    private generalService: GeneralService,
  ) {
  }

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
          this.arrList = res.data;
          this.isLoading = false;
        },
        (err) => {
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
    this.keyword = value.trim();
    this.getList();
  }

  filter() {
    this.getList();
  }
}
