import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InfoSettingSchoolStaffComponent} from "./info-setting-school-staff/info-setting-school-staff.component";
import {NgxPermissionsGuard} from "ngx-permissions";
import {DATA_PERMISSION} from "../../../_shared/utils/constant";

const routes: Routes = [
  {
    path: 'info-setting',
    component: InfoSettingSchoolStaffComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.school_access, DATA_PERMISSION.school_manager],
        redirectTo: '/access-denied',
      },
    }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralSettingStaffRoutingModule { }
