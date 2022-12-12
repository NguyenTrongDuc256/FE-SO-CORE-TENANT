
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { DATA_PERMISSION } from 'src/app/_shared/utils/constant';
import { AbsentListParentComponent } from './components/absent-list-parent/absent-list-parent.component';

const routes: Routes = [
  {
    path: '',
    component: AbsentListParentComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.absent_parent_access],
        redirectTo: '/access-denied',
      },
    },
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbsentManagerParentRoutingModule { }
