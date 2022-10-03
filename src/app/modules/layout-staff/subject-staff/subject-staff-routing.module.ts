import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectListStaffComponent } from './components/subject-list-staff/subject-list-staff.component';

const routes: Routes = [
  {
    path: '',
    component: SubjectListStaffComponent,
    // canActivate: [NgxPermissionsGuard],
    // data: {
    //   permissions: {
    //     only: [DATA_PERMISSION.campus_access],
    //     redirectTo: "/access-denied"
    //   },
    // }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectStaffRoutingModule { }
