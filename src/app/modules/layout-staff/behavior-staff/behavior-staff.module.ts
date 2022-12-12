import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorStaffRoutingModule } from './behavior-staff-routing.module';
import { CoreModule } from "../../../_core/core.module";
import { ReactiveFormsModule } from "@angular/forms";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzPopoverModule } from "ng-zorro-antd/popover";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzSelectModule } from "ng-zorro-antd/select";
import { TRANSLOCO_SCOPE, TranslocoModule } from "@ngneat/transloco";
import { NgxPermissionsModule } from "ngx-permissions";
import {
  ConfigBehaviorIndexStaffComponent
} from './components/config-behavior-index-staff/config-behavior-index-staff.component';
import {
  TabBehaviorLockGradingWeekStaffComponent
} from './tabs/tab-behavior-lock-grading-week-staff/tab-behavior-lock-grading-week-staff.component';
import { TabConfigBehaviorStaffComponent } from './tabs/tab-config-behavior-staff/tab-config-behavior-staff.component';
import {
  TabGenInitialPointStaffComponent
} from './tabs/tab-gen-initial-point-staff/tab-gen-initial-point-staff.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import {
  ModalHistoryStudentInClassStaffComponent
} from './modals/modal-history-student-in-class-staff/modal-history-student-in-class-staff.component';
import { BehaviorManagerStaffComponent } from './components/behavior-manager-staff/behavior-manager-staff.component';
import {
  ModalHistoryStudentInCourseStaffComponent
} from './modals/modal-history-student-in-course-staff/modal-history-student-in-course-staff.component';
import {
  HistoryScoreHomeroomClassStaffComponent
} from './components/history-score-homeroom-class-staff/history-score-homeroom-class-staff.component';
import {
  ModalFormBehaviorCategoryStaffComponent
} from './modals/modal-form-behavior-category-staff/modal-form-behavior-category-staff.component';
import {
  ScoringBehaviorHomeroomClassStaffComponent
} from "./components/scoring-behavior-homeroom-class-staff/scoring-behavior-homeroom-class-staff.component";
import {
  ScoringBehaviorStudentStaffComponent
} from "./components/scoring-behavior-student-staff/scoring-behavior-student-staff.component";
import {
  HistoryScoreCourseStaffComponent
} from "./components/history-score-course-staff/history-score-course-staff.component";
import {
  HistoryScoreStudentInCourseStaffComponent
} from "./components/history-score-student-in-course-staff/history-score-student-in-course-staff.component";
import {
  HistoryScoreStudentInHomeroomClassStaffComponent
} from "./components/history-score-student-in-homeroom-class-staff/history-score-student-in-homeroom-class-staff.component";
import {
  ScoreManyStudentInCourseStaffComponent
} from "./components/score-many-student-in-course-staff/score-many-student-in-course-staff.component";
import {
  ScoreManyStudentInHomeroomClassStaffComponent
} from "./components/score-many-student-in-homeroom-class-staff/score-many-student-in-homeroom-class-staff.component";
import {
  ScoreStudentInCourseStaffComponent
} from "./components/score-student-in-course-staff/score-student-in-course-staff.component";
import {
  ScoreStudentInHomeroomClassStaffComponent
} from "./components/score-student-in-homeroom-class-staff/score-student-in-homeroom-class-staff.component";
import {
  ScoreBehaviorIndexCourseStaffComponent
} from "./components/score-behavior-index-course-staff/score-behavior-index-course-staff.component";
import {
  ScoreBehaviorIndexHomeroomClassStaffComponent
} from "./components/score-behavior-index-homeroom-class-staff/score-behavior-index-homeroom-class-staff.component";
import {
  ScoreBehaviorIndexStudentStaffComponent
} from "./components/score-behavior-index-student-staff/score-behavior-index-student-staff.component";

import { ModalFormBehaviorStaffComponent } from './modals/modal-form-behavior-staff/modal-form-behavior-staff.component';

import { ModalConfirmScoreManyStudentInHomeroomClassComponent } from './modals/modal-confirm-score-many-student-in-homeroom-class/modal-confirm-score-many-student-in-homeroom-class.component';
import {
  ScoringBehaviorCourseStaffComponent
} from "./components/scoring-behavior-course-staff/scoring-behavior-course-staff.component";
import { ModalGenInitialPointConfirmStaffComponent } from './modals/modal-gen-Initial-point-confirm-staff/modal-gen-Initial-point-confirm-staff.component';
import {
  ModalConfirmScoreStudentInCourseComponent
} from "./modals/modal-confirm-score-student-in-course/modal-confirm-score-student-in-course.component";
import {
  ModalConfirmScoreManyStudentInCourseComponent
} from "./modals/modal-confirm-score-many-student-in-course/modal-confirm-score-many-student-in-course.component";
import {
  ModalConfirmScoreStudentInHomeroomClassComponent
} from "./modals/modal-confirm-score-student-in-homeroom-class/modal-confirm-score-student-in-homeroom-class.component";
import { ModalDeleteBehaviorCategoryStaffComponent } from './modals/modal-delete-behavior-category-staff/modal-delete-behavior-category-staff.component';
import { ModalAddStudentToScoreBehaviorStudentStaffComponent } from './modals/modal-add-student-to-score-behavior-student-staff/modal-add-student-to-score-behavior-student-staff.component';
import {
  ModalConfirmScoreManyStudentComponent
} from "./modals/modal-confirm-score-many-student/modal-confirm-score-many-student.component";


@NgModule({
  declarations: [
    BehaviorManagerStaffComponent,
    ConfigBehaviorIndexStaffComponent,
    TabGenInitialPointStaffComponent,
    TabConfigBehaviorStaffComponent,
    TabBehaviorLockGradingWeekStaffComponent,
    HistoryScoreCourseStaffComponent,
    HistoryScoreHomeroomClassStaffComponent,
    HistoryScoreStudentInCourseStaffComponent,
    HistoryScoreStudentInHomeroomClassStaffComponent,
    ScoreBehaviorIndexCourseStaffComponent,
    ScoreBehaviorIndexHomeroomClassStaffComponent,
    ScoreManyStudentInCourseStaffComponent,
    ScoreManyStudentInHomeroomClassStaffComponent,
    ScoreStudentInCourseStaffComponent,
    ScoreStudentInHomeroomClassStaffComponent,
    ScoreBehaviorIndexStudentStaffComponent,
    ScoringBehaviorCourseStaffComponent,
    ScoringBehaviorHomeroomClassStaffComponent,
    ScoringBehaviorStudentStaffComponent,
    TabBehaviorLockGradingWeekStaffComponent,
    TabConfigBehaviorStaffComponent,
    TabGenInitialPointStaffComponent,
    ModalHistoryStudentInClassStaffComponent,
    ModalHistoryStudentInCourseStaffComponent,
    ModalFormBehaviorCategoryStaffComponent,
    ModalFormBehaviorStaffComponent,
    ModalConfirmScoreStudentInHomeroomClassComponent,
    ModalConfirmScoreManyStudentInHomeroomClassComponent,
    ModalGenInitialPointConfirmStaffComponent,
    ModalConfirmScoreStudentInCourseComponent,
    ModalConfirmScoreManyStudentInCourseComponent,
    ModalDeleteBehaviorCategoryStaffComponent,
    ModalAddStudentToScoreBehaviorStudentStaffComponent,
    ModalConfirmScoreManyStudentComponent

  ],
  imports: [
    CommonModule,
    BehaviorStaffRoutingModule,
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
export class BehaviorStaffModule {
}
