import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-detail-tenant',
  templateUrl: './student-detail-tenant.component.html',
  styleUrls: ['./student-detail-tenant.component.scss']
})
export class StudentDetailTenantComponent implements OnInit {
  studentId: string;
  tabActive: string = 'student-detail';
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit() {
    this.studentId = this.activatedRoute.snapshot.params.studentId;
    this.activatedRoute.queryParams.subscribe(el => {
      if (el.tab) {
        this.tabActive = el.tab;
      } else {
        this.tabActive = 'student-detail';
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {
            tab: 'student-detail'
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
        tab: value
      },
      queryParamsHandling: 'merge'
    });
  }


}
