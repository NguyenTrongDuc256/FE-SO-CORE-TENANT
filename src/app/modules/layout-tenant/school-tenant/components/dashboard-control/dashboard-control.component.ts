import {TAB_SCHOOL} from './../../constant';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShareDataUsingService} from 'src/app/_services/share-data.service';
import {SchoolService} from 'src/app/_services/layout-tenant/school/school.service';
import {ShowMessageService} from 'src/app/_services/show-message.service';
import {GeneralService} from "../../../../../_services/general.service";

@Component({
  selector: 'app-dashboard-control',
  templateUrl: './dashboard-control.component.html',
  styleUrls: ['./dashboard-control.component.scss', '../../helper.scss']
})
export class DashboardControlComponent implements OnInit {

  schoolId: string;
  infoSchool: any;
  tabActive: string;
  keyTab = TAB_SCHOOL;
  isLoading = false;
  dataSchoolToMap: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private shareDataUsingService: ShareDataUsingService,
    private router: Router,
    private schoolService: SchoolService,
    private showMessage: ShowMessageService,
    private generalService: GeneralService,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(res => {
      this.tabActive = res.tab ? res.tab : TAB_SCHOOL.TAB_INFO;
      this.schoolId = this.activatedRoute.snapshot.children[0].params.id;
      this.getDetail(this.schoolId);
    })
  }

  getDetail(id: string) {
    this.isLoading = true;
    this.schoolService.getDetail(id).subscribe(
      (res: any) => {
        this.infoSchool = res.data;
        let sendDataBasicSchool = {
          key: 'info-basic-school',
          value: {
            Id: this.infoSchool?.id,
            Name: this.infoSchool?.Name,
            IsActive: this.infoSchool?.IsActive,
            CityCode: this.infoSchool?.CityCode
          }
        };
        this.shareDataUsingService.updateApprovalMessage(sendDataBasicSchool);
        let sendDataSchool = {
          key: 'info-school',
          value: this.infoSchool
        };
        this.shareDataUsingService.updateApprovalMessage(sendDataSchool);
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      }
    );
  }

  getAnotherInfoToMapSchool() {
    this.isLoading = true;
    this.schoolService.getAnotherInfoToMapSchool().subscribe(
      (res: any) => {
        this.dataSchoolToMap = res.data;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  changeTab(tab: string) {
    switch (tab) {
      case '1':
        this.router.navigate(['tenant/school/detail/' + this.schoolId], {queryParams: {tab: tab}})
        break;
      case '2':
        this.router.navigate(['tenant/school/detail/' + this.schoolId + '/user'], {queryParams: {tab: tab}})
        break;
      case '3':
        this.router.navigate(['tenant/school/detail/' + this.schoolId + '/config'], {queryParams: {tab: tab}})
        break;
      case '4':
        this.router.navigate(['tenant/school/detail/' + this.schoolId + '/menu-package'], {queryParams: {tab: tab}})
        break;
      case '5':
        this.router.navigate(['tenant/school/detail/' + this.schoolId + '/diem-truong'], {queryParams: {tab: tab}})
        break;
    }
  }
}
