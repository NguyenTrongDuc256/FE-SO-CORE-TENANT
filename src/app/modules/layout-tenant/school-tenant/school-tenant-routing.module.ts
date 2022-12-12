import { ListSchoolTenantComponent } from './components/list-school-tenant/list-school-tenant.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { DATA_PERMISSION } from 'src/app/_shared/utils/constant';
import { DashboardControlComponent } from './components/dashboard-control/dashboard-control.component';
import { DetailSchoolTenantComponent } from './components/detail-school-tenant/detail-school-tenant.component';
import { UpdateSchoolTenantComponent } from './components/update-school-tenant/update-school-tenant.component';
import { ListUserSchoolTenantComponent } from './components/list-user-school-tenant/list-user-school-tenant.component';
import { DanhSachDiemTruongComponent } from './components/danh-sach-diem-truong/danh-sach-diem-truong.component';
import { TabControlConfigComponent } from './components/tab-control-config/tab-control-config.component';
import { ListMenuPackageComponent } from './components/list-menu-package/list-menu-package.component';

const routes: Routes = [
  {
    path: '',
    component: ListSchoolTenantComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.school_access],
        redirectTo: '/access-denied',
      },
    },
  },
  {
    path: 'detail',
    component: DashboardControlComponent,
    children: [
      {
        path: ':id',
        component: DetailSchoolTenantComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [DATA_PERMISSION.school_access],
            redirectTo: '/access-denied',
          },
        },
      },
      {
        path: ':id/update',
        component: UpdateSchoolTenantComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [DATA_PERMISSION.school_manager],
            redirectTo: '/access-denied',
          },
        },
      },
      {
        path: ':id/config',
        component: TabControlConfigComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [DATA_PERMISSION.school_manager],
            redirectTo: '/access-denied',
          },
        },
      },
      {
        path: ':id/user',
        component: ListUserSchoolTenantComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [DATA_PERMISSION.school_manager, DATA_PERMISSION.user_view],
            redirectTo: '/access-denied',
          },
        },
      },
      {
        path: ':id/diem-truong',
        component: DanhSachDiemTruongComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [DATA_PERMISSION.school_manager],
            redirectTo: '/access-denied',
          },
        },
      },
      {
        path: ':id/menu-package',
        component: ListMenuPackageComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [DATA_PERMISSION.school_manager],
            redirectTo: '/access-denied',
          },
        },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolTenantRoutingModule { }
