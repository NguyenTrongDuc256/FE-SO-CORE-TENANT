import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignTeacherRoutingModule } from './assign-teacher-routing.module';
import { AssignHomeroomTeacherComponent } from './components/assign-homeroom-teacher/assign-homeroom-teacher.component';
import { DashboardControlAssignTeacherComponent } from './components/dashboard-control-assign-teacher/dashboard-control-assign-teacher.component';
import { AssignMainHomeroomTeacherComponent } from './components/assign-main-homeroom-teacher/assign-main-homeroom-teacher.component';
import { CoreModule } from 'src/app/_core/core.module';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { AssignGradeMasterComponent } from './components/assign-grade-master/assign-grade-master.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ModalConfirmAssignMainHomeroomTeacherComponent } from './modals/modal-confirm-assign-main-homeroom-teacher/modal-confirm-assign-main-homeroom-teacher.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { AssignCourseTeacherComponent } from './components/assign-course-teacher/assign-course-teacher.component';

@NgModule({
  declarations: [
    AssignHomeroomTeacherComponent,
    DashboardControlAssignTeacherComponent,
    AssignMainHomeroomTeacherComponent,
    AssignGradeMasterComponent,
    ModalConfirmAssignMainHomeroomTeacherComponent,
    AssignCourseTeacherComponent
  ],
  imports: [
    CommonModule,
    AssignTeacherRoutingModule,
    CoreModule,
    NzCheckboxModule,
    TranslocoModule,
    NzSelectModule,
    NzRadioModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: "assign-teacher" }],
})
export class AssignTeacherModule { }
