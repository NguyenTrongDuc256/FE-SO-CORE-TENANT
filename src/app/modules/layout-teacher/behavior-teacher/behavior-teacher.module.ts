import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorTeacherRoutingModule } from './behavior-teacher-routing.module';
import { CoreModule } from "../../../_core/core.module";
import { ReactiveFormsModule } from "@angular/forms";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzPopoverModule } from "ng-zorro-antd/popover";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzSelectModule } from "ng-zorro-antd/select";
import { TRANSLOCO_SCOPE, TranslocoModule } from "@ngneat/transloco";
import { NgxPermissionsModule } from "ngx-permissions";
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import {
  ModalHistoryStudentInClassTeacherComponent
} from './modals/modal-history-student-in-class-teacher/modal-history-student-in-class-teacher.component';
import {
  ModalHistoryStudentInCourseTeacherComponent
} from './modals/modal-history-student-in-course-teacher/modal-history-student-in-course-teacher.component';
import {
  HistoryScoreHomeroomClassTeacherComponent
} from './components/history-score-homeroom-class-teacher/history-score-homeroom-class-teacher.component';
import {
  ScoringBehaviorHomeroomClassTeacherComponent
} from "./components/scoring-behavior-homeroom-class-teacher/scoring-behavior-homeroom-class-teacher.component";
import {
  ScoringBehaviorStudentTeacherComponent
} from "./components/scoring-behavior-student-teacher/scoring-behavior-student-teacher.component";
import {
  HistoryScoreStudentInCourseTeacherComponent
} from "./components/history-score-student-in-course-teacher/history-score-student-in-course-teacher.component";
import {
  HistoryScoreStudentInHomeroomClassTeacherComponent
} from "./components/history-score-student-in-homeroom-class-teacher/history-score-student-in-homeroom-class-teacher.component";
import {
  ScoreManyStudentInCourseTeacherComponent
} from "./components/score-many-student-in-course-teacher/score-many-student-in-course-teacher.component";
import {
  ScoreManyStudentInHomeroomClassTeacherComponent
} from "./components/score-many-student-in-homeroom-class-teacher/score-many-student-in-homeroom-class-teacher.component";
import {
  ScoreStudentInCourseTeacherComponent
} from "./components/score-student-in-course-teacher/score-student-in-course-teacher.component";
import {
  ScoreStudentInHomeroomClassTeacherComponent
} from "./components/score-student-in-homeroom-class-teacher/score-student-in-homeroom-class-teacher.component";
import {
  ScoreBehaviorIndexCourseTeacherComponent
} from "./components/score-behavior-index-course-teacher/score-behavior-index-course-teacher.component";
import {
  ScoreBehaviorIndexHomeroomClassTeacherComponent
} from "./components/score-behavior-index-homeroom-class-teacher/score-behavior-index-homeroom-class-teacher.component";
import {
  ScoreBehaviorIndexStudentTeacherComponent
} from "./components/score-behavior-index-student-teacher/score-behavior-index-student-teacher.component";
import {
  ScoringBehaviorCourseTeacherComponent
} from "./components/scoring-behavior-course-teacher/scoring-behavior-course-teacher.component";
import {
  ModalConfirmScoreStudentInHomeroomClassTeacherComponent
} from "./modals/modal-confirm-score-student-in-homeroom-class-teacher/modal-confirm-score-student-in-homeroom-class-teacher.component";
import {
  ModalConfirmScoreManyStudentInHomeroomClassTeacherComponent
} from "./modals/modal-confirm-score-many-student-in-homeroom-class-teacher/modal-confirm-score-many-student-in-homeroom-class-teacher.component";
import {
  ModalConfirmScoreStudentInCourseTeacherComponent
} from "./modals/modal-confirm-score-student-in-course-teacher/modal-confirm-score-student-in-course-teacher.component";
import {
  ModalConfirmScoreManyStudentInCourseTeacherComponent
} from "./modals/modal-confirm-score-many-student-in-course-teacher/modal-confirm-score-many-student-in-course-teacher.component";
import {
  HistoryScoreCourseTeacherComponent
} from "./components/history-score-course-teacher/history-score-course-teacher.component";


@NgModule({
  declarations: [
    HistoryScoreCourseTeacherComponent,
    HistoryScoreHomeroomClassTeacherComponent,
    HistoryScoreStudentInCourseTeacherComponent,
    HistoryScoreStudentInHomeroomClassTeacherComponent,
    ScoreBehaviorIndexCourseTeacherComponent,
    ScoreBehaviorIndexHomeroomClassTeacherComponent,
    ScoreManyStudentInCourseTeacherComponent,
    ScoreManyStudentInHomeroomClassTeacherComponent,
    ScoreStudentInCourseTeacherComponent,
    ScoreStudentInHomeroomClassTeacherComponent,
    ScoreBehaviorIndexStudentTeacherComponent,
    ScoringBehaviorCourseTeacherComponent,
    ScoringBehaviorHomeroomClassTeacherComponent,
    ScoringBehaviorStudentTeacherComponent,
    ModalHistoryStudentInClassTeacherComponent,
    ModalHistoryStudentInCourseTeacherComponent,
    ModalConfirmScoreStudentInHomeroomClassTeacherComponent,
    ModalConfirmScoreManyStudentInHomeroomClassTeacherComponent,
    ModalConfirmScoreStudentInCourseTeacherComponent,
    ModalConfirmScoreManyStudentInCourseTeacherComponent,
  ],
  imports: [
    CommonModule,
    BehaviorTeacherRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzPopoverModule,
    NzDropDownModule,
    NzSelectModule,
    TranslocoModule,
    NgxPermissionsModule.forChild(),
    NzSwitchModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: "behavior" }],
})
export class BehaviorTeacherModule {
}
