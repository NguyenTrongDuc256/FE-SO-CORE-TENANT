import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NgxPermissionsGuard} from "ngx-permissions";
import {DATA_PERMISSION} from "../../../_shared/utils/constant";
import {
  ScoringBehaviorHomeroomClassTeacherComponent
} from "./components/scoring-behavior-homeroom-class-teacher/scoring-behavior-homeroom-class-teacher.component";
import {
  HistoryScoreHomeroomClassTeacherComponent
} from "./components/history-score-homeroom-class-teacher/history-score-homeroom-class-teacher.component";
import {
  ScoreStudentInHomeroomClassTeacherComponent
} from "./components/score-student-in-homeroom-class-teacher/score-student-in-homeroom-class-teacher.component";
import {
  HistoryScoreStudentInHomeroomClassTeacherComponent
} from "./components/history-score-student-in-homeroom-class-teacher/history-score-student-in-homeroom-class-teacher.component";
import {
  ScoreManyStudentInHomeroomClassTeacherComponent
} from "./components/score-many-student-in-homeroom-class-teacher/score-many-student-in-homeroom-class-teacher.component";
import {
  ScoreStudentInCourseTeacherComponent
} from "./components/score-student-in-course-teacher/score-student-in-course-teacher.component";
import {
  HistoryScoreStudentInCourseTeacherComponent
} from "./components/history-score-student-in-course-teacher/history-score-student-in-course-teacher.component";
import {
  ScoreManyStudentInCourseTeacherComponent
} from "./components/score-many-student-in-course-teacher/score-many-student-in-course-teacher.component";
import {
  ScoreBehaviorIndexHomeroomClassTeacherComponent
} from "./components/score-behavior-index-homeroom-class-teacher/score-behavior-index-homeroom-class-teacher.component";
import {
  ScoreBehaviorIndexCourseTeacherComponent
} from "./components/score-behavior-index-course-teacher/score-behavior-index-course-teacher.component";
import {
  ScoreBehaviorIndexStudentTeacherComponent
} from "./components/score-behavior-index-student-teacher/score-behavior-index-student-teacher.component";
import {
  ScoringBehaviorCourseTeacherComponent
} from "./components/scoring-behavior-course-teacher/scoring-behavior-course-teacher.component";
import {
  HistoryScoreCourseTeacherComponent
} from "./components/history-score-course-teacher/history-score-course-teacher.component";


const routes: Routes = [
  {
    path: '',
    component: ScoreBehaviorIndexHomeroomClassTeacherComponent,
    children: [
      {
        path: '', // danh s??ch hs v?? s??? ??i???m hanh v?? c???a h???c sinh
        component: ScoringBehaviorHomeroomClassTeacherComponent,
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
        component: ScoreStudentInHomeroomClassTeacherComponent,
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
        component: HistoryScoreStudentInHomeroomClassTeacherComponent,
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
        component: ScoreManyStudentInHomeroomClassTeacherComponent,
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
    component: HistoryScoreHomeroomClassTeacherComponent,
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
    component: ScoreBehaviorIndexCourseTeacherComponent,
    children: [
      {
        path: '', // danh s??ch hs v?? s??? ??i???m hanh v?? c???a h???c sinh
        component: ScoringBehaviorCourseTeacherComponent,
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
        component: ScoreStudentInCourseTeacherComponent,
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
        component: HistoryScoreStudentInCourseTeacherComponent,
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
        component: ScoreManyStudentInCourseTeacherComponent,
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
    component: HistoryScoreCourseTeacherComponent,
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
    component: ScoreBehaviorIndexStudentTeacherComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.behavior_grading],
        redirectTo: "/access-denied"
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BehaviorTeacherRoutingModule {
}
