import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-detail-tenant',
  templateUrl: './student-detail-tenant.component.html',
  styleUrls: ['./student-detail-tenant.component.scss']
})
export class StudentDetailTenantComponent implements OnInit {
  studentId: string;
  tab: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit() {
    this.studentId = this.activatedRoute.snapshot.params.studentId;
    this.activatedRoute.queryParams.subscribe(res => {
      if (res.tab) {
        this.tab = res.tab;
      } else {
        this.tab == 1;
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {
            tab: 1
          },
        });
      }
    })
  }

  changeTab(event: number) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        tab: event
      },
    });
  }
}
