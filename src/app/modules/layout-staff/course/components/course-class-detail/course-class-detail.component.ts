import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DATA_PERMISSION } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-course-class-detail',
  templateUrl: './course-class-detail.component.html',
  styleUrls: ['./course-class-detail.component.scss']
})
export class CourseClassDetailComponent implements OnInit {

  courseId: string;
  subtab?: any;
  tabActive: string = 'comment';
  permission = DATA_PERMISSION;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit() {
    this.courseId = this.activatedRoute.snapshot.params.id;
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
        tab: value,
        subtab: null,
        userid: null
      },
      queryParamsHandling: 'merge'
    });
  }

}
