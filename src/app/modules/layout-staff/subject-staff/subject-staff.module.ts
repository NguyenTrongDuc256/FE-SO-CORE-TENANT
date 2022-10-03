import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectStaffRoutingModule } from './subject-staff-routing.module';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SubjectStaffRoutingModule,
    NzDropDownModule,
    NzCheckboxModule
  ]
})
export class SubjectStaffModule { }
