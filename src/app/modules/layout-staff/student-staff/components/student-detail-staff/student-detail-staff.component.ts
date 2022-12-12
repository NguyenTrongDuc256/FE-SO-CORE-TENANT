import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DATA_PERMISSION } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-student-detail-staff',
  templateUrl: './student-detail-staff.component.html',
  styleUrls: ['./student-detail-staff.component.scss']
})
export class StudentDetailStaffComponent implements OnInit {

  studentId = '';
  studentUserId = '';
  tabActive: string = 'student-detail';
  permission = DATA_PERMISSION;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit() {
    this.studentId = this.activatedRoute.snapshot.params.studentId;
    this.studentUserId = this.activatedRoute.snapshot.queryParams.userId;
    this.activatedRoute.queryParams.subscribe(el => {
      if (el.tab) {
        this.tabActive = el.tab;
      } else {
        this.tabActive = 'student-detail';
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {
            tab: 'student-detail',
            userId: this.studentUserId
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
        userId: this.studentUserId
      },
      queryParamsHandling: 'merge'
    });
  }

}
