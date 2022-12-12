import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DATA_PERMISSION} from "../../../../../_shared/utils/constant";

@Component({
  selector: 'app-tab-scoring-behavior-index-staff',
  templateUrl: './tab-scoring-behavior-index-staff.component.html',
  styleUrls: ['./tab-scoring-behavior-index-staff.component.scss']
})
export class TabScoringBehaviorIndexStaffComponent implements OnInit {
  homeroomClassId: string = 'e98c5a2f-84d0-43fb-beeb-39f5f758b610';
  tabActive: string = 'absent';
  subtab?: any;
  permission = DATA_PERMISSION;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit() {
    this.homeroomClassId = this.activatedRoute.snapshot.params.id;
    this.activatedRoute.queryParams.subscribe(el => {
      this.subtab = el.subtab
      // console.log(this.subtab)
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
    // console.log(value)
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
