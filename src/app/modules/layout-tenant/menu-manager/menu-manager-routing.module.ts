import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from "ngx-permissions";
import { DATA_PERMISSION } from "src/app/_shared/utils/constant";
import { DetailMenuPackageManagerComponent } from "./components/detail-menu-package-manager/detail-menu-package-manager.component";
import { ListPackageMenuManagerComponent } from "./components/list-package-menu-manager/list-package-menu-manager.component";

const routes: Routes = [
  {
    path: '',
    component: ListPackageMenuManagerComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.menu_package_access],
        redirectTo: '/access-denied',
      },
    },
  },
  {
    path: 'detail-menu-package/:id',
    component: DetailMenuPackageManagerComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.menu_package_access],
        redirectTo: '/access-denied',
      },
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class MenuManagerRoutingModule {}
