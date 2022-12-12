import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-control-assign-teacher',
  templateUrl: './dashboard-control-assign-teacher.component.html',
  styleUrls: ['./dashboard-control-assign-teacher.component.scss']
})

export class DashboardControlAssignTeacherComponent implements OnInit {

  tabActive = TABS.TAB_HOMEROOM_TEACHER;
  tabs = TABS;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(el => {
      if (el.tab) {
        this.tabActive = el.tab;
      } else {
        this.tabActive = TABS.TAB_HOMEROOM_TEACHER;
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {
            tab: TABS.TAB_HOMEROOM_TEACHER
          },
          queryParamsHandling: 'merge'
        });
      }
    })
  }

  activeTab(value: number){
    this.tabActive = value;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        tab: value
      },
      queryParamsHandling: 'merge'
    });
  }

}

export enum TABS {TAB_HOMEROOM_TEACHER = 1, TAB_MAIN_HOMEROOM_TEACHER = 2}
