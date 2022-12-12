import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeroomClassRoutingModule } from './homeroom-class-routing.module';
import { CoreModule } from 'src/app/_core/core.module';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ListHomeroomClassesComponent } from './components/list-homeroom-classes/list-homeroom-classes.component';
import { FormHomeroomClassComponent } from './components/form-homeroom-class/form-homeroom-class.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { HomeroomClassesDetailStaffComponent } from './components/homeroom-classes-detail-staff/homeroom-classes-detail-staff.component';
import { AbsentListStaffComponent } from './tabs/tab-absent-list-staff/tab-absent-list-staff.component';
import { ModalCreateAbsentStaffComponent } from './modals/modal-create-absent-staff/modal-create-absent-staff.component';
import { ListTeachersHomeroomClassComponent } from './components/list-teachers/list-teachers.component';
import { ListStudentsHomeroomClassComponent } from './components/list-students/list-students.component';
import { AssignTeacherHomeroomClassComponent } from './modals/assign-teacher/assign-teacher.component';
import { AssignStudentHomeroomClassComponent } from './modals/assign-student/assign-student.component';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { TabDailyCommentStudentComponent } from './tabs/tab-daily-comment-student/tab-daily-comment-student.component';
import { ModalUpdateAbsentStaffComponent } from './modals/modal-update-absent-staff/modal-update-absent-staff.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { ModalGuideDailyCommentComponent } from './modals/modal-guide-daily-comment/modal-guide-daily-comment.component';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { ModalAbsentDetailStaffComponent } from './modals/modal-absent-detail-staff/modal-absent-detail-staff.component';
import { ModalImportFileHomeroomClassStaffComponent } from './modals/modal-import-file-homeroom-class-staff/modal-import-file-homeroom-class-staff.component';
import {NzRadioModule} from "ng-zorro-antd/radio";
import { TabAttendanceStaffComponent } from './tabs/tab-attendance-staff/tab-attendance-staff.component';
import { TabScoringBehaviorHomeroomClassStaffComponent } from './tabs/tab-scoring-behavior-homeroom-class-staff/tab-scoring-behavior-homeroom-class-staff.component';
import { ModalHistoryStudentInHomeroomClassStaffComponent } from './modals/modal-history-student-in-homeroom-class-staff/modal-history-student-in-homeroom-class-staff.component';
import { HistoryScoreHomeroomClassStaffComponent } from './components/history-score-homeroom-class-staff/history-score-homeroom-class-staff.component';
import { TabScoringBehaviorIndexStaffComponent } from './tabs/tab-scoring-behavior-index-staff/tab-scoring-behavior-index-staff.component';
import { ScoreStudentInHomeroomClassStaffComponent } from './components/score-student-in-homeroom-class-staff/score-student-in-homeroom-class-staff.component';
import { HistoryScoreStudentInHomeroomClassStaffComponent } from './components/history-score-student-in-homeroom-class-staff/history-score-student-in-homeroom-class-staff.component';
import { ScoreManyStudentInHomeroomClassStaffComponent } from './components/score-many-student-in-homeroom-class-staff/score-many-student-in-homeroom-class-staff.component';
import { ModalConfirmScoreStudentInHomeroomClassStaffComponent } from './modals/modal-confirm-score-student-in-homeroom-class-staff/modal-confirm-score-student-in-homeroom-class-staff.component';
import { ModalConfirmScoreManyStudentInHomeroomClassStaffComponent } from './modals/modal-confirm-score-many-student-in-homeroom-class-staff/modal-confirm-score-many-student-in-homeroom-class-staff.component';
import { ModalImportDailyCommentStaffComponent } from './modals/modal-import-daily-comment-staff/modal-import-daily-comment-staff.component';
import { ResultImportDailyCommentHomeroomClassStaffComponent } from './components/result-import-daily-comment-homeroom-class-staff/result-import-daily-comment-homeroom-class-staff.component';


@NgModule({
  declarations: [
    ListHomeroomClassesComponent,
    FormHomeroomClassComponent,
    HomeroomClassesDetailStaffComponent,
    AbsentListStaffComponent,
    ModalCreateAbsentStaffComponent,
    ListTeachersHomeroomClassComponent,
    ListStudentsHomeroomClassComponent,
    AssignTeacherHomeroomClassComponent,
    AssignStudentHomeroomClassComponent,
    TabDailyCommentStudentComponent,
    ModalUpdateAbsentStaffComponent,
    ModalGuideDailyCommentComponent,
    ModalAbsentDetailStaffComponent,
    ModalImportFileHomeroomClassStaffComponent,
    TabAttendanceStaffComponent,
    TabScoringBehaviorHomeroomClassStaffComponent,
    ModalHistoryStudentInHomeroomClassStaffComponent,
    HistoryScoreHomeroomClassStaffComponent,
    TabScoringBehaviorIndexStaffComponent,
    ScoreStudentInHomeroomClassStaffComponent,
    HistoryScoreStudentInHomeroomClassStaffComponent,
    ScoreManyStudentInHomeroomClassStaffComponent,
    ModalConfirmScoreStudentInHomeroomClassStaffComponent,
    ModalConfirmScoreManyStudentInHomeroomClassStaffComponent,
    ModalImportDailyCommentStaffComponent,
    ResultImportDailyCommentHomeroomClassStaffComponent
  ],
  imports: [
    CommonModule,
    HomeroomClassRoutingModule,
    CoreModule,
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
export class HomeroomClassModule { }
