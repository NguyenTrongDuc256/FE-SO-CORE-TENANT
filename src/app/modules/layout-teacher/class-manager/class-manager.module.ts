import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClassManagerRoutingModule} from './class-manager-routing.module';
import {ClassDetailTeacherComponent} from './components/class-detail-teacher/class-detail-teacher.component';
import {CoreModule} from 'src/app/_core/core.module';
import {TRANSLOCO_SCOPE, TranslocoModule} from '@ngneat/transloco';
import {TabAbsentListTeacherComponent} from './tabs/tab-absent-list-teacher/tab-absent-list-teacher.component';
import {
  ModalCreateAbsentTeacherComponent
} from './modals/modal-create-absent-teacher/modal-create-absent-teacher.component';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzTreeSelectModule} from 'ng-zorro-antd/tree-select';

import {NzCollapseModule} from 'ng-zorro-antd/collapse';

import {
  TabDailyCommentStudentTeacherComponent
} from './tabs/tab-daily-comment-student-teacher/tab-daily-comment-student-teacher.component';
import {
  ModalUpdateAbsentTeacherComponent
} from './modals/modal-update-absent-teacher/modal-update-absent-teacher.component';
import {ClassListTeacherComponent} from './components/class-list-teacher/class-list-teacher.component';
import {
  ModalAbsentDetailTeacherComponent
} from './modals/modal-absent-detail-teacher/modal-absent-detail-teacher.component';
import {TabAttendanceTeacherComponent} from "./tabs/tab-attendance-teacher/tab-attendance-teacher.component";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {
  ClassDetailCourseTeacherComponent
} from './components/class-detail-course-teacher/class-detail-course-teacher.component';
import {
  TabDailyCommentStudentCourseTeacherComponent
} from './tabs/tab-daily-comment-student-course-teacher/tab-daily-comment-student-course-teacher.component';
import {
  ScoreStudentInHomeroomClassTeacherComponent
} from "./components/score-student-in-homeroom-class-teacher/score-student-in-homeroom-class-teacher.component";
import {
  HistoryScoreHomeroomClassTeacherComponent
} from "./components/history-score-homeroom-class-teacher/history-score-homeroom-class-teacher.component";
import {
  TabScoringBehaviorHomeroomClassTeacherComponent
} from "./tabs/tab-scoring-behavior-homeroom-class-teacher/tab-scoring-behavior-homeroom-class-teacher.component";
import {
  ModalHistoryStudentInHomeroomClassTeacherComponent
} from "./modals/modal-history-student-in-homeroom-class-teacher/modal-history-student-in-homeroom-class-teacher.component";
import {
  ModalConfirmScoreStudentInHomeroomClassTeacherComponent
} from "./modals/modal-confirm-score-student-in-homeroom-class-teacher/modal-confirm-score-student-in-homeroom-class-teacher.component";
import {
  ModalConfirmScoreManyStudentInHomeroomClassComponent
} from "./modals/modal-confirm-score-many-student-in-homeroom-class/modal-confirm-score-many-student-in-homeroom-class.component";


@NgModule({
  declarations: [
    ClassDetailTeacherComponent,
    TabAbsentListTeacherComponent,
    ModalCreateAbsentTeacherComponent,
    TabDailyCommentStudentTeacherComponent,
    ModalUpdateAbsentTeacherComponent,
    ClassListTeacherComponent,
    ModalAbsentDetailTeacherComponent,
    TabAttendanceTeacherComponent,
    ClassDetailCourseTeacherComponent,
    TabDailyCommentStudentCourseTeacherComponent,
    ScoreStudentInHomeroomClassTeacherComponent,
    HistoryScoreHomeroomClassTeacherComponent,
    TabScoringBehaviorHomeroomClassTeacherComponent,
    ModalHistoryStudentInHomeroomClassTeacherComponent,
    ModalConfirmScoreStudentInHomeroomClassTeacherComponent,
    ModalConfirmScoreManyStudentInHomeroomClassComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ClassManagerRoutingModule,
    TranslocoModule,
    CommonModule,
    NzInputModule,
    NzSelectModule,
    NzDropDownModule,
    NzCheckboxModule,
    NzTreeSelectModule,
    NzCollapseModule,
    NzRadioModule,

  ],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: "training"}],
})
export class ClassManagerModule {
}
