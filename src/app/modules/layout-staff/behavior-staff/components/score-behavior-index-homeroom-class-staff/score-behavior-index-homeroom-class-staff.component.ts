import {Component, OnInit} from '@angular/core';
import {DATA_PERMISSION} from "../../../../../_shared/utils/constant";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-score-behavior-index-homeroom-class-staff',
  templateUrl: './score-behavior-index-homeroom-class-staff.component.html',
  styleUrls: ['./score-behavior-index-homeroom-class-staff.component.scss', '../../style.scss']
})
export class ScoreBehaviorIndexHomeroomClassStaffComponent implements OnInit {
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
