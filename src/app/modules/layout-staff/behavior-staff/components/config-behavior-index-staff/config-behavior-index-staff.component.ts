import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DATA_PERMISSION } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-config-behavior-index-staff',
  templateUrl: './config-behavior-index-staff.component.html',
  styleUrls: ['./config-behavior-index-staff.component.scss']
})
export class ConfigBehaviorIndexStaffComponent implements OnInit {
 
  tabActive:string = 'config-behavior';
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
 
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(el => {
      if (el.tab) {
        this.tabActive = el.tab;
      } else {
        this.tabActive = 'config-behavior';
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {
            tab: 'config-behavior'
          },
          queryParamsHandling: 'merge'
        });
      }
    })
  }
 
  activeTab(value:string){
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