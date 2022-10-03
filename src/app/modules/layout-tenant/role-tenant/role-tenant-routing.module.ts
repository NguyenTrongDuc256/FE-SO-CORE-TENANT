import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { DATA_PERMISSION } from 'src/app/_shared/utils/constant';
import { DetailRoleTenantComponent } from './components/detail-role-tenant/detail-role-tenant.component';
import { ListRoleTenantComponent } from './components/list-role-tenant/list-role-tenant.component';


const routes: Routes = [
  {
    path: '',
    component: ListRoleTenantComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.role_view],
        redirectTo: "/access-denied",
      },
    },
  },
  {
    path: ':id',
    component: DetailRoleTenantComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.role_view],
        redirectTo: "/access-denied",
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleTenantRoutingModule {}
