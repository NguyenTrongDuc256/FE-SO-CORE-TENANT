import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {NgxPermissionsGuard} from "ngx-permissions";
import {DATA_PERMISSION} from "../../../_shared/utils/constant";
import {ParentListStaffComponent} from "./components/parent-list-staff/parent-list-staff.component";
import {ParentCreateStaffComponent} from "./components/parent-create-staff/parent-create-staff.component";
import {ParentEditStaffComponent} from "./components/parent-edit-staff/parent-edit-staff.component";
import {ParentDetailStaffComponent} from "./components/parent-detail-staff/parent-detail-staff.component";
import {
  ResultImportParentTenantComponent
} from "../../layout-tenant/parent-tenant/components/result-import-parent-tenant/result-import-parent-tenant.component";
import {
  ResultImportParentStaffComponent
} from "./components/result-import-parent-staff/result-import-parent-staff.component";


const routes: Routes = [
  {
    path: '',
    component: ParentListStaffComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.parent_view],
        redirectTo: '/access-denied',
      },
    }
  },
  {
    path: 'create',
    component: ParentCreateStaffComponent,
    data: {
      permissions: {
        only: [DATA_PERMISSION.parent_modify],
        redirectTo: '/access-denied',
      },
    }
  },
  {
    path: 'edit/:id',
    component: ParentEditStaffComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.parent_modify],
        redirectTo: "/access-denied"
      },
    },
  },
  {
    path: 'detail/:id',
    component: ParentDetailStaffComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.parent_view],
        redirectTo: "/access-denied"
      },
    },
  },
  {
    path: 'result-import-file/:id',
    component: ResultImportParentStaffComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.parent_modify],
        redirectTo: "/access-denied"
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentStaffRoutingModule { }
