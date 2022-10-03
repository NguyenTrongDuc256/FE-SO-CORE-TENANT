import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DATA_PERMISSION } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-student-detail-staff',
  templateUrl: './student-detail-staff.component.html',
  styleUrls: ['./student-detail-staff.component.scss']
})
export class StudentDetailStaffComponent implements OnInit {

  studentId: string ='e98c5a2f-84d0-43fb-beeb-39f5f758b610';
  tab: number;
  permission = DATA_PERMISSION;

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
