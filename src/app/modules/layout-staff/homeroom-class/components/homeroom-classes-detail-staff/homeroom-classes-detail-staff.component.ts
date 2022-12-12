import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/_services/general.service';
import { TrainingService } from 'src/app/_services/layout-staff/training/training.service';
import { DATA_PERMISSION } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-homeroom-classes-detail-staff',
  templateUrl: './homeroom-classes-detail-staff.component.html',
  styleUrls: ['./homeroom-classes-detail-staff.component.scss']
})
export class HomeroomClassesDetailStaffComponent implements OnInit {

  homeroomClassId: string;
  tabActive: string = 'absent';
  subtab?: any;
  permission = DATA_PERMISSION;
  infomationHomeroomClass: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private trainingService: TrainingService,
    private generalService: GeneralService
  ) { }

  ngOnInit() {
    this.homeroomClassId = this.activatedRoute.snapshot.params.id;
    if (this.homeroomClassId) {
      this.getDataHomeroomClass();
    }
    this.activatedRoute.queryParams.subscribe(el => {
      this.subtab = el.subtab
      if (el.tab) {
        this.tabActive = el.tab;
      } else {
        this.tabActive = 'absent';
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {
            tab: 'absent'
          },
          queryParamsHandling: 'merge'
        });
      }
    })
  }

  getDataHomeroomClass() {
    this.trainingService.getInfoBasicHomeroomClass(this.homeroomClassId).subscribe((res: any) => {
      this.infomationHomeroomClass = res.data;
    }, (_err) => {
      this.generalService.showToastMessageError400(_err);
    })
  }

  activeTab(value: string) {
    this.tabActive = value;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        tab: value,
        subtab: null,
        userid: null
      },
      queryParamsHandling: 'merge'
    });

  }
}
