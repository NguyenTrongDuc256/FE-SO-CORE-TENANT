import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DATA_PERMISSION } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-class-detail-course-teacher',
  templateUrl: './class-detail-course-teacher.component.html',
  styleUrls: ['./class-detail-course-teacher.component.scss']
})
export class ClassDetailCourseTeacherComponent implements OnInit {

  courseId: string;
  tabActive: string = 'comment';
  permission = DATA_PERMISSION;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(el => {
      if (el.tab) {
        this.tabActive = el.tab;
      } else {
        this.tabActive = 'comment';
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {
            tab: 'comment'
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
