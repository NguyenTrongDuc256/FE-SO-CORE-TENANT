import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRoleTenantComponent } from './components/list-role-tenant/list-role-tenant.component';
import { DetailRoleTenantComponent } from './components/detail-role-tenant/detail-role-tenant.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CoreModule } from 'src/app/_core/core.module';
import { RoleTenantRoutingModule } from './role-tenant-routing.module';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ModalFormRoleTenantComponent } from './modals/modal-form-role-tenant/modal-form-role-tenant.component';
import { ModalAddUserToRoleTenantComponent } from './modals/modal-add-user-to-role-tenant/modal-add-user-to-role-tenant.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { TabPermissionsModuleTenantComponent } from './components/tab-permissions-module-tenant/tab-permissions-module-tenant.component';
import { TabUserRoleTenantComponent } from './components/tab-user-role-tenant/tab-user-role-tenant.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ModalAssignPermissionRoleTenantComponent } from './modals/modal-assign-permission-role-tenant/modal-assign-permission-role-tenant.component';
import { ModalListUsersTenantComponent } from './modals/modal-list-users-tenant/modal-list-users-tenant.component';
import { TranslocoModule, TRANSLOCO_SCOPE } from "@ngneat/transloco";
import { ModalViewPermissionTenantComponent } from './modals/modal-view-permission-tenant/modal-view-permission-tenant.component';
@NgModule({
  declarations: [
    ListRoleTenantComponent,
    DetailRoleTenantComponent,
    ModalFormRoleTenantComponent,
    ModalAddUserToRoleTenantComponent,
    TabPermissionsModuleTenantComponent,
    TabUserRoleTenantComponent,
    ModalAssignPermissionRoleTenantComponent,
    ModalListUsersTenantComponent,
    ModalViewPermissionTenantComponent
  ],
  imports: [
    CommonModule,
    NzInputModule,
    NzSelectModule,
    CoreModule,
    RoleTenantRoutingModule,
    NzDropDownModule,
    NzCheckboxModule,
    NzTabsModule,
    TranslocoModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: "role" }],
})
export class RoleTenantModule { }
