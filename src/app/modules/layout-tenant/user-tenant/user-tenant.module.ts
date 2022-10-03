import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from 'src/app/_core/core.module';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzPopoverModule} from 'ng-zorro-antd/popover';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {TranslocoModule, TRANSLOCO_SCOPE} from "@ngneat/transloco";
import {NgxPermissionsModule} from "ngx-permissions";
import {UserListTenantComponent} from './components/user-list-tenant/user-list-tenant.component';
import {UserTenantRoutingModule} from './user-tenant-routing.module';
import {UserCreateTenantComponent} from './components/user-create-tenant/user-create-tenant.component';
import {UserEditTenantComponent} from "./components/user-edit-tenant/user-edit-tenant.component";
import {UserDetailTenantComponent} from './components/user-detail-tenant/user-detail-tenant.component';
import {NzInputModule} from "ng-zorro-antd/input";
import {
  ModalAssignToUserTenantComponent
} from './modals/modal-assign-to-user-tenant/modal-assign-to-user-tenant.component';
import {ModalUpdateStatusComponent} from "./modals/modal-update-status/modal-update-status.component";
import {ModalRoleListTenantComponent} from './modals/modal-role-list-tenant/modal-role-list-tenant.component';

@NgModule({
  declarations: [
    UserListTenantComponent,
    UserCreateTenantComponent,
    UserEditTenantComponent,
    UserDetailTenantComponent,
    ModalAssignToUserTenantComponent,
    ModalUpdateStatusComponent,
    ModalRoleListTenantComponent
  ],
  imports: [
    CommonModule,
    UserTenantRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzPopoverModule,
    NzRadioModule,
    NzDropDownModule,
    NzSelectModule,
    TranslocoModule,
    NzInputModule,
    NgxPermissionsModule.forChild()
  ],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: "user"}],
})
export class UserTenantModule {
}
