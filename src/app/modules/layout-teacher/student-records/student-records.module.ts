import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRecordsRoutingModule } from './student-records-routing.module';
import { ModalFormRecordsTeacherComponent } from './modals/modal-form-records/modal-form-records.component';
import { ListStudentRecordsComponent } from './components/list-student-records/list-student-records.component';
import { ListStudentComponent } from './components/list-student/list-student.component';
import { ModalRefuseRecordsComponent } from './modals/modal-refuse-records/modal-refuse-records.component';
import { CoreModule } from 'src/app/_core/core.module';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ListStudentRecordsApproveComponent } from './components/list-student-records-approve/list-student-records-approve.component';


@NgModule({
  declarations: [
    ListStudentComponent,
    ListStudentRecordsComponent,
    ModalFormRecordsTeacherComponent,
    ModalRefuseRecordsComponent,
    ListStudentRecordsApproveComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    StudentRecordsRoutingModule,
    NzInputModule,
    NzDropDownModule,
    TranslocoModule,
    NzCheckboxModule,
  ],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: ['student-records']}],
})
export class StudentRecordsModule { }
