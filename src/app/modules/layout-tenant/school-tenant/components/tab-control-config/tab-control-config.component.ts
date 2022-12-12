import { TAB_SCHOOL } from './../../constant';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SUB_TAB_CONFIG_SCHOOL } from '../../constant';

@Component({
  selector: 'app-tab-control-config',
  templateUrl: './tab-control-config.component.html',
  styleUrls: ['./tab-control-config.component.scss']
})
export class TabControlConfigComponent implements OnInit {

  tabActive = Number(SUB_TAB_CONFIG_SCHOOL.SUBJECT);
  listTab = SUB_TAB_CONFIG_SCHOOL;
  parentTabActive: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(res => {
      this.parentTabActive = res.tab || TAB_SCHOOL.TAB_CONFIG;
      this.tabActive = Number(res.sub_tab) ? Number(res.sub_tab) : Number(SUB_TAB_CONFIG_SCHOOL.SUBJECT);
    })
  }

  activeTab(value: string){
    this.tabActive = +value;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        tab: this.parentTabActive,
        sub_tab: this.tabActive
      },
      queryParamsHandling: 'merge'
    })
  }

}
