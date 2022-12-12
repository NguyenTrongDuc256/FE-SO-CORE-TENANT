import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslocoModule} from "@ngneat/transloco";
import { NgxPermissionsModule } from 'ngx-permissions';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import {CoreModule} from "../../../_core/core.module";
import { BuildingStaffComponent } from './components/infrastructure/building-staff/building-staff.component';
import { ModalBuildingFormStaffComponent } from './modals/infrastructure/modal-building-form-staff/modal-building-form-staff.component';
import { ClassroomStaffComponent } from './components/infrastructure/classroom-staff/classroom-staff.component';
import { ModalClassroomFormStaffComponent } from './modals/infrastructure/modal-classroom-form-staff/modal-classroom-form-staff.component';
import { PeriodStaffComponent } from './components/period-staff/period-staff.component';
import { PeriodFormStaffComponent } from './modals/period-form-staff/period-form-staff.component';
import { ProfileListStaffComponent } from './components/profile-list-staff/profile-list-staff.component';
import { ProfileFormStaffComponent } from './modals/profile-form-staff/profile-form-staff.component';
import { DeclareRoutingModule } from './declare-routing.module';
import { SubjectListStaffComponent } from './components/subjects/subject-list-staff/subject-list-staff.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ListSubjectGradeComponent } from './components/subjects/list-subject-grade/list-subject-grade.component';
import { CreateSubjectGradeComponent } from './components/subjects/create-subject-grade/create-subject-grade.component';
import { ModalUpdateSubjectGradeComponent } from './modals/modal-update-subject-grade/modal-update-subject-grade.component';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  declarations: [
    BuildingStaffComponent,
    ModalBuildingFormStaffComponent,
    ClassroomStaffComponent,
    ModalClassroomFormStaffComponent,
    PeriodStaffComponent,
    PeriodFormStaffComponent,
    ProfileListStaffComponent,
    ProfileFormStaffComponent,
    SubjectListStaffComponent,
    ListSubjectGradeComponent,
    CreateSubjectGradeComponent,
    ModalUpdateSubjectGradeComponent
  ],
  imports: [
    CommonModule,
    DeclareRoutingModule,
    TranslocoModule,
    NgxPermissionsModule,
    NzDropDownModule,
    ReactiveFormsModule,
    CoreModule,
    NzCheckboxModule,
    NzInputModule,
    NzSelectModule
  ]
})
export class DeclareModule { }
