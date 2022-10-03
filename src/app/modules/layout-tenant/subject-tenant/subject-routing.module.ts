import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { DATA_PERMISSION } from 'src/app/_shared/utils/constant';
import { ListSubjectTenantComponent } from './components/list-subject-tenant/list-subject-tenant.component';

const routes: Routes = [
  {
    path: '',
    component: ListSubjectTenantComponent,
    // canActivate: [NgxPermissionsGuard],
    // data: {
    //   permissions: {
    //     only: [DATA_PERMISSION.omt_access],
    //     redirectTo: '/access-denied',
    //   },
    // },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
