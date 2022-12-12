import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DATA_PERMISSION } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-class-detail-teacher',
  templateUrl: './class-detail-teacher.component.html',
  styleUrls: ['./class-detail-teacher.component.scss']
})
export class ClassDetailTeacherComponent implements OnInit {

  homeroomClassId: string;
  tabActive: string = 'absent';
  subtab?: any;
  permission = DATA_PERMISSION;
  infomationCourse:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
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