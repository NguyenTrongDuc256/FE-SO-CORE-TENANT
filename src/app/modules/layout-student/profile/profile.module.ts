import { TranslocoModule } from '@ngneat/transloco';
import { CoreModule } from './../../../_core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ListRecordsOfStudentComponent } from './components/list-records-of-student/list-records-of-student.component';


@NgModule({
  declarations: [
    ListRecordsOfStudentComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    CoreModule,
    TranslocoModule,
    NzInputModule
  ]
})
export class ProfileModule { }
