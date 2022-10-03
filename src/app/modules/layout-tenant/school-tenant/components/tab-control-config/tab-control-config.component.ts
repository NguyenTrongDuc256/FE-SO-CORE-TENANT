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
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(res => {
      this.tabActive = Number(res.sub_tab) ? Number(res.sub_tab) : Number(SUB_TAB_CONFIG_SCHOOL.SUBJECT);
    })
  }

  changeTab(tab: number) {
    switch(tab.toString()) {
      case '0':
        this.router.navigate([], {queryParams: {sub_tab: tab}, queryParamsHandling: 'merge'})
      break;
      case '1':
        this.router.navigate([], {queryParams: {sub_tab: tab}, queryParamsHandling: 'merge'})
      break;
    }
  }

}
