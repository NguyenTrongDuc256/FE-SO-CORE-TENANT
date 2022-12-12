import {Component, OnInit} from '@angular/core';
import {DATA_PERMISSION} from "../../../../../_shared/utils/constant";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-score-behavior-index-student-teacher',
  templateUrl: './score-behavior-index-student-teacher.component.html',
  styleUrls: ['./score-behavior-index-student-teacher.component.scss', '../../style.scss']
})
export class ScoreBehaviorIndexStudentTeacherComponent implements OnInit {
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
