import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NgxPermissionsGuard} from "ngx-permissions";
import {DATA_PERMISSION} from "../../../_shared/utils/constant";
import {
  ConfigBehaviorIndexStaffComponent
} from './components/config-behavior-index-staff/config-behavior-index-staff.component';
import {BehaviorManagerStaffComponent} from "./components/behavior-manager-staff/behavior-manager-staff.component";

import {
  ScoringBehaviorHomeroomClassStaffComponent
} from "./components/scoring-behavior-homeroom-class-staff/scoring-behavior-homeroom-class-staff.component";
import {
  HistoryScoreHomeroomClassStaffComponent
} from "./components/history-score-homeroom-class-staff/history-score-homeroom-class-staff.component";
import {
  ScoreStudentInHomeroomClassStaffComponent
} from "./components/score-student-in-homeroom-class-staff/score-student-in-homeroom-class-staff.component";
import {
  HistoryScoreStudentInHomeroomClassStaffComponent
} from "./components/history-score-student-in-homeroom-class-staff/history-score-student-in-homeroom-class-staff.component";
import {
  ScoreManyStudentInHomeroomClassStaffComponent
} from "./components/score-many-student-in-homeroom-class-staff/score-many-student-in-homeroom-class-staff.component";
import {
  ScoreStudentInCourseStaffComponent
} from "./components/score-student-in-course-staff/score-student-in-course-staff.component";
import {
  HistoryScoreStudentInCourseStaffComponent
} from "./components/history-score-student-in-course-staff/history-score-student-in-course-staff.component";
import {
  ScoreManyStudentInCourseStaffComponent
} from "./components/score-many-student-in-course-staff/score-many-student-in-course-staff.component";
import {
  ScoreBehaviorIndexHomeroomClassStaffComponent
} from "./components/score-behavior-index-homeroom-class-staff/score-behavior-index-homeroom-class-staff.component";
import {
  ScoreBehaviorIndexCourseStaffComponent
} from "./components/score-behavior-index-course-staff/score-behavior-index-course-staff.component";
import {
  ScoreBehaviorIndexStudentStaffComponent
} from "./components/score-behavior-index-student-staff/score-behavior-index-student-staff.component";
import {
  ScoringBehaviorCourseStaffComponent
} from "./components/scoring-behavior-course-staff/scoring-behavior-course-staff.component";
import {
  HistoryScoreCourseStaffComponent
} from "./components/history-score-course-staff/history-score-course-staff.component";


const routes: Routes = [
  {
    path: '',
    component: ScoreBehaviorIndexHomeroomClassStaffComponent,
    children: [
      {
        path: '', // danh s??ch hs v?? s??? ??i???m hanh v?? c???a h???c sinh
        component: ScoringBehaviorHomeroomClassStaffComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [DATA_PERMISSION.behavior_grading],
            redirectTo: "/access-denied"
          },
        },
      },
      {
        path: 'mark', // ch???m ??i???m 1 h???c sinh - ??i???m c???ng, ??i???m tr???
        component: ScoreStudentInHomeroomClassStaffComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [DATA_PERMISSION.behavior_grading],
            redirectTo: "/access-denied"
          },
        },
      },
      {
        path: 'history-student', // l???ch s??? ch???m 1 h???c sinh
        component: HistoryScoreStudentInHomeroomClassStaffComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [DATA_PERMISSION.behavior_grading],
            redirectTo: "/access-denied"
          },
        },
      },
      {
        path: 'many-student', // ch???m ??i???m nhi???u h???c sinh
        component: ScoreManyStudentInHomeroomClassStaffComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [DATA_PERMISSION.behavior_grading],
            redirectTo: "/access-denied"
          },
        },
      },

    ],
  },
  {
    path: 'history-homeroom-class', // L???ch s??? t???t c??? l???p ch??? nhi???m
    component: HistoryScoreHomeroomClassStaffComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.behavior_grading],
        redirectTo: "/access-denied"
      },
    },
  },

  {
    path: 'course',
    component: ScoreBehaviorIndexCourseStaffComponent,
    children: [
      {
        path: '', // danh s??ch hs v?? s??? ??i???m hanh v?? c???a h???c sinh
        component: ScoringBehaviorCourseStaffComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [DATA_PERMISSION.behavior_grading],
            redirectTo: "/access-denied"
          },
        },
      },
      {
        path: 'mark', // ch???m ??i???m 1 h???c sinh - ??i???m c???ng, ??i???m tr???
        component: ScoreStudentInCourseStaffComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [DATA_PERMISSION.behavior_grading],
            redirectTo: "/access-denied"
          },
        },
      },
      {
        path: 'history-student', // l???ch s??? ch???m 1 h???c sinh
        component: HistoryScoreStudentInCourseStaffComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [DATA_PERMISSION.behavior_grading],
            redirectTo: "/access-denied"
          },
        },
      },
      {
        path: 'many-student', // ch???m ??i???m nhi???u h???c sinh
        component: ScoreManyStudentInCourseStaffComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [DATA_PERMISSION.behavior_grading],
            redirectTo: "/access-denied"
          },
        },
      },
    ],
  },
  {
    path: 'history-course', // L???ch s??? t???t c??? l???p ch??? nhi???m
    component: HistoryScoreCourseStaffComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.behavior_grading],
        redirectTo: "/access-denied"
      },
    },
  },

  {
    path: 'student',
    component: ScoreBehaviorIndexStudentStaffComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.behavior_grading],
        redirectTo: "/access-denied"
      },
    },
  },

  {
    path: 'config-behavior-index',
    component: ConfigBehaviorIndexStaffComponent,
    // canActivate: [NgxPermissionsGuard],
    // data: {
    //   permissions: {
    //     only: [DATA_PERMISSION.employee_view],
    //     redirectTo: "/access-denied"
    //   },
    // },
  },
  {
    path: 'behavior-manager',
    component: BehaviorManagerStaffComponent,
    // canActivate: [NgxPermissionsGuard],
    // data: {
    //   permissions: {
    //     only: [DATA_PERMISSION.employee_view],
    //     redirectTo: "/access-denied"
    //   },
    // },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BehaviorStaffRoutingModule {
}
