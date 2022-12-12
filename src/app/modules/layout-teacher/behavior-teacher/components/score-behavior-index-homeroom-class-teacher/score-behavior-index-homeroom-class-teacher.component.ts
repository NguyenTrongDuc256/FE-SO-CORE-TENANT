import {Component, OnInit} from '@angular/core';
import {DATA_PERMISSION} from "../../../../../_shared/utils/constant";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-score-behavior-index-homeroom-class-teacher',
  templateUrl: './score-behavior-index-homeroom-class-teacher.component.html',
  styleUrls: ['./score-behavior-index-homeroom-class-teacher.component.scss', '../../style.scss']
})
export class ScoreBehaviorIndexHomeroomClassTeacherComponent implements OnInit {
  permission: any = DATA_PERMISSION;
  isLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {

  }
}
